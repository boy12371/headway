const Sequelize = require('sequelize')
const sequelize = require('../connection')

const Mentor = sequelize.define('mentor', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
})

module.exports = Mentor
