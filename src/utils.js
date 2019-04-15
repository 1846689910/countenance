const Path = require("path");
const shell = require("shelljs");
const Fs = require("fs");

const getDecodedPath = path => {
  let filename = Path.basename(path);
  const libDir = Path.resolve("lib");
  const dir = Path.dirname(path).substring(libDir.length + 1);
  filename = filename.substring(0, filename.lastIndexOf(".ecd"));
  return Path.resolve("dist", dir, filename);
};

const getEncodedPath = path => {
  const filename = `${Path.basename(path)}.ecd`;
  const distDir = Path.resolve("dist");
  const dir = Path.dirname(path).substring(distDir.length + 1);
  return Path.resolve("lib", dir, filename);
};

const tokenJsonPath = Path.resolve("src", "token.json");

const publicTokenJsonPath = Path.resolve("src", "public-token.json");

/**
 * @description given a directory, list all files within it
 * @param {string} dir: the directory that all files within it needs to be searched
 * @param {boolean} recursive: do recursive search, default value: false
 */
const getAllFilesInDir = (dir, recursive = false) => {
  const args = recursive ? ["-R", Path.resolve(dir)] : [Path.resolve(dir)];
  return shell
    .ls(...args)
    .map(x => Path.resolve(dir, x))
    .filter(x => Fs.statSync(x).isFile());
};

/**
 * get all the files directory
 * @param {array} files: array of file paths
 */
const getAllDirsOfFiles = files => {
  const set = new Set();
  files.forEach(p => set.add(Path.dirname(p)));
  return [...set];
};

/**
 * recursive generate all non-existing directories
 * @param {string} dirs: all dirs needed
 */
const mkDirs = dirs =>
  dirs.filter(x => !Fs.existsSync(x)).forEach(x => Fs.mkdirSync(x, { recursive: true }));

const generateCode = digits => {
  const chars = [];
  for (let i = 0; i < 10; i ++) chars.push(`${i}`); // numbers
  for (let i = 0; i < 26; i ++) chars.push(...[String.fromCharCode(i + 97), String.fromCharCode(i + 65)]); // characters
  chars.push(...["#", "@", "+", "-", "_", "%", "*"]);
  const code = [];
  for (let i = 0; i < digits; i ++) {
    const idx = Math.floor(Math.random() * chars.length) + 1;
    code.push(chars[idx]);
  }
  return code.join("");
};

const getTimeString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

/**
 * split token into two parts [publicToken, secretToken]
 * `publicToken` will be stored in `public-token.json`, while the `secretToken` will be stored in `token.json`
 * @param {string} token: the integral token
 */
const getTokenPairs = token => [token.substring(0, 10), token.substring(10)];

module.exports = {
  getDecodedPath,
  getEncodedPath,
  publicTokenJsonPath,
  tokenJsonPath,
  getAllFilesInDir,
  getAllDirsOfFiles,
  mkDirs,
  generateCode,
  getTimeString,
  getTokenPairs
};
