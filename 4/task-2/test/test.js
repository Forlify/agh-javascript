const { expect } = require('chai');
const { readPath } = require('../helper');
const path = require('path');

describe('readPath', () => {
  it('returns file content if file', () => {
    expect(readPath(path.join(__dirname, 'test.txt'))).to.equal('lorem ipsum');
  });

  it('returns undefined if directory', () => {
    expect(readPath(__dirname)).to.equal(undefined);
  });
});