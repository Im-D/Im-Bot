const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path')

function fileLink(pullRequest, file) {
  return pullRequest.head.repo.html_url + path.join('/blob', pullRequest.head.ref, file.filename)
}

const updateReadme = async (octokit, owner, repo, path, message, content, sha) => await octokit.repos.createOrUpdateFile({
  owner,
  repo,
  path,
  message,
  content,
  sha
})

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

    const oldContent = Buffer.from(readme.data.content, 'base64').toString('utf8');
    const fileList = await octokit.pulls.listFiles({ owner, repo, pull_number : number })
    const fileLinkContent = fileList.data.reduce((acc, cur) => {
      if (cur.filename.match(/\.(md|markdown)$/)) {
        const link = fileLink(payload.pull_request, cur)
        acc += `- [x] ${payload.sender.login} : [${cur.filename}](${link})\n`
      }
      return acc
    }, '')

    const newContent = Buffer.from(fileLinkContent, 'utf8').toString('base64');

    await updateReadme(octokit, owner, repo, path, "update README.md", newContent, readme.data.sha)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
