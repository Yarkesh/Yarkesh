var request = require('supertest');
var app = require('../server/app');
var expect = require('chai').expect;


describe("sign in", () => {

    it("logged in", (done) => {
        request(app).post("/api/signin").send({
            email: "reza@yahoo.com",
            password: "mmmmm5"
        })
            .expect(200, done)
    })
})
