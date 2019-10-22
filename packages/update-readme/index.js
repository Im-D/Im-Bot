const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try { 
    const myToken = core.getInput('myToken');
    const octokit = new github.GitHub(myToken);
    const payload  = github.context.payload
    const { owner, repo, number } = github.context.issue

    const path = 'README.md'

    const readme = await octokit.repos.getReadme({
      owner,
      repo
    })

    const buff = Buffer.from(readme.data.content, 'base64').toString('utf8');

    const updateReadme = async (owner, repo, path, message, content, sha) => await octokit.repos.createOrUpdateFile({
      owner,
      repo,
      path,
      message,
      content,
      sha
    })

    console.log('payload__', readme)
    console.log('content__', buff)
    await updateReadme(owner, repo, path, "update README.md", '', readme.data.sha)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
