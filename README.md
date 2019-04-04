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
2. create `src/token.json`:

```json
{
  "general": {
    "token": "GENERAL_TOKEN"
  },
  "exception": {
    "repo_name": "REPO_TOKEN"
  }
}
```

3. `npm run decode`

## edit original file

1. edit original file `dist/**/xxx.*`
2. `npm run encode`

## add new token file

1. put original file in `dist/`
2. `npm run encode`

## change token code

1. checkout a clean branch
2. change code by
```bash
node src/code-changer.js --code=mycode
node src/code-changer.js --code=mycode --np # --np for no push
npm run change code=mycode np
```
3. save `src/token.json` in somewhere

## auto encode

encode your content automatically

```bash
npm run auto-encode
npm run auto-encode int=60000 # int for interval
```
