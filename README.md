## 2021 isomorphic react app using next js served with firebase functions/hosting

## jest added

Because I can't grab the variables that are stored in src/next.config, im now storing in firebase config. 

These are set by logging into firebase cli and having aim permissions role.
firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"
### Additional Environment Commands
firebase functions:config:unset key1 key2 removes the specified keys from the config
firebase functions:config:clone --from <fromProject> clones another project's environment into the currently active project

