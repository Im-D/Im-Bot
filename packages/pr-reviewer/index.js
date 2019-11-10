const core = require('@actions/core');
const github = require('@actions/github');
const reviewerList = require('./reviewerList.json')
const { createReviewRequest } = require('../common/octokit')

async function run() {
  try {
    const myToken = core.getInput('myToken');
    const octokit = new github.GitHub(myToken);
    const author  = github.context.payload.pull_request.user.login
    const { owner, repo, number } = github.context.issue

    if(!number) {
      console.warn("Dont have number")
      return 
    }
    
    const reviewers = reviewerList.reviewers && reviewerList.reviewers.filter(reviewer => {
      return reviewer !== author
    })

    createReviewRequest(octokit, owner, repo, number, reviewers)
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
