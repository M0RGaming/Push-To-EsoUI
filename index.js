const core = require('@actions/core');
const github = require('@actions/github');
const http = require('https');
const fs = require('fs')

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
  const id = core.getInput('EsoUIID');

  let options = {
    headers: {
      'x-api-token': apiToken
    }
  }
  get(`https://api.esoui.com/addons/details/${id}.json`, options, (res) => {
    console.log(res)
    console.log(res[0].version)
  })


  const fs = require('fs')

  try {
    const data = fs.readFileSync('./ArtaeumGroupTool/README.md', 'utf8')
    console.log(replaceMD(data))
  } catch (err) {
    console.error(err)
  }
  





} catch (error) {
  core.setFailed(error.message);
}



function get(url, options, callback) {
  http.get(url, options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        callback(parsedData)
      } catch (e) {
        console.error(e.message);
      }
    });
  })
}



function replaceMD(text) {
  text = text.replace(/^# (.*?)\n/gm,'[SIZE=5]$1[/SIZE]\n')
  text = text.replace(/^## (.*?)\n/gm,'[SIZE=4]$1[/SIZE]\n')
  text = text.replace(/^### (.*?)\n/gm,'[SIZE=3]$1[/SIZE]\n')
  text = text.replace(/`((?!`).*?)`/gm,'[Highlight]$1[/Highlight]')
  text = text.replace(/```(.*?)```/gm,'[Highlight=lua]$1[/Highlight]')
  return text
}