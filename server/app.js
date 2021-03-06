const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const sequelize = require('./api/models/databaseConnection');
require('./api/middlewares/passportJWTConfig')(passport);
const helmet = require('helmet');
const router = require('./api/routes/router');
const scriptRunner = require('./api/scripts/scriptRunner');
const rateLimit = require('express-rate-limit');
const moment = require('moment');
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 5 minutes
	max: 1000 // limit each IP to 100 requests per windowMs
});
const config = require('config');

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
app.use(helmet());

app.use('/pictures', express.static(__dirname + '/pictures'));

// ? ---------------------- ROUTES ------------------------------

app.use('/api', router);

// ! ----------------------------------Database Sync--------------------------------
require('./api/models/databaseRelations');

//* for just creating the database
// sequelize.sync();

scriptRunner.runAllScripts();

//* For deleting database and creating again!
console.log(process.env.NODE_ENV);
console.log(config.get('app.webServer.baseUrl'));
sequelize.sync({
	alter: true
});

module.exports = app;
