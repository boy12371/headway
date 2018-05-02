const Sequelize = require('sequelize')
const sequelize = require('../connection')

const Course = sequelize.define('course', {
    name: Sequelize.STRING,
})

const Unit = require('./Unit')

// Course:Unit is a n:n relationship because Unit can be shared among Courses
Course.hasMany(Unit)

module.exports = Course
