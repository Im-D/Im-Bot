const updateReadme = async (octokit, owner, repo, path, message, content, sha) => {
  return await octokit.repos.createOrUpdateFile({
    owner,
    repo,
    path,
    message,
    content,
    sha
  })
}

const updatedFilelist = async (owner, repo, pull_number) => {
  return await octokit.pulls.listFiles({ owner, repo, pull_number })
}

const createFileLink = (headData, fileName) => headData.repo.html_url + path.join('/blob', headData.ref, fileName)

module.exports = {
  updateReadme,
  updatedFilelist
}