const core = require('@actions/core');
const github = require('@actions/github');
const reviewerList = require('./reviewerList.json')
const { createReviewRequest } = require('../common/octokit')

const REVIEWER_COUNT = 5

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getReviewerList(arr) {
  let resultArr = []
  while(resultArr.length < REVIEWER_COUNT) {
    const randomReviewer = getRandomItem(arr)
    if (!resultArr.includes(randomReviewer)) {
      resultArr.push(randomReviewer)
    }
  }

  return resultArr
}

async function run() {
  try {
    const myToken = core.getInput('myToken')
    const octokit = new github.GitHub(myToken)
    const author  = github.context.payload.pull_request.user.login
    const { owner, repo, number } = github.context.issue

    if(!number) {
      console.warn("Dont have number")
      return 
    }
    
    const reviewers = reviewerList.reviewers && reviewerList.reviewers.filter(reviewer => {
      return reviewer !== author
    })

    const filteredReviewers = getReviewerList(reviewers)

    createReviewRequest(octokit, owner, repo, number, filteredReviewers)
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
