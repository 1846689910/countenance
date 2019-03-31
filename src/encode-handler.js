const { general } = require("./token.json");
const { encode } = require("confi-coder/src/coder");
const { getEncodedPath, getAllFilesInDir } = require("./utils");

const files = getAllFilesInDir("dist", true);
files.forEach(f => encode(f, getEncodedPath(f), general.token));
