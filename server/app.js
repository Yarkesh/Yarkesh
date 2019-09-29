const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const sequelize = require('./api/models/databaseConnection');
require('./api/middlewares/passportJWTConfig')(passport);
var helmet = require('helmet')
const router = require('./api/routes/router');
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
// ! --------------------------- MIDDLEWARES ---------------------------------------
app.use(passport.initialize());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(limiter);
app.use(bodyParser.json());
app.use(cors());
app.use(helmet())


app.use("/pictures", express.static(__dirname + '/pictures'));

// ? ---------------------- ROUTES ------------------------------

app.use('/api', router);

// ! ----------------------------------Database Sync--------------------------------
require('./api/models/databaseRelations');

//* for just creating the database

// configuration.create({
// 	key: 'config',
// 	value: {
// 		story: {
// 			status: [
// 				"Todo", "In Progress", "Done", "Done Done"
// 			],
// 			priority: [
// 				"Could", "Should", "Must"
// 			]
// 		},
// 		sprint: {
// 			status: ['Done', 'Active', 'Future']
// 		}

// 	}
// })

sequelize.sync();

//* For deleting database and creating again!

// sequelize.sync({
// 	force: true
// });

module.exports = app;