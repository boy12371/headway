import Admin from './models/Admin'
import Card from './models/Card'
import Course from './models/Course'

import connection from './connection'

import * as bcrypt from 'bcrypt'
import Student from './models/Student';

const saltRounds = 10

const createAdmin = (username, plainTextPassword) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const password = bcrypt.hashSync(plainTextPassword, salt)
  Admin.create({
    username,
    password,
    salt,
  })
}

const createStudent = (email, plainTextPassword) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const password = bcrypt.hashSync(plainTextPassword, salt)
  Student.create({
    email,
    password,
    salt,
  })
}

connection.sync({ force: true }).then(() => {
  Promise.all([
    createAdmin('root', 'Dcubed!!'),
    createAdmin('s', 'p'),
    createAdmin('j', 'p'),
    createStudent('student', 'password'),
    Card.create({
      name: 'Best card ever'
    }),
    Course.create({
      name: 'Best course ever'
    }),
  ]).then(() => {
    connection.close()
    console.log('Done')
  })
})

export { }
