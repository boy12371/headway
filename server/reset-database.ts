import Admin from './models/Admin'
import Card from './models/Card'
import Course from './models/Course'

import connection from './connection'

import * as bcrypt from 'bcrypt'
import Student from './models/Student';
import Unit from './models/Unit';
import CourseStudent from './models/CourseStudent';

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

const done = () => {
  connection.close()
  console.log('Done')
}

connection.sync({ force: true }).then(() => {
  Promise.all([
    createAdmin('root', 'Dcubed!!'),
    createAdmin('s', 'p'),
    createAdmin('j', 'p'),
    createStudent('student1', 'password'),
    createStudent('student2', 'password'),
    createStudent('student3', 'password'),
    Course.create({ name: 'Turf Maintenance' }),
    Course.create({ name: 'Pool Maintenance' }),
    Unit.create({ name: 'Ploughing the field', courseId: 1, }),
    Card.create({ name: 'Mowing a lawn', unitId: 1 }),
  ]).then(() => {

    Promise.all([
      CourseStudent.create({ courseId: 1, studentId: 1, }),
      CourseStudent.create({ courseId: 1, studentId: 2, }),
      CourseStudent.create({ courseId: 1, studentId: 3, }),
      CourseStudent.create({ courseId: 2, studentId: 3, }),
      CourseStudent.create({ courseId: 2, studentId: 2, }),
    ])
      .then(done) // main
  })
})

const main = () => {
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
