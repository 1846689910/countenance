const Promise = require("bluebird");
const Fs = require("fs");
const { decode, encode } = require("confi-coder/src/coder");
const repositories = require("./repositories.json");
const { getDecodedPath, getEncodedPath, repoJsonPath } = require("./utils");
const shell = require("shelljs");
const exec = Promise.promisify(shell.exec);

const { platform } = process;
const sep = platform === "win32" ? "&" : ";";
const workingBranch = "update";
const noPush = process.argv.find(x => x === "--np");

async function main() {
  const freshCode = await getFreshCode();
  const repos = repositories && Object.entries(repositories);
  if (repos && repos.length > 0) {
    await newBranch();
    for (let i = 0, len = repos.length; i < len; i++) {
      const [k, repo] = repos[i];
      const { name, code } = repo;
      await decode(getEncodedPath(`${name}.ecd`), getDecodedPath(name), code);
      await encode(getDecodedPath(name), getEncodedPath(`${name}.ecd`), freshCode);
      await track();
    }
    if (!noPush) await exec(`git push origin ${workingBranch}`);
    resetRepoCode();
  }
}

async function track() {
  await exec(commands("git add .", `git commit -m "update"`));
}

async function newBranch() {
  await exec(commands("git checkout master", `git checkout -b ${workingBranch}`));
}

async function getFreshCode(){
  const arg = process.argv.find(x => x.includes("--code="));
  if (!arg) {
    throw new Error("fresh code is required use `node src/code-changer.js --code=FRESH_CODE`")
  } else {
    return arg.split("=")[1];
  }
}

async function resetRepoCode(fresh){
  for (const key in repositories) {
    repositories[key].code = fresh;
  }
  Fs.writeFileSync(repoJsonPath, JSON.stringify(repositories, null, 2));
}

function commands(...args) {
  return args.join(` ${sep} `);
}

main();

// Fs.writeFileSync(repoJsonPath, JSON.stringify({
//   concise: {
//     name: "concise.md",
//     code: "abs"
//   },
//   "type-18": {
//     name: "type-18.txt",
//     code: "abs"
//   },
//   "type-18-ssr": {
//     name: "type-18-ssr.txt",
//     code: "abs"
//   },
//   schoolproject: {
//     name: "schoolproject.txt",
//     code: "abs"
//   },
// }, null, 2));
