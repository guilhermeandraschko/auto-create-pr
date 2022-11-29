import * as fs from "fs";
import Mustache from "mustache";
import getJiraBodyVars from "./get-jira-body-vars.js";

const getBodyText = () => {
    return fs.readFileSync('body-template.md', 'utf-8');
}

const getBody = async (branch, configvars) => {
    const bodytemplate = configvars.get('bodytemplate');
    if (bodytemplate && bodytemplate == 'true') {
        const bodytemplate = getBodyText(configvars);
        const bodyvars = await getJiraBodyVars(branch, configvars);
        return Mustache.render(bodytemplate, bodyvars);
    } else {
        return `${configvars.get('body')}`;
    }
}

export default getBody;