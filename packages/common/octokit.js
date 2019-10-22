const getReadme = async (octokit, owner, repo) => {
  return await octokit.repos.getReadme({ owner, repo })
}

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

const updatedFilelist = async (octokit, owner, repo, pull_number) => {
  return await octokit.pulls.listFiles({ owner, repo, pull_number })
}

module.exports = {
  getReadme,
  updateReadme,
  updatedFilelist
}