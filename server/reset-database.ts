import connection from './connection'
import report from './report'

// Models
import Activity from './models/Activity'
import Admin from './models/Admin'
import Business from './models/Business'
import BusinessCourse from './models/BusinessCourse'
import BusinessStudent from './models/BusinessStudent'
import Card from './models/Card'
import Course from './models/Course'
import CourseStudent from './models/CourseStudent'
import Mentor from './models/Mentor'
import Student from './models/Student'
import Unit from './models/Unit'

import { createAdmin, createStudent, createMentor } from './actions'

// Data
const admins = require('../data/admins.json')
const students = require('../data/students.json')

const done = () => {
  connection.close()
  console.log('Done')
}

const main = async () => {
  await Course.create({ name: 'Turf Maintenance', adminId: 1 })
  await Course.create({ name: 'Pool Maintenance', adminId: 2 })
  await Unit.create({ name: 'Ploughing the field', courseId: 1, })
  await Business​​.create({ name: 'Green Options', adminId: 1 })
  await Business​​.create({ name: 'DCUBED', adminId: 2 })
  await Card.create({ name: 'Mowing a lawn', unitId: 1, evidence_task: 'Mow a lawn' })
  await createMentor({ first_name: 'Buddha', businessId: 1, email: 'buddha@gmail.com', password: 'password' })
  await createMentor({ first_name: 'Jesus', businessId: 1, email: 'jesus@hotmail.com', password: 'password' })
  await BusinessStudent.create({ businessId: 1, studentId: 1, })
  await BusinessStudent.create({ businessId: 1, studentId: 2, })
  await BusinessCourse​​.create({ businessId: 1, courseId: 1, })
  await CourseStudent.create({ courseId: 1, studentId: 1, })
  await CourseStudent.create({ courseId: 1, studentId: 2, })
  await CourseStudent.create({ courseId: 1, studentId: 3, })
  await CourseStudent.create({ courseId: 2, studentId: 3, })
  await CourseStudent.create({ courseId: 2, studentId: 2, })
  await Activity.create({ studentId: 1, cardId: 1, evidence_proof: 'I mowed a lawn', })
}

connection.sync({ force: true }).then(() => {
  Promise.all([
    ...admins.map(admin => createAdmin(admin)),
    ...students.map(student => createStudent(student)),
  ]).then(main).then(done)
})
