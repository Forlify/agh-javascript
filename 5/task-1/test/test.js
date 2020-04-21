//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
const { expect } = require('chai');

const { app, x, y } = require('../app2');
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");

// UNIT test begin
describe('GET /', function () {
    it('respond with html', function (done) {
        server
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
});


describe('GET /', () => {
    it('1 + 2 = 3', async () => {
        const response = await supertest(app)
            .get('/')
            .send()
            .expect('Content-Type', /html/)
            .expect(200);

        expect(response.text).to.include('1 + 2 = 3');
    });
});

describe('GET /add/:x/:y', () => {
    it('x + y = x+y', async () => {
        const response = await supertest(app)
            .get('/add/3/3')
            .send()
            .expect('Content-Type', /html/)
            .expect(200);

        expect(response.text).to.include('<h1>3 + 3 = 6</h1>');
    });
});