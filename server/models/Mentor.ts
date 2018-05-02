import Sequelize from 'sequelize'
import connection from '../connection'

const Mentor = connection.define('mentor', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
})

export default Mentor
