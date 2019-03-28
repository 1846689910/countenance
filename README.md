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
2. create `src/repositories.js`:

```js
const code = {
  before: "you never know", // the old code used to generate the .ecd files
  next: "I am not gonna tell you"  // the fresh code to encode the original files
};
module.exports = {
  "type-18": {
    name: "type-18.txt",
    code
  },
  "type-18-ssr": {
    name: "type-18-ssr.txt",
    code
  },
  schoolproject: {
    name: "schoolproject.txt",
    code
  },
  concise: {
    name: "concise.md",
    code
  }
};
```

3. run `node src/decode-handler.js`

## add new token file

1. put original file in `dist/`
2. update `src/repositories.js`, add this project

```js
NEW_PROJECT: {
  name: "project.*",
  code: { before, next }
}
```
3. run `node src/encode-handler.js`

## change token code

1. checkout a clean branch
2. update `src/repositories.js`, put `next` code to `before` field, add a fresh `next` token. This token is used to generate encoded files this time
3. change code by
```bash
node src/code-changer.js
node src/code-changer.js --np # --np for no push
```
