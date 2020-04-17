const fs = require('fs');

const getFile = (path) => {
  const contents = fs.readFileSync(path);
  return contents.toString();
};

function reverseString(str) {
  var newString = "";
  for (var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}

function stringBuilder(content) {
  var sb = '';
  for (var i = 0; i < content.length; i++) {
    if (i != 0) sb = sb.concat("\n");
    for (var j = 0; j < content[i].length; j++) {
      if (j != 0) sb = sb.concat(" ");
      sb = sb.concat(content[i][j])
    }
  }
  return sb;
}

const processArgs = (args) => {
  let result = [];
  let operands = args.split(" ");
  for (operand of operands) {
    var filepath = operand.split(":")[0];
    var operation = operand.split(":")[1];
    var arguments = operand.split(":")[2].split(",");
    var content = getFile(filepath)

    var orginalContent = content;
    content = content.split("\n")

    for (let i = 0; i < content.length; i++) {
      content[i] = content[i].split(" ");
    }

    if (operation === "reverse") {
      let N = arguments[0];
      let M = arguments[1] - 1;
      for (let i = 0; i < content[M].length; i++) {
        if (i % N == 0) {
          content[M][i] = reverseString(content[M][i])
        }
      }
    }

    if (operation === "delete") {
      let N = parseInt(arguments[0]);
      let M = parseInt(arguments[1] - 1);

      for (let i = 0; i < content[M].length; i++) {
        if (i % N == 0) {
          content[M][i] = ""
        }
      }
    }
    result.push([orginalContent,stringBuilder(content)]);
  }

  return result;
};

module.exports = { processArgs };