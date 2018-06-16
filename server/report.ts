import connection from './connection'

import { Business, Card, Course, Mentor, Student, Unit, Admin, Activity } from './models'
import { getStudentActivitiesByUnit, studentUnitProgress, studentSummary } from './actions'
import { Logger } from './logger'

const DIVIDER = '------------------------'

const printHeading = text => {
  console.log(`\n\n${text}\n${DIVIDER}\n`)
}

const studentUnitProgressReport = (unitId, studentId) => {
  printHeading('Student Unit Progress')
  return studentUnitProgress(unitId, studentId)
}

const studentEnrolment = () => {
  return Student.findAll({ include: [Course, Business] }).then(students => {
    printHeading('Student Enrolment')
    students.forEach(student => {
      student.businesses.forEach(business => {
        console.log('- Student', student.displayName(), 'is employed by', business.name)
      })
      student.courses.forEach(course => {
        console.log('- Student', student.displayName(), 'is enrolled in', course.name)
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
        console.log('-', student.displayName())
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
  return Business.findAll({ include: [Mentor, Student, Admin, Course] }).then(businesses => {
    printHeading('Business Summary')
    businesses.forEach(business => {
      console.log('Business', business.name, 'belongs to admin:', (business.admin.name || business.admin.name))

      if (business.mentors.length) {
        console.log('Mentors:')
        business.mentors.forEach(mentor => {
          console.log('-', mentor.first_name)
        })
      }
      if (business.students.length) {
        console.log('Students:')
        business.students.forEach(student => {
          console.log('-', student.displayName())
        })
      }
      if (business.courses.length) {
        console.log('Courses:')
        business.courses.forEach(course => {
          console.log('-', course.name)
        })
      }
    })
  })
}

const fullAdminReport = async (id) => {
  return Admin.findById(id, {
    include: [
      {
        model: Course,
        include: [
          {
            model: Unit,
            include: [
              {
                model: Card
              }
            ]
          },
          {
            model: Student
          }
        ]
      },
      {
        model: Business,
        include: [
          {
            model: Student,
            include: [{
              model: Course
            }]
          }
        ]
      }
    ]
  }).then(admin => {
    Logger.debug('Admin: ', admin.name)
    admin.businesses.forEach(business => {
      Logger.debug('-', business.name, 'Students')
      business.students.forEach(student => {
        Logger.debug('-- Business: ', student.displayName())
        // student.courses.forEach(course => {})
      })
    })

    admin.courses.forEach(course => {
      Logger.debug('-', course.name, 'Units')
      course.units.forEach(unit => {
        Logger.debug('--', unit.name, 'Unit Cards')
        unit.cards.forEach(card => {
          Logger.debug('---', card.name)
          // card.activityStudents.forEach(activity => {})
        })
      })
      Logger.debug('--', course.name, 'Students')
      course.students.forEach(student => {
        Logger.debug('--', student.displayName())
      })
    })
  })
}

// const students = async id => {
//   return Student.scope('byAdmin', { method: ['byAdmin', id] }).findAll().then(students => {
//     Logger.debug('Admin', id)
//     Logger.debug(students.map(d => d.email))
//   })
// }

const report = async () => {
  // await students('1')
  // await students('2')
  await fullAdminReport(1)
  await studentEnrolment()
  await courseSummary()
  await unitSummary()
  await businessSummary()
  await getStudentActivitiesByUnit(1, 1)
  await studentUnitProgressReport(1, 1)
}

export default report

if (process.argv.pop() === '-run') {
  connection.sync().then(() => {
    report() // .then(() => connection.close())
  })
}
