const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const sequelize = require('./api/models/databaseConnection');
require('./api/middlewares/passportJWTConfig')(passport);
const router = require('./api/routes/router');
// ! --------------------------- MIDDLEWARES ---------------------------------------
app.use(passport.initialize());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());
app.use(cors());


app.use("/pictures", express.static(__dirname + '/pictures'));

// ? ---------------------- ROUTES ------------------------------

app.use('/api', router);

// ! ----------------------------------Database Sync--------------------------------
require('./api/models/databaseRelations');

//* for just creating the database
// 

// configuration.create({
// 	key: 'config',
// 	value: {
// 		status: [
// 			"Todo", "In Progress", "Done", "Done Done"
// 		],
// 		priority: [
// 			"Could", "Should", "Must"
// 		]
// 	}
// })
sequelize.sync();
//* For deleting database and creating again!

// sequelize.sync({
// 	force: true
// });

module.exports = app;