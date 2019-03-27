const repositories = require("./repositories");
const { decode } = require("confi-coder/src/coder");
const { getDecodedPath, getEncodedPath } = require("./utils");

Object.entries(repositories).forEach(([k, repo]) =>
  decode(getEncodedPath(`${repo.name}.ecd`), getDecodedPath(repo.name), repo.code.before)
);
