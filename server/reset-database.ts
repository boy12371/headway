import connection from './connection'
import report from './report'

import { Business, Card, Course, Mentor, Student, Unit, Admin, BusinessStudent, BusinessCourse, CourseStudent, Activity } from './models'
import { createAdmin, createStudent, createMentor } from './actions'

// Data
const admins = require('../data/admins.json')
const students = require('../data/students.json')
const quiz = require('../data/quiz.json')

const done = () => {
  connection.close()
  console.log('Done')
}

const main = async () => {
  await Promise.all([
    ...admins.map(admin => createAdmin(admin)),
    ...students.map(student => createStudent(student)),
  ])
  await Course.create({ name: 'Sports Turf Management', adminId: 1 })
  await Course.create({ name: 'Pool Maintenance', adminId: 2 })
  await Unit.create({ name: 'Introduction', courseId: 1, })
  await Business.create({ name: 'Green Options', adminId: 1 })
  await Business.create({ name: 'Perfection Plus', adminId: 2 })
  await Card.create({ name: 'Welcome', unitId: 1, evidence_task: 'Demonstrate a set of clean tools', quiz: JSON.stringify(quiz) })
  await Card.create({ name: 'Welcome2', unitId: 1 })
  await Card.create({ name: 'Welcome3', unitId: 1 })
  await createMentor({ first_name: 'Buddha', businessId: 1, email: 'buddha@gmail.com', password: 'password' })
  await createMentor({ first_name: 'Jesus', businessId: 1, email: 'jesus@hotmail.com', password: 'password' })
  await BusinessStudent.create({ businessId: 1, studentId: 1, })
  await BusinessStudent.create({ businessId: 1, studentId: 2, })
  await BusinessCourse.create({ businessId: 1, courseId: 1, })
  await CourseStudent.create({ courseId: 1, studentId: 1, assigned: Date.now() })
  await CourseStudent.create({ courseId: 1, studentId: 2, assigned: Date.now() })
  await CourseStudent.create({ courseId: 1, studentId: 3, assigned: Date.now() })
  await CourseStudent.create({ courseId: 2, studentId: 3, assigned: Date.now() })
  await CourseStudent.create({ courseId: 2, studentId: 2, assigned: Date.now() })
  await Activity.create({ studentId: 1, cardId: 1, evidence_proof: 'I mowed a lawn', completed: true })
  // await Activity.create({ studentId: 1, cardId: 2, evidence_proof: 'I washed a lawn?', }) // DUPE!
  await Activity.create({ studentId: 1, cardId: 2, evidence_proof: 'I cleaned the deck', completed: true })
  await Activity.create({ studentId: 1, cardId: 3, evidence_proof: 'I hacked it out', completed: true})
  done()
}

connection.sync({ force: true }).then(() => {
  main()
})
