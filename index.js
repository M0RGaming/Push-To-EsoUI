const core = require('@actions/core');
const github = require('@actions/github');
const http = require('https');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
  console.log("")
  console.log("")
  const apiToken = core.getInput('EsoUIToken');


  let options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-token': apiToken
    }
  }

  req = http.request('https://api.esoui.com/addons/list.json', options, (res) => {
    console.log(JSON.stringify(res))
  })



} catch (error) {
  core.setFailed(error.message);
}
