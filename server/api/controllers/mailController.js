'use strict';
const nodemailer = require('nodemailer');
const config = require('config');

module.exports.emailVerification = async (email, confirmationCode) => {
	let transporter = nodemailer.createTransport({
		host: config.get('app.mail.host'),
		port: config.get('app.mail.port'),
		secure: true, // use TLS
		auth: {
			user: config.get('app.mail.user'),
			pass: config.get('app.mail.password')
		},
		tls: {
			// do not fail on invalid certs
			rejectUnauthorized: false
		}
	});
	// transporter.verify(function(error, success) {
	// 	if (error) {
	// 		console.log(error);
	// 	} else {
	// 		console.log('Server is ready to take our messages');
	// 	}
	// });
	// TODO: fix this
	let info = await transporter
		.sendMail({
			from: config.get('app.mail.mail'),
			to: email,
			subject: 'Kayer Confirmation Code',
			text: `Hello ,
			Thanks for signing up.
			Please use this code to activate your account.
			code: ${confirmationCode}`
		})
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.forgotPassword = async (email, forgotPasswordCode) => {
	let transporter = nodemailer.createTransport({
		host: config.get('app.mail.host'),
		port: config.get('app.mail.port'),
		secure: true, // use TLS
		auth: {
			user: config.get('app.mail.user'),
			pass: config.get('app.mail.password')
		},
		tls: {
			// do not fail on invalid certs
			rejectUnauthorized: false
		}
	});

	let info = await transporter
		.sendMail({
			from: config.get('app.mail.mail'),
			to: email,
			subject: 'Kayer Confirmation Code',
			text: `Hello ,This is your code. Use it to set a new password: ${forgotPasswordCode}`
		})
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.inviteEmail = async (email, sender, project, message) => {
	let transporter = nodemailer.createTransport({
		host: config.get('app.mail.host'),
		port: config.get('app.mail.port'),
		secure: true, // use TLS
		auth: {
			user: config.get('app.mail.user'),
			pass: config.get('app.mail.password')
		},
		tls: {
			// do not fail on invalid certs
			rejectUnauthorized: false
		}
	});
	//deleted async from here
	return transporter
		.sendMail({
			from: config.get('app.mail.mail'),
			to: email,
			subject: `Kayer invitaion`,
			text: `Hello ,${sender.name} has invited you to join project ${project.title} on kayer
with the message: ${message}
you can signup from the link below
----Link----
			`
		})
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});
};
