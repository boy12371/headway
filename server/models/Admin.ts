import Sequelize from 'sequelize'
import connection from '../connection'

const Admin = connection.define('admin', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
})

export default Admin
