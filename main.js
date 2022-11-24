import { Octokit } from "@octokit/core";
import * as fs from "fs";

console.log('reading config file ...');
const configFile = fs.readFileSync('.config', 'utf-8');
const lines = configFile.split('\n');
const argsvars = lines.reduce((argsmap, line) => {
        let argmap = line.split('=');
        let key = argmap[0].trim();
        let value = argmap[1].trim();
        argsmap.set(key, value);
        return argsmap;
    }, new Map());
console.log('done.');
const args = process.argv.slice(2);
const card = args[0];

console.log('creating pr...');
const octokit = new Octokit({ auth: argsvars.get('token') }),
        owner = argsvars.get('owner'),
         repo = argsvars.get('repo'),
        title = `[${card || 'PR'}]`,
        body  = `${card} ${argsvars.get('body')}`,
        head  = `${card}`,
        base  = argsvars.get('base');

const response = await octokit.request(
    `POST /repos/{owner}/{repo}/pulls`, { owner, repo, title, body, head, base }
);
console.log('done. Go to: ' + response.data.html_url);