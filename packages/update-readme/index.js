const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try { 
    const myToken = core.getInput('myToken');
    const octokit = new github.GitHub(myToken);
    const payload  = github.context.payload
    const { owner, repo, number } = github.context.issue

    const content = octokit.repos.getContents({
      owner,
      repo,
      'README.md',
    })

    core.debug('payload__', payload)
    core.debug('content__', content, content.content)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
