import * as bcrypt from 'bcrypt'

import connection from './connection'
import report from './report'

// Models
import Activity from './models/Activity'
import Admin from './models/Admin'
import Card from './models/Card'
import Course from './models/Course'
import CourseStudent from './models/CourseStudent'
import Student from './models/Student'
import Unit from './models/Unit'

// Data
const admins = require('../data/admins.json')
const students = require('../data/students.json')

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

const createStudent = (student) => {
  const {email, first_name, last_name} = student
  const salt = bcrypt.genSaltSync(saltRounds)
  const password = bcrypt.hashSync(student.password, salt)
  Student.create({
    first_name,
    last_name,
    email,
    password,
    salt,
  })
}

const done = () => {
  connection.close()
  console.log('Done')
}

connection.sync({ force: true }).then(() => {
  Promise.all([
    ...admins.map(admin => createAdmin(admin.username, admin.password)),
    ...students.map(student => createStudent(student)),
    Course.create({ name: 'Turf Maintenance' }),
    Course.create({ name: 'Pool Maintenance' }),
    Unit.create({ name: 'Ploughing the field', courseId: 1, }),
    Card.create({ name: 'Mowing a lawn', unitId: 1, evidence_task: 'Mow a lawn' }),
  ]).then(() => {

    Promise.all([
      CourseStudent.create({ courseId: 1, studentId: 1, }),
      CourseStudent.create({ courseId: 1, studentId: 2, }),
      CourseStudent.create({ courseId: 1, studentId: 3, }),
      CourseStudent.create({ courseId: 2, studentId: 3, }),
      CourseStudent.create({ courseId: 2, studentId: 2, }),
      Activity.create({ studentId: 1, cardId: 1, evidence_proof: 'I mowed a lawn', })
    ])
      // .then(report)
      .then(done)
  })
})
