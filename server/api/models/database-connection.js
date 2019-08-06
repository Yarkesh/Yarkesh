

const Sequelize = require('sequelize');
const postgresConfig = require('../../config/databaseConfig')

//postgreSql database . name : Yarkesh . port : 5432 
const sequelize = new Sequelize(postgresConfig.name, postgresConfig.userName, postgresConfig.password, {
  host: postgresConfig.host,
  dialect: 'postgres'
});

module.exports = sequelize