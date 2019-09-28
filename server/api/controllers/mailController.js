'use strict';
const nodemailer = require('nodemailer');
const config = require('config');

module.exports.emailVerification = async (email, confirmationCode) => {

	let transporter = nodemailer.createTransport({
		service: config.get('app.mail.servise'),
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
			text: `Hello , Please use this code to activate your account.
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
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		// host: 'gmail',
		service: 'gmail',
		secure: false,
		auth: {
			user: config.app.mail.mail,
			// generated ethereal user
			pass: config.app.mail.password
			// generated ethereal password
		},
		tls: {
			rejectUnauthorized: false
		}
	});
	// send mail with defined transport object
	// TODO: fix this
	let info = await transporter
		.sendMail({
			from: 'hoosht101@gmail.com',
			// sender address
			to: email,
			// list of receivers
			subject: 'Hello ✔ ',
			// Subject line
			text: `Hello world activation code: ${forgotPasswordCode}`
			// plain text body
		})
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});
	// console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	// console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};