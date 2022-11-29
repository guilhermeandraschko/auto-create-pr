
### Audience

People that uses Github and JIRA.

### Context

Whenever you finish your work, you want to open a PR. You have to go to github pr section and after many clicks you have PR opened. You have to go to JIRA dashboard and copy many information from there to fill your PR.

### Goal

Automate the process of creating PR by integrating with JIRA API. Type just one command and get it all done like this:

<img width="614" alt="image" src="https://user-images.githubusercontent.com/56555440/204580031-971c9b5f-f32d-4fea-b106-744cd88b6e0b.png">

### Instructions

- Install npm
- Create a file called '.config' with this content:
<pre><span>owner = squad</span>
<span>repo = project</span>
<span>body = the body of the PR</span>
<span>base = master</span>
<span>token = [your personal access token for github, see https://github.com/settings/tokens]</span>
<span>bodytemplate = true</span>
<span>jirauser = [your jira login, ex: your-name@company.com]</span>
<span>jiraapitoken = [your JIRA api token, create one on https://id.atlassian.com/manage-profile/security/api-tokens]</span>
<span>jiracompany = [your company host name on jira]</span></pre>

Notes:
1. *Body template* set to true means you will use the body-template.md as body of your pr instead of *body* value
2. This .config file is hidden, nobody else besides yourself can see it because it was added on .gitignore.

- Run npm `npm start branch-name [jira-card-id] [draft]`

Notes: 
1. Square brackets means they are optional.
2. Case your branch name matches the jira card id, just run (`npm start branch-name`)
3. Case you want it to be draft, just run (`npm start branch-name draft`)

Case you wish the PR to be draft
Conditions: 
1. Your branch must be pushed
2. It must have at least one commit

### Running from any terminal (Mac OS)

- clone the repo somewhere (your-folder)
- open the `vi ~/.bash_profile` and add this line `alias createpr="cd ~/your-folder/github-pr && npm start $1"`
- run `createpr branch-name`
