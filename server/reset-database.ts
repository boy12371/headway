import Admin from './models/Admin'
import Card from './models/Card'
import Course from './models/Course'

import connection from './connection'

import * as bcrypt from 'bcrypt'
import Student from './models/Student';
import Unit from './models/Unit';
import CourseStudent from './models/CourseStudent';
import Activity from './models/Activity';

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
      .then(main)
      // .then(done)
  })
})

const main = () => {
  Student.findAll({ include: [Card] }).then(students => {
    students.forEach(student => {
      student.cardActivities.forEach(card => {
        const json = card.toJSON()
        console.log(`Card "${card.name}" evidence_task: "${card.evidence_task}"`)
        console.log(`Student ${student.email} provided evidence: "${json.Activity.evidence_proof}"`)
      })
    })
  })

  Course.findAll({ include: [Unit, Student] }).then((courses) => {
    courses.forEach(course => {
      course.units.forEach(unit => {
        console.log(course.name, 'has unit:', unit.name)
      })
      course.students.forEach(student => {
        console.log(course.name, 'has student:', student.email)
      })
    })
  })

  Student.findAll({ include: [Course] }).then(students => {
    students.forEach(student => {
      student.courses.forEach(course => {
        console.log(student.email, 'is enrolled in', course.name)
      })
    })
  })

  Unit.findAll({ include: [Course, Card] }).then(units => {
    units.forEach(unit => {
      console.log(unit.name, 'belongs to', unit.course.name)
      unit.cards.forEach(card => {
        console.log('Unit', unit.name, 'contains card', card.name)
      })
    })
  })
}
