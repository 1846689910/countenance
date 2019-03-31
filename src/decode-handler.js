const { general } = require("./token.json");
const { decode } = require("confi-coder/src/coder");
const { getDecodedPath1, getAllFilesInDir } = require("./utils");

const files = getAllFilesInDir("lib", true);
files.forEach(f => decode(f, getDecodedPath1(f), general.token));
