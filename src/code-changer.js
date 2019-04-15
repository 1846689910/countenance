const Promise = require("bluebird");
const Path = require("path");
const Fs = require("fs");
const { decode, encode } = require("confi-coder/src/coder");
const { general: secretPart } = require("./token.json");
const { general: publicPart } = require("./public-token.json");
const {
  getAllFilesInDir,
  getDecodedPath,
  tokenJsonPath,
  publicTokenJsonPath,
  generateCode,
  getTokenPairs
} = require("./utils");
const shell = require("shelljs");
const exec = Promise.promisify(shell.exec);

const { platform } = process;
const sep = platform === "win32" ? "&" : ";";
const workingBranch = "update";
const noPush = process.argv.find(x => x === "--np" || x === "np");

async function main() {
  const freshCode = await getFreshCode();
  const files = getAllFilesInDir("lib", true);
  if (files.length > 0) {
    await newBranch();
    for (let i = 0, len = files.length; i < len; i++) {
      const decodedPath = getDecodedPath(files[i]);
      await decode(files[i], decodedPath, `${publicPart.token}${secretPart.token}`);
      await encode(decodedPath, files[i], freshCode);
      await track(Path.basename(files[i]));
    }
    resetRepoCode(freshCode);
  }
}

async function track(name) {
  await exec(commands("git add .", `git commit -m "update token of ${name}"`));
}

async function newBranch() {
  await exec(commands(`git checkout -b ${workingBranch}`));
}

async function getFreshCode() {
  const arg = process.argv.find(x => x.includes("--code=") || x.includes("code="));
  if (!arg) {
    return generateCode(8);
  } else {
    return arg.split("=")[1];
  }
}

async function resetRepoCode(fresh) {
  const publicTokenJson = require("./public-token.json");
  const tokenJson = require("./token.json");
  const [publicToken, secretToken] = getTokenPairs(fresh);
  publicTokenJson.general.token = publicToken;
  tokenJson.general.token = secretToken;
  Fs.writeFileSync(publicTokenJsonPath, JSON.stringify(publicTokenJson, null, 2));
  track("public-token.json");
  if (!noPush) await exec(`git push origin ${workingBranch}`);
  Fs.writeFileSync(tokenJsonPath, JSON.stringify(tokenJson, null, 2));
}

function commands(...args) {
  return args.join(` ${sep} `);
}

main();
