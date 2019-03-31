const Path = require("path");
const shell = require("shelljs");
const Fs = require("fs");

const getEncodedPath = name => Path.resolve("lib", name);

const getDecodedPath = name => Path.resolve("dist", name);

const repoJsonPath = Path.resolve("src", "repositories.json");

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
  getEncodedPath,
  getDecodedPath,
  repoJsonPath,
  getAllFilesInDir,
  getAllDirsOfFiles,
  mkDirs
};
