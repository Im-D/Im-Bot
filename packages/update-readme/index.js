const core = require('@actions/core');
const github = require('@actions/github');

const updateReadme = (owner, repo, path, message, content) => octokit.repos.updateFile({
  owner,
  repo,
  path,
  message,
  content
})

async function run() {
  try { 
    const myToken = core.getInput('myToken');
    const octokit = new github.GitHub(myToken);
    const payload  = github.context.payload
    const { owner, repo, number } = github.context.issue

    const path = 'README.md'

    const contents = await octokit.repos.getContents({
      owner,
      repo,
      path,
    })

    const originalData = atob(contents.data.content)
    
    updateReadme(owner, repo, path, "update README.md", '')
    
    console.log('content__', originalData)
    console.log('payload__', payload)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
