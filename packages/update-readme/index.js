const core = require('@actions/core');
const github = require('@actions/github');

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

    const buff = new Buffer(contents.data.content);
    const base64data = buff.toString('base64');

    const updateReadme = (owner, repo, path, message, content) => octokit.repos.updateFile({
      owner,
      repo,
      path,
      message,
      content
    })
    
    updateReadme(owner, repo, path, "update README.md", '')
    
    console.log('content__', base64data)
    console.log('payload__', payload)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
