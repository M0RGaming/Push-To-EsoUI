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
    headers: {
      'x-api-token': apiToken
    }
  }

  http.get('https://api.esoui.com/addons/list.json', options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  })





} catch (error) {
  core.setFailed(error.message);
}
