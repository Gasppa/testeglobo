const Sequelize = require('sequelize');
const sequelize = new Sequelize('XXXXXXXXX', 'XXXXXXXXX', 'XXXXXXXXX', {dialect: 'mysql', host: 'XXXXXXXXX'});

module.exports = sequelize;