import {authAdmin} from './authentication';
import Student from './models/Student';
import Card from './models/Card';
import Unit from './models/Unit';
import Course from './models/Course';

const DIVIDER = '------------------------'

const printHeading = text => {
  console.log(`\n\n${text}\n${DIVIDER}\n`)
}

const studentActivity = () => {
  return Student.findAll({ include: [Card] }).then(students => {
    printHeading('Student Activity')
    students.forEach(student => {
      student.cardActivities.forEach(card => {
        const json = card.toJSON()
        console.log(`- Card "${card.name}" evidence_task: "${card.evidence_task}"`)
        console.log(`- Student ${student.email} provided evidence: "${json.Activity.evidence_proof}"`)
      })
    })
  })
}

const studentEnrolment = () => {
  return Student.findAll({ include: [Course] }).then(students => {
    printHeading('Student Enrolment')
    students.forEach(student => {
      student.courses.forEach(course => {
        console.log('- Student', student.email, 'is enrolled in', course.name)
      })
    })
  })
}

const courseSummary = () => {
  return Course.findAll({ include: [Unit, Student] }).then((courses) => {
    printHeading('Course Summary')
    courses.forEach(course => {
      console.log(course.name, '\n\nUnits:')
      course.units.forEach(unit => {
        console.log('-', unit.name)
      })
      console.log('\nStudents:')
      course.students.forEach(student => {
        console.log('-', student.email)
      })
      console.log('')
    })
  })
}

const unitSummary = () => {
  Unit.findAll({ include: [Course, Card] }).then(units => {
    printHeading('Unit Summary')
    units.forEach(unit => {
      console.log('- Unit', unit.name, 'belongs to', unit.course.name)

      unit.cards.forEach(card => {
        console.log('- Unit', unit.name, 'contains card', card.name)
      })
    })
  })
}

const businessSummary = () => {
  return Business.findAll({include: [Mentor]}).then(businesses => {
    printHeading('Business Summary')
    businesses.forEach(business => {
      console.log(business.name, 'Mentors:\n')
      business.mentors.forEach(mentor => {
        console.log('-', mentor.first_name)
      })
    })
  })
}

const report = () => {
  return Promise.all([
    businessSummary(),
    studentActivity(),
    studentEnrolment(),
    courseSummary(),
    unitSummary(),
  ])
}

export default report

import connection from './connection'
import Business from './models/Business';
import Mentor from './models/Mentor';
if (process.argv.pop() === '-run') {
  connection.sync().then(() => {
    report().then(() => connection.close())
  })
}
