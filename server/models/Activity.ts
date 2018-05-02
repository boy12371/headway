import Sequelize from 'sequelize'
import connection from '../connection'

const Activity = connection.define('activity', {
    evidence_proof: Sequelize.STRING, // File
    completed: Sequelize.DATE,
})

const Student = require('./Student')
const Card = require('./Card')

Activity.hasOne(Student)
Activity.hasOne(Card)

export default Activity
