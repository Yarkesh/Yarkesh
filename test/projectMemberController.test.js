const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server/app');
const dataForTest = require('./dataForTests');
// !-----------------------------Add Members -----------------------------------------
describe('add member', () => {
	it('correct add members', (done) => {
		request(app)
			.post('/api/projectmembers/addmembers')
			.send(dataForTest.correctAddMembers)
			.set({ Authorization: dataForTest.token })
			.end((err, res) => {
				expect(res.statusCode).to.equal(200);
				done();
			});
	});
	it('fail add members', (done) => {
		request(app)
			.post('/api/projectmembers/addmembers')
			.send(dataForTest.correctAddMembers)
			.end((err, res) => {
				expect(res.statusCode).to.equal(401);
				done();
			});
	});
});

// !-----------------------------get project Members -----------------------------------------

describe('getproject member', () => {
	it('correct add members', (done) => {
		request(app)
			.post('/api/projectmembers/getmembers')
			.send(dataForTest.correctProjectId)
			.set({ Authorization: dataForTest.token })
			.end((err, res) => {
				expect(res.statusCode).to.equal(200);
				done();
			});
	});
	it('fail add members', (done) => {
		request(app)
			.post('/api/projectmembers/getmembers')
			.send(dataForTest.wrongeProjectIdForNotBeLoggedIn)
			.end((err, res) => {
				expect(res.statusCode).to.equal(401);
				done();
			});
	});
});
