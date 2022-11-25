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
<p>token = [your personal access token]</p></pre>
- Run npm `npm start branch-name`

Ps: Your branch must be pushed and it must have at least one commit