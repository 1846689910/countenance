const { general: secretPart } = require("./token.json");
const { general: publicPart } = require("./public-token.json");
const { encode } = require("confi-coder/src/coder");
const { getEncodedPath, getAllFilesInDir } = require("./utils");

function _encode() {
  const files = getAllFilesInDir("dist", true);
  files.forEach(f => encode(f, getEncodedPath(f), `${publicPart.token}${secretPart.token}`));
}

module.exports = _encode;
_encode();
