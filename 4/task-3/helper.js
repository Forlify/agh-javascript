const fs = require('fs');
const util = require('util');

const getFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      }

      const result = data.toString();
      resolve(result);
    });
  });
};

const readPath = async (path) => {
  try {
    const stats = await util.promisify(fs.lstat)(path);
    
    if(stats.isFile()) {
      return await getFile(path)
    }
    return undefined;

  } catch (e) {
    return e;
  }
};

module.exports = { readPath };