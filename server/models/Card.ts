import Sequelize from 'sequelize'
import connection from '../connection'

const Card = connection.define('card', {
    name: Sequelize.STRING,
    content: Sequelize.STRING,
    evidence_task: Sequelize.STRING,
    quiz: Sequelize.STRING, // freeform JSON
    media: Sequelize.STRING, // freeform JSON
})

export default Card
