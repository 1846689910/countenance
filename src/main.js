const shell = require("shelljs");
const Promise = require("bluebird");
const { decode, encode } = require("confi-coder/src/coder");
const exec = Promise.promisify(shell.exec);
const Path = require("path");

const { platform } = process;
const sep = platform === "win32" ? "&" : ";";
const workingBranch = "update";
const repositories = {/* repo info object here */};

async function main() {
  const repos = repositories && Object.entries(repositories);
  if (repos && repos.length > 0) {
    await newBranch();
    for (let i = 0, len = repos.length; i < len; i++) {
      const [name, repo] = repos[i];
      await decode(
        Path.resolve("lib", `${name}.txt.ecd`),
        Path.resolve("dist", `${name}.txt`),
        repo.code.before
      );
      await encode(
        Path.resolve("dist", `${name}.txt`),
        Path.resolve("lib", `${name}.txt.ecd`),
        repo.code.next
      );
      await track();
    }
    await exec(`git push origin ${workingBranch}`);
  }
}

async function track() {
  await exec(commands("git add .", `git commit -m "update"`))
}

async function newBranch() {
  await exec(commands("git checkout master", `git checkout -b ${workingBranch}`));
}

function commands (...args){
  return args.join(` ${sep} `);
}

main();
