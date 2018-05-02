const Sequelize = require('sequelize')
const connection = require('../connection')

const Admin = connection.define('admin', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
})

module.exports = Admin
