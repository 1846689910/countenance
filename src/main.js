const Promise = require("bluebird");
const { decode, encode } = require("confi-coder/src/coder");
const repositories = require("./repositories");
const { getDecodedPath, getEncodedPath } = require("./utils");
const shell = require("shelljs");
const exec = Promise.promisify(shell.exec);

const { platform } = process;
const sep = platform === "win32" ? "&" : ";";
const workingBranch = "update";

async function main() {
  const repos = repositories && Object.entries(repositories);
  if (repos && repos.length > 0) {
    await newBranch();
    for (let i = 0, len = repos.length; i < len; i++) {
      const [k, repo] = repos[i];
      const {name, code} = repo;
      await decode(getEncodedPath(`${name}.ecd`), getDecodedPath(name), code.before);
      await encode(getDecodedPath(name), getEncodedPath(`${name}.ecd`), code.next);
      await track();
    }
    await exec(`git push origin ${workingBranch}`);
  }
}

async function track() {
  await exec(commands("git add .", `git commit -m "update"`));
}

async function newBranch() {
  await exec(commands("git checkout master", `git checkout -b ${workingBranch}`));
}

function commands(...args) {
  return args.join(` ${sep} `);
}

main();
