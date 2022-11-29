import * as fs from "fs";
import Mustache from "mustache";

const getBodyText = (configvars) => {
    const bodytemplatename = configvars.get('bodytemplatename');
    
    return fs.readFileSync(bodytemplatename ? bodytemplatename : 'body-template.md', 'utf-8');
}

const getBody = (configvars, bodyvars) => {
    const bodytemplate = configvars.get('bodytemplate');
    if (bodytemplate && bodytemplate == 'true') {
        const bodytemplate = getBodyText(configvars);
        return Mustache.render(bodytemplate, bodyvars);
    } else {
        return `${configvars.get('body')}`;
    }
}

export default getBody;