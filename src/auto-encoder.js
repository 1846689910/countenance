const { getTimeString } = require("./utils");
let encode;
const FgMagenta = "\x1b[35m";
const Bright = "\x1b[1m";
const Reset = "\x1b[0m";
function autoEncode() {
  let interval = 30000;
  const args = process.argv.find(x => x.startsWith("int=") || x.startsWith("--int="));
  if (args) {
    interval = parseInt(args.split("=")[1]);
  }
  setInterval(() => {
    if (!encode) {
      encode = require("./encode-handler");
    } else {
      encode();
    }
    console.log(`${FgMagenta}${Bright}-- auto-encoded by ${getTimeString()} --${Reset}`);
  }, interval);
}
autoEncode();
