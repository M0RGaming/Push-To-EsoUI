const core = require('@actions/core');
const github = require('@actions/github');
const http = require('https');
const fs = require('fs')

try {
  const path = core.getInput('path');
  //const manifestPath = `${path}${core.getInput('addonManifest')}`
  const readmePath = `${path}${core.getInput('readme')}`
  const changelogPath = `${path}${core.getInput('changelog')}`
  const apiToken = core.getInput('EsoUIToken');
  const id = core.getInput('EsoUIID');
  const version = core.getInput("version")


  /*
  let options = {
    headers: {
      'x-api-token': apiToken
    }
  }
  get(`https://api.esoui.com/addons/details/${id}.json`, options, (res) => {
    console.log(res)
    console.log(res[0].version)
  })
  */


  readFile(readmePath, (readme) => {
    outputDescription = replaceMD(readme)
    readFile(changelogPath, (outputChangelog) => {
      console.log(outputDescription)
      console.log(outputChangelog)
      console.log(version)
    })
  })
  





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


function readFile(path, callback) {
  try {
    callback(fs.readFileSync(path, 'utf8'))
  } catch (err) {
    console.error(err)
  }
}


function replaceMD(text) {
  text = text.replace(/^# (.*?)\n/gm,'[SIZE=5]$1[/SIZE]\n')
  text = text.replace(/^## (.*?)\n/gm,'[SIZE=4]$1[/SIZE]\n')
  text = text.replace(/^### (.*?)\n/gm,'[SIZE=3]$1[/SIZE]\n')
  text = text.replace(/`((?!`).*?)`/gm,'[Highlight]$1[/Highlight]')
  text = text.replace(/```(.*?)```/gm,'[Highlight=lua]$1[/Highlight]')
  return text
}