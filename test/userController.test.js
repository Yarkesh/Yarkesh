const request = require('supertest');
const app = require('../server/app');
const expect = require('chai').expect;
const sequelize = require('../server/api/models/database-connection');


//* ---------------------------------------DB Connection---------------------------------------
describe("DataBase Connection", () => {
    it("connection to database", (done) => {
        sequelize.authenticate().then(done());
    })
})


//* ------------------------------------------Sign Up------------------------------------------
var correctSingUpRequest = {
    userName: "farshad", //TODO: rewrite this for next test to be unique
    email: "farshad@yahoo.com", //TODO: rewrite this for next test to be unique
    name: "farshad",
    password: "mmmmm5",
    confirmPassword: "mmmmm5"
}

var failSingUpRequest = {
    userName: "reza",
    email: "reza@yahoo.com",
    name: "reza",
    password: "mmmmm5",
    confirmPassword: "mmmmm5"
}
var notValidSingUpRequest = {
    userName: "mohsen",
    email: "mohsen@yahoo.com",
    name: "mohsen",
    password: "mmmm5",
    confirmPassword: "mmmmm5"
}

describe("Sign Up", () => {

    it("correct sign up", (done) => {
        request(app)
            .post("/user/signup")
            .send(correctSingUpRequest)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done()
            })
    })

    it("fail sign up", (done) => {
        request(app)
            .post("/user/signup")
            .send(failSingUpRequest)
            .end((err, res) => {
                expect(res.statusCode).to.equal(422);
                done()
            })
    })
    it("not valid sign up", (done) => {
        request(app)
            .post("/user/signup")
            .send(notValidSingUpRequest)
            .end((err, res) => {
                expect(res.statusCode).to.equal(422);
                done()
            })
    })

    it("sign up failed situations", (done) => {
        request(app)
            .post("/user/signup")
            .send(correctSingUpRequest)
            .end((err, res) => {
                expect(res.message).to.not.equal('sign up failed');
                done()
            })
    })

})



//* ------------------------------------------Sign In------------------------------------------
var correctSingInRequest = {
    email: "ali@yahoo.com",
    password: "mmmmm5"
}

describe("sign in", () => {
    it("logged in", (done) => {
        request(app).post("/user/signin").send(correctSingInRequest)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    })
})
