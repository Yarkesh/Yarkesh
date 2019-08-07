const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server/app')

//* ---------------------------------------Create Project---------------------------------------

var correctCreateProject = {
    title: "test",
    description: "this is from integration test"
}

//TODO: Check this....Change the token for next test to not to be not valid
var token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmV6YSIsImVtYWlsIjoicmV6YUB5YWhvby5jb20iLCJ1c2VySWQiOjMsInVzZXJOYW1lIjoicmV6YSIsImlhdCI6MTU2NTE1NDE0NiwiZXhwIjoxNTY1MTkwMTQ2fQ.r6KKrVmscwCwCwWwipmXdBNl6JRXLrWfHGHXmwAmR_s"



describe("create project", () => {

    it("correct create project", (done) => {
        request(app)
            .post('/api/project/createproject')
            .send(correctCreateProject)
            .set({ Authorization: token })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            })
    })
    it("failed create project without authorization", (done) => {
        request(app)
            .post('/api/project/createproject')
            .send(correctCreateProject)
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
            })
    })
})


//* ---------------------------------------Get Project Result---------------------------------------

var correctProjectId = {
    projectId: 2
}

var wrongeProjectIdForNotBeAMember = {
    projectId: 1
}

var wrongeProjectIdForNotBeLoggedIn = {
    projectId: 2
}
describe("get Project details", () => {
    it("correct get project details", (done) => {
        request(app)
            .post('/api/project/getprojectdetails')
            .send(correctProjectId)
            .set({ Authorization: token })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            })
    })
    it("failed to get project details for not being a member of that project", (done) => {
        request(app)
            .post('/api/project/getprojectdetails')
            .send(wrongeProjectIdForNotBeAMember)
            .set({ Authorization: token })
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
            })
    })
    it("failed to get project details for not being logged in", (done) => {
        request(app)
            .post('/api/project/getprojectdetails')
            .send(wrongeProjectIdForNotBeLoggedIn)
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
            })
    })
})
