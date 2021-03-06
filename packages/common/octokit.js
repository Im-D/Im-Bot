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

const createReviewRequest = async (octokit, owner, repo, pull_number, reviewers) => {
  return await octokit.pulls.requestReviewers({ owner, repo, pull_number, reviewers })
}

module.exports = {
  getReadme,
  updateReadme,
  updatedFilelist,
  createReviewRequest,
}