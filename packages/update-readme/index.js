const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try { 
    const myToken = core.getInput('myToken');
    const octokit = new github.GitHub(myToken);
    const payload  = github.context.payload
    const { owner, repo, number } = github.context.issue

    const path = 'README.md'

    octokit.repos.getContents({
      owner,
      repo,
      path,
    }).then((contents)=>{
      console.log('content__', contents)
    })

    console.log('payload__', payload)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
