import axios from "axios";

const getJiraBodyVars = async (jiracardparam, configvars) => {
    if (!jiracardparam) return;
   
    const jirauser = configvars.get('jirauser');
    const jiraapitoken = configvars.get('jiraapitoken');
    const jiracompany = configvars.get('jiracompany');
    const config = {
        method: 'get',
        url: `https://${jiracompany}.atlassian.net/rest/agile/1.0/issue/${jiracardparam}?fields=key&fields=summary&fields=description&fields=issuetype&fields=assignee`,
        headers: { 
        'Accept-Encoding': 'identity' 
        },
        auth : {
            username: jirauser,
            password: jiraapitoken
        }
    };

    const jiracard = await axios(config);
    const fields = jiracard.data.fields;  
    const description = fields.summary;
    const isbug = fields?.issuetype?.name === 'Bug';
    const bug = isbug ? "x" : " ";
    const feature = !isbug ? "x" : " ";
    const assignee = fields?.assignee?.displayName;
    const bodyvars = {
        link: `[JIRA ${jiracardparam}](https://vaktglobal.atlassian.net/browse/${jiracardparam})`,
        description: `${description}`,
        bug: `${bug}`,
        feature: `${feature}`,
        assignee: `${assignee}`
    }
    return bodyvars;
}

export default getJiraBodyVars;