const request = require('supertest');
const expect = require('chai').expect;
const dataForTests = require('./dataForTests');
const app = require('../server/app');
const sequelize = require('../server/api/models/database-connection');

// * ---------------------------------DB Connection----------------------------------
describe('DataBase Connection user controller', () => {
	it('connection to database', (done) => {
		sequelize.authenticate().then(done());
	});
});
// * --------------------------------------Sign Up------------------------------------

describe('Sign Up', () => {
	it('correct sign up', (done) => {
		request(app)
			.post('/api/user/signup')
			.send(dataForTests.correctSignUpRequest)
			.end((err, res) => {
				expect(res.statusCode).to.equal(200);
				done();
			});
	});

	it('fail sign up', (done) => {
		request(app)
			.post('/api/user/signup')
			.send(dataForTests.failSignUpRequest)
			.end((err, res) => {
				expect(res.statusCode).to.equal(422);
				done();
			});
	});
	it('not valid sign up', (done) => {
		request(app)
			.post('/api/user/signup')
			.send(dataForTests.notValidSignUpRequest)
			.end((err, res) => {
				expect(res.statusCode).to.equal(422);
				done();
			});
	});

	it('sign up failed situations', (done) => {
		request(app)
			.post('/api/user/signup')
			.send(dataForTests.correctSignUpRequest)
			.end((err, res) => {
				expect(res.message).to.not.equal('sign up failed');
				done();
			});
	});
});

// * -----------------------------------Sign In-------------------------------------

describe('correct sign in', () => {
	it('logged in correct ', (done) => {
		request(app)
			.post('/api/user/signin')
			.send(dataForTests.correctSignInRequest)
			.end((er, res) => {
				expect(res.statusCode).to.equal(200);
				done();
			});
	});

	it('logged in failed for email', (done) => {
		request(app)
			.post('/api/user/signin')
			.send(dataForTests.failEmailSignInRequest)
			.end((err, res) => {
				expect(res.statusCode).to.equal(404);
				done();
			});
	});

	it('logged in faied for password', (done) => {
		request(app)
			.post('/api/user/signin')
			.send(dataForTests.failPasswordSignInRequest)
			.end((err, res) => {
				expect(res.statusCode).to.equal(404);
				done();
			});
	});
});
//* -----------------------------------Get User Info-----------------------------------
describe('user info', () => {
	it('getting user info', (done) => {
		request(app)
			.get('/api/user/singleUserInfo')
			.set({ Authorization: dataForTests.token })
			.end((err, res) => {
				expect(res.statusCode).to.equal(200);
				done();
			});
	});
	it('fail getting user info', (done) => {
		request(app)
			.get('/api/user/singleUserInfo')
			.end((err, res) => {
				expect(res.statusCode).to.equal(401);
				done();
			});
	});
});
