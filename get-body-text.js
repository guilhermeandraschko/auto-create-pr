import * as fs from "fs";

const getBodyText = (configvars) => {
    const bodytemplate = configvars.get('bodytemplate');
    if (bodytemplate && bodytemplate == 'true') {
        return fs.readFileSync('body-template.txt', 'utf-8');
    } else {
        return `${branch} ${configvars.get('body')}`;
    }
}

export default getBodyText;