const Sequelize = require('sequelize')
const sequelize = require('../connection')

const Activity = sequelize.define('activity', {
    evidence_proof: Sequelize.STRING, // File
    completed: Sequelize.DATE,
})

const Student = require('./Student')
const Card = require('./Card')

Activity.hasOne(Student)
Activity.hasOne(Card)

module.exports = Activity
