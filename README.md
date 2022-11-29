### Context

Whenever you finish your work, you want to open a PR. You have to go to github pr section > create new > select base and head branch > add title and a body > create.

### Goal

Let's automate this and just run a command line.


### Instructions

- Install npm
- Create a file called '.config' with this content:
<pre><p>owner = v-squad</p>
<p>repo = v-platform</p>
<p>body = This pull request is a test!</p>
<p>base = master</p>
<p>token = [your personal access token]</p>
<p>bodytemplate = true</p></pre>

body template set to true means you will use the body-template.txt as body of your pr

- Run npm `npm start branch-name`

Ps: Your branch must be pushed and it must have at least one commit

### Running from any terminal (Mac OS)

- clone the repo somewhere (your-folder)
- open the `vi ~/.bash_profile` and add this line `alias createpr="cd ~/your-folder/github-pr && npm start $1"`
- run `createpr branch-name`