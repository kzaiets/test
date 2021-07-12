const path = require("path");

module.exports = {
    mode:"development",
    entry: "./src/index.js", //entrypoint for webpack
    output: {
        filename: "bundled.js",   //name of the file where code goes
        path: path.resolve(__dirname, "dist") //name of folder for code to go in
}
}