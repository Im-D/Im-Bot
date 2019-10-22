const core = require('@actions/core');
const github = require('@actions/github');

const { getReadme, updateReadme, updatedFilelist } = require('../common/octokit')
const { createFilelink } = require('../common/util')

const README_PATH = 'README.md'

async function run() {
  try {
    const myToken = core.getInput('myToken');
    const linkLocTarget = core.getInput('linkLocTarget');

    const octokit = new github.GitHub(myToken);
    const {pull_request, sender} = github.context.payload
    const { owner, repo, number } = github.context.issue
    const { data: { content, sha } } = getReadme( octokit, owner, repo )
    
    // Create Updated(Create) Markdown files
    const fileList = updatedFilelist(octokit, owner, repo, number)
    const fileLinkContent = fileList.data.reduce((acc, cur) => {
      if (cur.filename.match(/\.(md|markdown)$/)) {
        const link = createFilelink(pull_request.head, cur.filename)
        acc += `- [x] ${sender.login} : [${cur.filename.split('.')[0]}](${link})\n`
      }
      return acc
    }, '')

    const originalContent = Buffer.from(content, 'base64').toString('utf8');
    const splitContent = originalContent.split(linkLocTarget)
    
    // Create New README Content
    const newContent = Buffer.from(splitContent[0] + linkLocTarget + '\n' + fileLinkContent + splitContent[1], 'utf8').toString('base64');

    // Update README
    await updateReadme(octokit, owner, repo, README_PATH, "update README.md", newContent, sha)
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
