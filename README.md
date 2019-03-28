# countenance

## description

repo token keeper

## usage

```js
const { getRepoToken } = require("countenance/src");
const repoToken = getRepoToken("SELF_REPO_NAME");
/*
  returns:
    token string: if token file(lib/REPO.txt.ecd) exists
    undefined: if token file not found
*/
```

## clone project

1. clone project to local
2. create `src/repositories.json`:

```json
{
  "concise": {
    "name": "concise.md",
    "code": "confidential"
  },
  "type-18": {
    "name": "type-18.txt",
    "code": "confidential"
  },
  "type-18-ssr": {
    "name": "type-18-ssr.txt",
    "code": "confidential"
  },
  "schoolproject": {
    "name": "schoolproject.txt",
    "code": "confidential"
  }
}
```

3. run `node src/decode-handler.js`

## edit original file

1. edit original file `dist/xxx.*`
2. run `node src/encode-handler.js`

## add new token file

1. put original file in `dist/`
2. update `src/repositories.json`, add this project

```json
"NEW_PROJECT": {
  "name": "project.*",
  "code": "fresh code"
}
```
3. run `node src/encode-handler.js`

## change token code

1. checkout a clean branch
2. change code by
```bash
node src/code-changer.js --code=mycode
node src/code-changer.js --code=mycode --np # --np for no push
```
3. save `src/repositories.json` in somewhere
