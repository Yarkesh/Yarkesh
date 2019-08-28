'use strict';
const nodemailer = require('nodemailer');
const config = require('config');

// async..await is not allowed in global scope, must use a wrapper
module.exports.emailVerification = async (email, confirmationCode) => {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		// host: 'gmail',
		service: 'gmail',
		secure: false,
		auth: {

			user: config.get('app.mail.mail'),
			// generated ethereal user
			pass: config.get('app.mail.password')
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
			text: `Hello world activation code: ${confirmationCode}`
			// plain text body
		})
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});
	// console.log('Message sent: %s', info.messageId);
	// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// // Preview only available when sending through an Ethereal account
	// console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	// // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
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
			user: 'hoosht101@gmail.com',
			// generated ethereal user
			pass: 'mahdi76talebi'
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
	// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// // Preview only available when sending through an Ethereal account
	// console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	// // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
