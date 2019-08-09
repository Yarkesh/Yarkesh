const request = require('supertest');
const expect = require('chai').expect;
const dataForTests = require('./dataForTests');
const app = require('../server/app');

// * -----------------------------------Create Project-----------------------------------

describe('create project', () => {
	it('correct create project', (done) => {
		request(app)
			.post('/api/project/createproject')
			.send(dataForTests.correctCreateProject)
			.set({ Authorization: dataForTests.token })
			.end((err, res) => {
				expect(res.statusCode).to.equal(200);
				done();
			});
	});
	it('failed create project without authorization', (done) => {
		request(app)
			.post('/api/project/createproject')
			.send(dataForTests.correctCreateProject)
			.end((err, res) => {
				expect(res.statusCode).to.equal(401);
				done();
			});
	});
});

// * ---------------------------------Get Project details---------------------------------

describe('get Project details', () => {
	it('correct get project details', (done) => {
		request(app)
			.post('/api/project/getprojectdetails')
			.send(dataForTests.correctProjectId)
			.set({ Authorization: dataForTests.token })
			.end((err, res) => {
				expect(res.statusCode).to.equal(200);
				done();
			});
	});
	it('failed to get project details for not being a member of that project', (done) => {
		request(app)
			.post('/api/project/getprojectdetails')
			.send(dataForTests.wrongeProjectIdForNotBeAMember)
			.set({ Authorization: dataForTests.token })
			.end((err, res) => {
				expect(res.statusCode).to.equal(401);
				done();
			});
	});
	it('failed to get project details for not being logged in', (done) => {
		request(app)
			.post('/api/project/getprojectdetails')
			.send(dataForTests.wrongeProjectIdForNotBeLoggedIn)
			.end((err, res) => {
				expect(res.statusCode).to.equal(401);
				done();
			});
	});
});

// * ----------------------------get Projects By Creator Id------------------------------

describe('get Projects By Creator Id', () => {
	it('correctly getting Project by creator id', (done) => {
		request(app)
			.get('/api/project/getProjectsByCreator')
			.set({ Authorization: dataForTests.token })
			.end((err, res) => {
				expect(res.statusCode).to.equal(200);
				done();
			});
	});
	it('faild getting Project by creator id for authorization', (done) => {
		request(app)
			.get('/api/project/getProjectsByCreator')
			.end((err, res) => {
				expect(res.statusCode).to.equal(401);
				done();
			});
	});
});
