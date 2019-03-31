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

/**
 * @description given a directory, list all files within it
 * @param {*} dir: the directory that all files within it needs to be searched
 * @param {*} recursive: do recursive search, default value: false
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
 * @param {*} files: array of file paths
 */
const getAllDirsOfFiles = files => {
  const set = new Set();
  files.forEach(p => set.add(Path.dirname(p)));
  return [...set];
};

/**
 * recursive generate all non-existing directories
 * @param {*} dirs: all dirs needed
 */
const mkDirs = dirs =>
  dirs.filter(x => !Fs.existsSync(x)).forEach(x => Fs.mkdirSync(x, { recursive: true }));

module.exports = {
  getDecodedPath,
  getEncodedPath,
  tokenJsonPath,
  getAllFilesInDir,
  getAllDirsOfFiles,
  mkDirs
};
