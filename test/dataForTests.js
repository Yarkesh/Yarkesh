// ! ------jwt--------------------------check and change this
module.exports.token =
	'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
	'.eyJuYW1lIjoicmV6YSIsImVtYWlsIjoicmV6YUB5YWhv' +
	'by5jb20iLCJ1c2VySWQiOjMsInVzZXJOYW1lIjoicmV6Y' +
	'SIsImlhdCI6MTU2NTE1NDE0NiwiZXhwIjoxNTY1MTkwMT' +
	'Q2fQ.r6KKrVmscwCwCwWwipmXdBNl6JRXLrWfHGHXmwAmR_s';

// ! ------user--------------------------change the first one for aeach test
module.exports.correctSignUpRequest = {
	userName: 'mammad5',
	email: 'mammad5@yahoo.com',
	name: 'mammad5',
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

// ! ------project--------------------------change tthe ids to match the use token

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
