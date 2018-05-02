const Sequelize = require('sequelize')
const sequelize = require('../connection')

const Trainer = sequelize.define('trainer', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
})

module.exports = Trainer
