import { Octokit } from "@octokit/rest";
import getBody from "./get-body.js";
import getCommandLineArgs from "./get-command-line-args.js";
import getJiraBodyVars from "./get-jira-body-vars.js";
import readConfigFile from "./read-config-file.js";

console.log('reading config file ...');
const configvars = readConfigFile();
console.log('done.');

console.log('reading command line args ...');
const args = getCommandLineArgs();
const branch = args[0];
const draftarg = args[1];
const isdraft = draftarg == 'draft' ? true : false;
console.log('done.');

console.log('rendering body template ...');
const bodyvars = await getJiraBodyVars(branch, configvars);
const bodyy = await getBody(configvars, bodyvars);
console.log('done.');

console.log('creating pr...');

try {
    const octokit = new Octokit({ auth: configvars.get('token') });
    const { data: pullRequest } = await octokit.rest.pulls.create({
        owner: configvars.get('owner'),
        repo: configvars.get('repo'),
        title: `[${branch + " - " + bodyvars.description + "]" || 'PR'}`,
        body: `${bodyy}`,
        head: `${branch}`,
        base: configvars.get('base'),
        draft: isdraft
    });
    console.log('done. Go to: ' + pullRequest.html_url);
} catch(e) {
    console.log('failed. Response ' + e.message);
}