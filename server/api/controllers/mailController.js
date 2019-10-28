'use strict';
const nodemailer = require('nodemailer');
const config = require('config');

module.exports.emailVerification = async (email, confirmationCode) => {
	let transporter = nodemailer.createTransport({
		service: config.get('app.mail.service'),
		secure: false,
		auth: {
			user: config.get('app.mail.mail'),
			pass: config.get('app.mail.password')
		},
		tls: {
			rejectUnauthorized: false
		}
	});
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
			// console.log(result);
		})
		.catch((err) => {
			// console.log(err);
		});
};

module.exports.forgotPassword = async (email, forgotPasswordCode) => {

	let transporter = nodemailer.createTransport({
		service: config.get('app.mail.service'),
		secure: false,
		auth: {
			user: config.get('app.mail.mail'),
			pass: config.get('app.mail.password')
		},
		tls: {
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
			// console.log(result);
		})
		.catch((err) => {
			// console.log(err);
		});

};



module.exports.inviteEmail = async (email, sender, project, message) => {
	let transporter = nodemailer.createTransport({
		service: config.get('app.mail.service'),
		secure: false,
		auth: {
			user: config.get('app.mail.mail'),
			pass: config.get('app.mail.password')
		},
		tls: {
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

			// console.log(result);
		})
		.catch((err) => {
			// console.log(err);
		});

};