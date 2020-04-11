const fs = require('fs');

const getFile = (path) => {
    const contents = fs.readFileSync(path);
    const result = contents.toString();
    console.log(result);
    return result;
};

const readPath = (path) => {
    const stats = fs.lstatSync(path);
    let result;
    if (stats.isFile()) {
        console.log(`${path} is a file! Contents:`);
        result = getFile(path);
    } else if (stats.isDirectory()) {
        console.log(`${path} is a directory!`);
        result = undefined;
    }
    return result;
};

module.exports = { readPath };