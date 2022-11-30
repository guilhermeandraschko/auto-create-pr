import axios from "axios";

const getJiraBodyVars = async (branch, configvars) => {
   
    const jirauser = configvars.get('jirauser');
    const jiraapitoken = configvars.get('jiraapitoken');
    const jiracompany = configvars.get('jiracompany');
    const config = {
        method: 'get',
        url: `https://${jiracompany}.atlassian.net/rest/agile/1.0/issue/${branch}?fields=key&fields=summary&fields=description&fields=issuetype&fields=assignee`,
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
        link: `[JIRA ${branch}](https://vaktglobal.atlassian.net/browse/${branch})`,
        description: `${description}`,
        bug: `${bug}`,
        feature: `${feature}`,
        assignee: `${assignee}`
    }
    return bodyvars;
}

export default getJiraBodyVars;