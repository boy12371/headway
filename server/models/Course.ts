import Sequelize from 'sequelize'
import connection from '../connection'

const Course = connection.define('course', {
    name: Sequelize.STRING,
})

import Unit from './Unit'

// Course:Unit is a n:n relationship because Unit can be shared among Courses
Course.hasMany(Unit)

export default Course

export { }
