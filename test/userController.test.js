const request = require('supertest');
const app = require('../server/app');
const expect = require('chai').expect;
const sequelize = require('../server/api/models/database-connection');


//* ---------------------------------------DB Connection---------------------------------------
describe("DataBase Connection user controller", () => {
    it("connection to database", (done) => {
        sequelize.authenticate().then(done());
    })
})
//* ------------------------------------------Sign Up------------------------------------------
var correctSignUpRequest = {
    userName: "mammad5", //TODO: rewrite this for next test to be unique
    email: "mammad5@yahoo.com", //TODO: rewrite this for next test to be unique
    name: "mammad5",
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
            .post("/api/user/signup")
            .send(correctSignUpRequest)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done()
            })
    })

    it("fail sign up", (done) => {
        request(app)
            .post("/api/user/signup")
            .send(failSignUpRequest)
            .end((err, res) => {
                expect(res.statusCode).to.equal(422);
                done()
            })
    })
    it("not valid sign up", (done) => {
        request(app)
            .post("/api/user/signup")
            .send(notValidSignUpRequest)
            .end((err, res) => {
                expect(res.statusCode).to.equal(422);
                done()
            })
    })

    it("sign up failed situations", (done) => {
        request(app)
            .post("/api/user/signup")
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
    it("logged in correct ", (done) => {
        request(app).post("/api/user/signin").send(correctSignInRequest)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    })


    it("logged in failed for email", (done) => {
        request(app).post("/api/user/signin").send(failEmailSignInRequest)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            })
    })

    it("logged in faied for password", (done) => {
        request(app).post("/api/user/signin").send(failPasswordSignInRequest)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            })
    })

})
//* ------------------------------------------Get User Info------------------------------------------

//TODO: Check this....Change the token for next test to not to be not valid
var token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmV6YSIsImVtYWlsIjoicmV6YUB5YWhvby5jb20iLCJ1c2VySWQiOjMsInVzZXJOYW1lIjoicmV6YSIsImlhdCI6MTU2NTE1NDE0NiwiZXhwIjoxNTY1MTkwMTQ2fQ.r6KKrVmscwCwCwWwipmXdBNl6JRXLrWfHGHXmwAmR_s"

describe("user info", () => {
    it("getting user info", (done) => {
        request(app).get("/api/user/singleUserInfo").set({ Authorization: token })
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
    })
    it("fail getting user info", (done) => {
        request(app).get("/api/user/singleUserInfo")
            .end(function (err, res) {
                expect(res.statusCode).to.equal(401);
                done();
            })
    })
})