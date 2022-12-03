import { Octokit } from "@octokit/rest";
import _ from "lodash";
import getBody from "./get-body.js";
import getCommandLineArgs from "./get-command-line-args.js";
import getJiraBodyVars from "./get-jira-body-vars.js";
import readConfigFile from "./read-config-file.js";
import throwExceptionIfInvalidCommands from "./throw-exception-if-invalid-commands.js";

const overrideBodyTemplateName = (commands, configvars) => {
    if (commands?.bodytemplatename) {
        configvars.bodytemplatename = commands.bodytemplatename;
    }
}
const buildJiraInput = (commands, configvars) => {
    const jira = _.pick(configvars, ['jiraapitoken', 'jiracompany', 'jirauser']);
    jira.jiracard = commands.jiracard;
    return jira;
}
const buildGitHubInput = (commands, configvars) => {
    const github = _.pick(configvars, ['token', 'owner', 'jirauser']);
    github.repo = commands?.repo || configvars?.repo;
    github.base = commands?.base || configvars?.base;
    return github;
}

console.log('reading config file ...');
const configvars = readConfigFile();
console.log('done.');

console.log('reading command line args ...');
const commands = getCommandLineArgs();
throwExceptionIfInvalidCommands(commands);
const isdraft = commands.draft == 'draft' ? true : false;
console.log('done.');

const jira = buildJiraInput(commands, configvars);
console.log('rendering body template ...');
const bodyvars = await getJiraBodyVars(jira);
overrideBodyTemplateName(commands, configvars);
const bodyy = await getBody(configvars, bodyvars);
console.log('done.');

const github = buildGitHubInput(commands, configvars);

console.log('creating pr for branch ', commands.branch, ' ...');
try {
    const octokit = new Octokit({ auth: github.token });
    const { data: pullRequest } = await octokit.rest.pulls.create({
        owner: github.owner,
        repo: github.repo,
        title: `[${bodyvars.assignee}][${jira.jiracard + "] - " + bodyvars.description || 'PR'}`,
        body: `${bodyy}`,
        head: commands.branch,
        base: github.base,
        draft: isdraft
    });
    console.log('done. Go to: ' + pullRequest.html_url);
} catch(e) {
    console.log('failed. Response ' + e.message);
}