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

Either
```js
const { encode } = require("confi-coder/src/coder");
encode(originalFilePath, tokenFilePath, key);
```
or within `confi-coder`

```bash
CODER_KEY=... npm run encode from=... to=...
```
Then update `repositories` object in `src/main.js`:

put your `CODER_KEY` in `code.before`
```js
const repositories = {
  "type-18": {
    code: {
      before: "def",
      next: "xfa"
    }
  },
  "REPO_NAME": {
    code: {
      before: "def", // used for encoding last time, also for decoding first this time
      next: "xfa" // fresh code used for encoding this time
    }
  }
  // ...
};
```


## update repo token

+ need to be at clean **`master`** branch
+ no branch **`update`** exists

1. `node src/main.js`
2. edit and update each token within `dist/`
3. update object `repositories`, put `next` in `before`, then put fresh code in `next`
4. `node src/main.js`
