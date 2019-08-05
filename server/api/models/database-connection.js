const Sequelize = require('sequelize');
const postgresConfig = require('../../config/databaseConfig')
//postgreSql database . name : Yarkesh . port : 5432 
const sequelize = new Sequelize(postgresConfig.postgresname, postgresConfig.postgresuserName, postgresConfig.postgresPassword, {
  host: postgresConfig.postgreshost,
  dialect: 'postgres'
});

module.exports = sequelize