const Sequelize = require('sequelize')
const sequelize = require('../connection')

const Card = sequelize.define('card', {
    name: Sequelize.STRING,
    content: Sequelize.STRING,
    evidence_task: Sequelize.STRING,
    quiz: Sequelize.STRING, // freeform JSON
    media: Sequelize.STRING, // freeform JSON
})

module.exports = Card
