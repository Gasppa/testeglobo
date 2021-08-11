const Sequelize = require('sequelize');
const database = require('../config/db');

const Rooms = database.define('rooms', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = Rooms;