const { readPath } = require('./helper');

try {
  readPath(process.argv[2]);
} catch (e) {
  console.log(`Error: ${e.message}`);
}