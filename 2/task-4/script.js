"use strict";

let map = new Map()
let counter = 0;

function submitForm() {
    let form = document.forms.formLines;

    if (!form.elements.first.checked)
        map.clear()

    const linesString = form.elements.lines.value;

    let lines = linesString.split(/\r?\n/); //.filter((line) => line !== "");

    for (let i = 0; i < lines.length; i++) {
        let mapValue = map.get(lines[i]);

        if (!!lines[i].match(/^[a-zA-Z]/))
            if (mapValue)
                map.set(lines[i], mapValue + 1);
            else
                map.set(lines[i], 1);

        if (!!lines[i].match(/^[0-9]+$/))
            if (mapValue)
                map.set(lines[i], mapValue.concat(" ", i.toString()));
            else
                map.set(lines[i], i.toString());
    }

    for (let [key, value] of map)
        console.log(key + ' = ' + value)
}

var expect = chai.expect;

describe('Test form functionality', () => {
    it('only one submit', () => {
        let form = document.forms.formLines;

        form.elements.lines.value = "aaa\nbbb\naaa\n111\n111";
        submitForm();

        expect(map.get("aaa")).to.equal(2);
        expect(map.get("bbb")).to.equal(1);
        expect(map.get("111")).to.equal("3 4");
    });

    it('all submits', () => {
        let form = document.forms.formLines;
        form.elements.first.checked = true;

        form.elements.lines.value = "aaa\nbbb\naaa\n111\n111";
        submitForm();

        expect(map.get("aaa")).to.equal(4);
        expect(map.get("bbb")).to.equal(2);
        expect(map.get("111")).to.equal("3 4 3 4");
        form.elements.lines.value = "";

    });

    it('all submits vol2', () => {
        let form = document.forms.formLines;
        form.elements.first.checked = true;

        form.elements.lines.value = "111\n222\n222\n111\naaa\nbbb";
        submitForm();

        expect(map.get("aaa")).to.equal(5);
        expect(map.get("bbb")).to.equal(3);
        expect(map.get("111")).to.equal("3 4 3 4 0 3");
        expect(map.get("222")).to.equal("1 2");
        form.elements.lines.value = "";

    });

    it('only one vol2', () => {
        let form = document.forms.formLines;
        form.elements.first.checked = false;

        form.elements.lines.value = "111\n222\n222\n111\naaa\nbbb";
        submitForm();

        expect(map.get("aaa")).to.equal(1);
        expect(map.get("bbb")).to.equal(1);
        expect(map.get("111")).to.equal("0 3");
        expect(map.get("222")).to.equal("1 2");
        form.elements.lines.value = "";

    });
});
