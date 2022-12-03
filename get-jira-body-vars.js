import axios from "axios";

const getUrl = (jiracompany, jiracard) => {
    const url = `https://${jiracompany}.atlassian.net/rest/agile/1.0/issue/${jiracard}?fields=key&fields=summary&fields=description&fields=issuetype&fields=assignee`;
    console.log(url);
    return url;
}

const getJiraBodyVars = async ({jiracard, jiraapitoken, jiracompany, jirauser}) => {
    const config = {
        method: 'get',
        url: getUrl(jiracompany, jiracard),
        headers: { 
        'Accept-Encoding': 'identity' 
        },
        auth : {
            username: jirauser,
            password: jiraapitoken
        }
    };

    const jirainfo = await axios(config);
    const fields = jirainfo.data.fields;  
    const description = fields.summary;
    const isbug = fields?.issuetype?.name === 'Bug';
    const bug = isbug ? "x" : " ";
    const feature = !isbug ? "x" : " ";
    const assignee = fields?.assignee?.displayName;
    const bodyvars = {
        link: `[JIRA ${jiracard}](https://vaktglobal.atlassian.net/browse/${jiracard})`,
        description: `${description}`,
        bug: `${bug}`,
        feature: `${feature}`,
        assignee: `${assignee}`
    }
    return bodyvars;
}

export default getJiraBodyVars;