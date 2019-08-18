// ! ------jwt--------------------------check and change this
module.exports.token =
	'bearer eyJhbGciOiJIUzI1NiIsI' +
	'nR5cCI6IkpXVCJ9.eyJuYW1lIjoiY' +
	'WxpIiwiZW1haWwiOiJhbGlAeWFob28' +
	'uY29tIiwidXNlcklkIjoxLCJ1c2VyT' +
	'mFtZSI6ImFsaSIsImlhdCI6MTU2NTM' +
	'zMDk4NywiZXhwIjoxNTY1MzY2OTg3f' +
	'Q.EFE3ptqiDNQ8GBP8fINg-uk_DgCb' +
	'P_I7Zpi-3bOQVxU';

// ! ------user--------------------------change the first one for aeach test
module.exports.correctSignUpRequest = {
	userName: `mammad${Math.floor(Math.random()*100)}`,
	email: `mammad${Math.floor(Math.random()*100)}@yahoo.com`,
	name: 'mammad6',
	password: 'mmmmm5',
	confirmPassword: 'mmmmm5'
};
module.exports.failSignUpRequest = {
	userName: 'reza',
	email: 'reza@yahoo.com',
	name: 'reza',
	password: 'mmmmm5',
	confirmPassword: 'mmmmm5'
};
module.exports.notValidSignUpRequest = {
	userName: 'mohsen',
	email: 'mohsen@yahoo.com',
	name: 'mohsen',
	password: 'mmmm5',
	confirmPassword: 'mmmmm5'
};
module.exports.correctSignInRequest = {
	email: 'ali@yahoo.com',
	password: 'mmmmm5'
};
module.exports.failEmailSignInRequest = {
	email: 'aliyahoo.com',
	password: 'mmmmm5'
};
module.exports.failPasswordSignInRequest = {
	email: 'aliyahoo.com',
	password: 'mmmmm5'
};

// ! ------project--------------------------change the ids to match the use token

module.exports.correctCreateProject = {
	title: 'test',
	description: 'this is from integration test'
};

module.exports.correctProjectId = {
	projectId: 2
};

module.exports.wrongeProjectIdForNotBeAMember = {
	projectId: 1
};

module.exports.wrongeProjectIdForNotBeLoggedIn = {
	projectId: 2
};

// !------------------------Project Members ----------------------------------
module.exports.correctAddMembers = {
	userId: '1',
	projectId: '2'
};
