require('dotenv').config()
import connection from './connection'
import * as bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './constants'

import { Business, Card, Course, Mentor, Student, Unit, Admin, BusinessStudent, BusinessCourse, CourseStudent, Activity } from './models'
import { createAdmin, createStudent, createMentor } from './actions'

// Data
const admins = require('../data/admins.json')
const students = require('../data/students.json')
const cards = require('../data/cards.json')

const done = () => {
  connection.close()
  console.log('Done')
}

const main = async () => {
  if (!process.env.SAMPLE_DATA) {
    // TODO: once admin registration exists, this can be removed
    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
    const password = bcrypt.hashSync('password', salt)
    const name = 'EZ Training'
    Admin.create({
      id: 1,
      name,
      email: 'root',
      password,
      salt,
    }).then(admin => {
      Business.create({
        name,
        adminId: admin.id
      }).then(done)
    })
    return
  }
  console.log('Loading sample data')
  await Promise.all([
    ...admins.map(admin => createAdmin(admin)),
    ...students.map(student => createStudent(student)),
  ])
  await Course.create({ name: 'Sports Turf Management', adminId: 1 })
  await Course.create({ name: 'Pool Maintenance', adminId: 2 })
  await Unit.create({ name: 'Grass Maintenance', courseId: 1, })
  await Unit.create({ name: 'Maintaining chemical balance in pools', courseId: 2, })
  await Business.create({ name: 'Green Options', adminId: 1 })
  await Business.create({ name: 'Perfection Plus', adminId: 2 })
  await Promise.all(cards.map(d => {
    d.quiz = JSON.stringify(d.quiz)
    return Card.create(d)
  }))
  await createMentor({ first_name: 'Buddha', businessId: 1, email: 'buddha@gmail.com', password: 'password' })
  await createMentor({ first_name: 'Jesus', businessId: 1, email: 'jesus@hotmail.com', password: 'password' })
  await BusinessStudent.create({ businessId: 1, studentId: 1, })
  await BusinessStudent.create({ businessId: 1, studentId: 2, })
  await BusinessStudent.create({ businessId: 2, studentId: 1, })
  await BusinessCourse.create({ businessId: 1, courseId: 1, })
  await CourseStudent.create({ courseId: 1, studentId: 1, assigned: Date.now() })
  await CourseStudent.create({ courseId: 1, studentId: 2, assigned: Date.now() })
  await CourseStudent.create({ courseId: 1, studentId: 3, assigned: Date.now() })
  await CourseStudent.create({ courseId: 2, studentId: 1, assigned: Date.now() })
  await Activity.create({ studentId: 1, cardId: 1, text: 'I mowed my leg', completed: false })
  await Activity.create({ studentId: 1, cardId: 1, text: 'I mowed a lawn', completed: true })
  await Activity.create({ studentId: 1, text: 'I started a course' })
  done()
}

const reset = () => {
  connection.sync({ force: true }).then(() => {
    main()
  })
}

if (process.argv.pop() === '-run') {
  reset()
}

export default reset
