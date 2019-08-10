'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async () => {
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
		}
	});

	// send mail with defined transport object
	// TODO: fix this
	let info = await transporter.sendMail({
		from: 'hoosht101@gmail.com',
		// sender address
		to: 'atrabiboy@gmail.com',
		// list of receivers
		subject: 'Hello ✔',
		// Subject line
		text: 'Hello world?'
		// plain text body
	});

	// console.log('Message sent: %s', info.messageId);
	// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// // Preview only available when sending through an Ethereal account
	// console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	// // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
