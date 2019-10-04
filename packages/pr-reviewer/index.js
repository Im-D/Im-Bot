const core = require('@actions/core');

async function run() {
  try { 
    core.debug((new Date()).toTimeString())
    core.debug((new Date()).toTimeString())
    core.setOutput('time', new Date().toTimeString());
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
