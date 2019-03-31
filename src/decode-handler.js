const { general } = require("./token.json");
const { decode } = require("confi-coder/src/coder");
const { getDecodedPath, getAllFilesInDir } = require("./utils");

const files = getAllFilesInDir("lib", true);
files.forEach(f => decode(f, getDecodedPath(f), general.token));
