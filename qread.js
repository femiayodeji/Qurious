var fs = require("fs");

var inputFile = __dirname + '/public/res/ges301.txt'

var lineReader = require('readline').createInterface({input: require('fs').createReadStream(inputFile)})

console.log("\n begining of file\n--------------------")

lineReader.on('line', function (line) {
    console.log(line)
})

.on("close", () => {
    console.log("--------------------\n end of file.")
})
