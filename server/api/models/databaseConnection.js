const Sequelize = require('sequelize');
const config = require('config');

// postgreSql database . name : Yarkesh . port : 5432
const sequelize = new Sequelize(
	config.get('sql.name'),
	config.get('sql.userName'),
	config.get('sql.password'),
	{
		host: config.get('sql.host'),
		dialect: 'postgres',
		logging: false
	}
);

module.exports = sequelize;
