<p align="center">
  <img width="500" alt="GitHub and Jira" src="https://user-images.githubusercontent.com/56555440/204679533-9fcb43f2-8e1e-4595-ad05-28c67d7e5e94.png">
</p>

### Audience

- People that use GitHub and JIRA. (See the video on the bottom)

### Context

- Whenever you finish your work, you want to open a PR. You have to go to github pr section and after many clicks you have PR opened. You have to go to JIRA dashboard and copy some information from there to fill your PR.

### Goal

- Standardize Pull Requests on GitHub
- Simplify Pull Request creation, by typing one command and getting this result:

### Instructions

- Install npm
- Create a file called '.config' with this content:
<pre><span>owner = squad</span>
<span>repo = project</span>
<span>body = the body of the PR</span>
<span>base = master</span>
<span>token = your personal access token for github, see https://github.com/settings/tokens</span>
<span>bodytemplate = true</span>
<span>bodytemplatename = custom-body-template.md</span>
<span>jirauser = your jira login, ex: your-name@company.com</span>
<span>jiraapitoken = your JIRA api token, create one on https://id.atlassian.com/manage-profile/security/api-tokens</span>
<span>jiracompany = your company host name on jira</span></pre>

- Run npm `npm start branch-name [jira-card-id] [draft]`

Conditions: 
1. Your branch must be pushed
2. It must have at least one commit

### Customising template

- You can add any template you wish, just upload the file or change the existing .md ones and change the **bodytemplatename** to your template.

### Running from any terminal (Mac OS)

- clone the repo somewhere (your-folder)
- open the `vi ~/.bash_profile` and add this line `alias createpr="cd ~/your-folder/github-pr && npm start $1"`
- run `createpr branch-name`


Notes: 
1. **bodytemplate** set to true means you will use the **bodytemplatename** as body of your pr instead of *body* value
2. This .config file is hidden, nobody else besides yourself can see it because it was added on .gitignore.
3. Square brackets means they are optional.
4. Case your branch name matches the jira card id, just run (`npm start branch-name`)
5. Case you want it to be draft, just run (`npm start branch-name draft`)

### Star ☆ the repo to increase the engagement

https://user-images.githubusercontent.com/56555440/204678256-78a6d6a2-69ef-49dc-815c-7c7fb70e58d1.mov

- Thank you
