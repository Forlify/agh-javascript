"use strict";

var expect = chai.expect;

function cyfry(napis) {
    let result = 0;
    napis.split('').forEach(char => {
        if (!isNaN(char)) {
            result += parseInt(char);
        }
    });
    return result;
}
// 

describe('The cyfry() function', () => {
    it('Returns 3 for 111', () => {
        expect(cyfry("111")).to.equal(3);
    });
    it('Returns 2 for 11aa', () => {
        expect(cyfry("11aa")).to.equal(2);
    });
    it('Returns 0 for aaa', () => {
        expect(cyfry("aaa")).to.equal(0);
    });
    it('Returns 15 for b3345a', () => {
        expect(cyfry("b3345a")).to.equal(15);
    });
    it('Returns 0 for nothing', () => {
        expect(cyfry("")).to.equal(0);
    });
});

function litery(napis) {
    let result = 0;
    napis.split('').forEach(char => {
        if (char.match(/[a-z]/i)) {
            result++;
        }
    });
    return result;
}

describe('The litery() function', () => {
    it('Returns 3 for 111', () => {
        expect(litery("111")).to.equal(0);
    });
    it('Returns 2 for 11aa', () => {
        expect(litery("11aa")).to.equal(2);
    });
    it('Returns 3 for aaa', () => {
        expect(litery("aaa")).to.equal(3);
    });
    it('Returns 15 for b3345a', () => {
        expect(litery("b3345a")).to.equal(2);
    });
    it('Returns 0 for nothing', () => {
        expect(litery("")).to.equal(0);
    });
});

let result = 0;

function suma(napis) {
    if (napis === '') return result;
    let numberString = '';
    for (var i = 0; i < napis.length; i++) {
        if (!isNaN(napis[i])) {
            numberString = numberString.concat(napis[i]);
        } else {
            const added = numberString === '' ? 0 : parseInt(numberString);
            result = result + added;
            return result;
        }
    }
    result = parseInt(numberString);
    return result;
}

describe('The suma() function', () => {
    it('Returns 111 for 111', () => {
        expect(suma("111")).to.equal(111);
    });
    it('Returns 111 for aaa', () => {
        expect(suma("aaa")).to.equal(111);
    });
    it('Returns 122 for 11aa', () => {
        expect(suma("11aa")).to.equal(122);
    });
    it('Returns 122 for b3345a', () => {
        expect(suma("b3345a")).to.equal(122);
    });
    it('Returns 122 for nothing', () => {
        expect(suma("")).to.equal(122);
    });
});