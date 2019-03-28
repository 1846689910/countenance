const repositories = require("./repositories.json");
const { encode } = require("confi-coder/src/coder");
const { getDecodedPath, getEncodedPath } = require("./utils");

Object.entries(repositories).forEach(([k, repo]) =>
  encode(getDecodedPath(repo.name), getEncodedPath(`${repo.name}.ecd`), repo.code)
);
