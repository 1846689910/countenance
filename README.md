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
## add repo token

put encoded token file `REPO.txt.ecd` in `lib/`

Either `encode(originalFilePath, tokenFilePath, key)` or `CODER_KEY=... npm run encode from=... to=...` within `confi-coder`

## update repo token
