const Path = require("path");

const getEncodedPath = name => Path.resolve("lib", name);

const getDecodedPath = name => Path.resolve("dist", name);

const repoJsonPath = Path.resolve("src", "repositories.json");

module.exports = {
  getEncodedPath,
  getDecodedPath,
  repoJsonPath
};
