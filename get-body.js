import * as fs from "fs";
import Mustache from "mustache";

const getBodyText = (bodytemplatename) => {
    return fs.readFileSync(bodytemplatename ? bodytemplatename : 'body-template.md', 'utf-8');
}

const getBody = ({bodytemplate, bodytemplatename}, bodyvars) => {
    if (bodytemplate == 'true') {
        const bodytemplatefile = getBodyText(bodytemplatename);
        return Mustache.render(bodytemplatefile, bodyvars);
    } else {
        return `${body}`;
    }
}

export default getBody;