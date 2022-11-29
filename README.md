### Context

Whenever you finish your work, you want to open a PR. You have to go to github pr section and after many clicks you have PR opened. You have to go to JIRA dashboard and copy many information from there to fill your PR.

### Goal

Automate the process of creating PR by integrating with JIRA API. Type just one command and get it all done like this:

<img width="614" alt="image" src="https://user-images.githubusercontent.com/56555440/204580031-971c9b5f-f32d-4fea-b106-744cd88b6e0b.png">

### Targeted audience

People that uses github and JIRA.

### Instructions

- Install npm
- Create a file called '.config' with this content:
<pre><p>owner = squad</p>
<p>repo = project</p>
<p>body = This pull request is a test!</p>
<p>base = master</p>
<p>token = [your personal access token for github]</p>
<p>bodytemplate = true</p>
<p>jirauser = [your jira user (normally it's the email)]</p>
<p>jiraapitoken = [your JIRA api token -> https://id.atlassian.com/manage-profile/security/api-tokens > create new]</p>
<p>jiracompany = [your company host name on jira]</p></pre>

body template set to true means you will use the body-template.md as body of your pr

- Run npm `npm start branch-name`

Ps: Your branch must be pushed and it must have at least one commit

### Running from any terminal (Mac OS)

- clone the repo somewhere (your-folder)
- open the `vi ~/.bash_profile` and add this line `alias createpr="cd ~/your-folder/github-pr && npm start $1"`
- run `createpr branch-name`
