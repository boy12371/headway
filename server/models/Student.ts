import Sequelize from 'sequelize'
import connection from '../connection'

export interface IStudent {
    id: Number
    first_name: String
    last_name: String
    email: String
    password: String
    salt: String
}

const Student = connection.define('student', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
})

export default Student
