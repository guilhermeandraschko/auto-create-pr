import { Octokit } from "@octokit/core";
import * as fs from "fs";

const readConfigFile = () => {
    const configFile = fs.readFileSync('.config', 'utf-8');
    const lines = configFile.split('\n');
    return lines.reduce((argsmap, line) => {
            let argmap = line.split('=');
            let key = argmap[0]?.trim();
            let value = argmap[1]?.trim();
            argsmap.set(key, value);
            return argsmap;
        }, new Map());
}

console.log('reading config file ...');
const configvars = readConfigFile();
console.log('done.');

const args = process.argv.slice(2);
const branch = args[0];

console.log('creating pr...');
const octokit = new Octokit({ auth: configvars.get('token') }),
        owner = configvars.get('owner'),
         repo = configvars.get('repo'),
        title = `[${branch || 'PR'}]`,
        body  = `${branch} ${configvars.get('body')}`,
        head  = `${branch}`,
        base  = configvars.get('base');
try {
    const response = await octokit.request(
        `POST /repos/{owner}/{repo}/pulls`, { owner, repo, title, body, head, base }
    );
    console.log('done. Go to: ' + response.data.html_url);
} catch(e) {
    console.log('failed. Response ' + e.message);
}