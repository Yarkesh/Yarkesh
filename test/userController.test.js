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
var correctSignUpRequest = {
    userName: "jake11", //TODO: rewrite this for next test to be unique
    email: "jake11@yahoo.com", //TODO: rewrite this for next test to be unique
    name: "jake11",
    password: "mmmmm5",
    confirmPassword: "mmmmm5"
}

var failSignUpRequest = {
    userName: "reza",
    email: "reza@yahoo.com",
    name: "reza",
    password: "mmmmm5",
    confirmPassword: "mmmmm5"
}
var notValidSignUpRequest = {
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
            .send(correctSignUpRequest)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done()
            })
    })

    it("fail sign up", (done) => {
        request(app)
            .post("/user/signup")
            .send(failSignUpRequest)
            .end((err, res) => {
                expect(res.statusCode).to.equal(422);
                done()
            })
    })
    it("not valid sign up", (done) => {
        request(app)
            .post("/user/signup")
            .send(notValidSignUpRequest)
            .end((err, res) => {
                expect(res.statusCode).to.equal(422);
                done()
            })
    })

    it("sign up failed situations", (done) => {
        request(app)
            .post("/user/signup")
            .send(correctSignUpRequest)
            .end((err, res) => {
                expect(res.message).to.not.equal('sign up failed');
                done()
            })
    })

})



//* ------------------------------------------Sign In------------------------------------------
var correctSignInRequest = {
    email: "ali@yahoo.com",
    password: "mmmmm5"
}
var failEmailSignInRequest = {
    email: "aliyahoo.com",
    password: "mmmmm5"
}
var failPasswordSignInRequest = {
    email: "aliyahoo.com",
    password: "mmmmm5"
}

describe("correct sign in", () => {
    it("logged in", (done) => {
        request(app).post("/user/signin").send(correctSignInRequest)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    })
})

describe("fail(email) sign in", () => {
    it("logged in", (done) => {
        request(app).post("/user/signin").send(failEmailSignInRequest)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            })
    })
})

describe("fail(password) sign in", () => {
    it("logged in", (done) => {
        request(app).post("/user/signin").send(failPasswordSignInRequest)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            })
    })
})


//* ------------------------------------------Get User Info------------------------------------------


var token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWxpIiwiZW1haWwiOiJhbGlAeWFob28uY29tIiwidXNlcklkIjoxLCJ1c2VyTmFtZSI6ImFsaSIsImlhdCI6MTU2NTExMjc4MiwiZXhwIjoxNTY1MTQ4NzgyfQ.VzRxFMiVQNLoJqVhQ-2PP2PIcbFTV5Rv44jQTPBk2jI"



describe("user info", () => {
    it("getting user info", (done) => {
        request(app).get("/user/singleUserInfo").set({ Authorization: token })
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    })
    it("fail getting user info", (done) => {
        request(app).get("/user/singleUserInfo")
            .end(function (err, res) {
                expect(res.statusCode).to.equal(401);
                done();
            })
    })
})