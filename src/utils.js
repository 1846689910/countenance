const Path = require("path");

const getEncodedPath = name => Path.resolve("lib", name);

const getDecodedPath = name => Path.resolve("dist", name);

module.exports = {
  getEncodedPath,
  getDecodedPath
};
