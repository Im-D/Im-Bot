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

    const buff = Buffer.from(contents.data.content, 'base64').toString('utf8');

    const updateReadme = async (owner, repo, path, message, content, sha) => await octokit.repos.createOrUpdateFile({
      owner,
      repo,
      path,
      message,
      content,
      sha
    })
    
    await updateReadme(owner, repo, path, "update README.md", '', payload.pull_request.base.sha)
    
    console.log('payload__', payload.pull_request.base.sha)
    console.log('content__', buff)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
