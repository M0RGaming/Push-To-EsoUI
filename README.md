This is a github action that will automatically push your addon to esoui.

Requirements: 
You need a changelog text file. (Defaults to changelog.txt) - This is what will end up in your changelog tab in esoui
You need a readme file. (Defaults to README.md) - This is what will end up in your esoui main page
You need a EsoUI token. (https://www.esoui.com/downloads/filecpl.php?action=apitokens) - This should never be directly in your workflow file, but instead you should save it as a GitHub secret.
You need an EsoUI ID. You get this by making an addon on esoui. The addon's ID will be in the URL.


Sample workflow file (taken directly from my addon)
```
name: PushToEsoUI

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version'     
        required: true
        default: '2.4'

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: Pushing
    steps:
      - uses: actions/checkout@v2
        with:
          path: 'ArtaeumGroupTool'

      - name: Zip release
        run: 7z a ArtaeumGroupTool.zip * -xr!*.git*

      - name: Push to EsoUI
        id: push
        uses: M0RGaming/Push-To-EsoUI@main
        with:
          EsoUIToken: ${{secrets.ESOUI_API_TOKEN}}
          EsoUIID: 3012
          path: './ArtaeumGroupTool/'
          readme: 'README.md'
          changelog: 'changelog.txt'
          version: ${{github.event.inputs.version}}
          artifact: 'ArtaeumGroupTool.zip'
```
