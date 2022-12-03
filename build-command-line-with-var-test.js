import _ from "lodash";
import buildCommandLineWithVar from "./build-command-line-with-var.js";

let count = 1;
// Should failed because of different branch name
let argsarray = ["vars",
    "repo=v-platform",
    "base=v2022",
    "bodytemplatename=mybody-template.md",
    "branch=VD-1234-cherry-pick",
    "jiracard=VD-1234"];
let expectedCommandLine = 
{
  repo: 'v-platform',
  base: 'v2022',
  bodytemplatename: 'mybody-template.md',
  branch: 'VD-1234-cherry-aaapick',
  jiracard: 'VD-1234',
};
let actualCommandLine = buildCommandLineWithVar(argsarray);
// console.log("expected: ", expectedCommandLine, "\nactual: ", actualCommandLine);
console.log(_.isEqual(actualCommandLine, expectedCommandLine) ? `Failed (${count++})` : `Success (${count++})`);

// Should copy branch to jiracard when jiracard is not passed as variable
argsarray = ["vars",
    "repo=v-platform",
    "base=v2022",
    "bodytemplatename=mybody-template.md",
    "branch=VD-1234"];
expectedCommandLine = 
{
  repo: 'v-platform',
  base: 'v2022',
  bodytemplatename: 'mybody-template.md',
  branch: 'VD-1234',
  jiracard: 'VD-1234',
};
actualCommandLine = buildCommandLineWithVar(argsarray);
// console.log("expected: ", expectedCommandLine, "\nactual: ", actualCommandLine);
console.log(_.isEqual(actualCommandLine, expectedCommandLine) ? `Success (${count++})` : `Failed (${count++})`);
