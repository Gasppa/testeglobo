const Sequelize = require('sequelize');
const database = require('../config/db');
const Rooms = require('./Rooms')

const History = database.define('history', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

History.belongsTo(Rooms)

module.exports = History;