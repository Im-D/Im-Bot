const core = require('@actions/core');
const github = require('@actions/github');
const reviewerList = require('./reviewerList.json')

async function run() {
  try {
    const myToken = core.getInput('myToken');
    const octokit = new github.GitHub(myToken);
    const { owner, repo, number } = github.context.issue
    console.log(owner)

    if(!number) {
      console.warn("Dont have number")
      return 
    }
    
    // const reviewers = reviewerList.reviewers && reviewerList.reviewerList.filter(reviewer => {
    //   return 
    // })
    octokit.pulls.createReviewRequest({ owner, repo, pull_number:number, reviewers: reviewerList.reviewers })
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
