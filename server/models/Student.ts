const Sequelize = require('sequelize')
const sequelize = require('../connection')

const Student = sequelize.define('student', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
})

module.exports = Student
