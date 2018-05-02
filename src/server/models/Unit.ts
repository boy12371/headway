const Sequelize = require('sequelize')
const sequelize = require('../connection')

const Unit = sequelize.define('unit', {
    name: Sequelize.STRING,
})

const Card = require('./Card')

Unit.hasMany(Card) // needs order, too

module.exports = Unit
