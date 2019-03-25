const Fs = require("fs");
const Path = require("path");

const getRepoToken = repoName => {
  const path = Path.resolve("lib", `${repoName}.ecd`);
  let repoToken;
  if (Fs.existsSync(path)) {
    repoToken = Fs.readFileSync(path);
  }
  return repoToken;
};

module.exports = {
  getRepoToken
};
