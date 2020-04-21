var chai = require('chai');
chai.use(require('chai-json'));
var expect = require('chai').expect;
const handleOperations = require('../src/handler.js');
const fs = require('fs');

describe('test data.json file', function () {
    it('should return [3, 3, 3, 3]', function () {
        let rawdata = fs.readFileSync('data.json');
        let operations = JSON.parse(rawdata);
        let results = handleOperations(operations);
        for(result of results)
            expect(result).to.equal(3);
    });
});