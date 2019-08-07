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

})