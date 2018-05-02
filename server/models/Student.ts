import Sequelize from 'sequelize'
import connection from '../connection'

const Student = connection.define('student', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
})

export default Student
