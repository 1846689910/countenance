const Fs = require("fs");
const Path = require("path");

const getRepoToken = repoName => {
  const path = Path.resolve("lib", `${repoName}.ecd`);
  if (!Fs.existsSync(path)) {
    throw new Error(`${path} is not found`);
  } else {
    return Fs.readFileSync(path);
  }
};

module.exports = {
  getRepoToken
};
