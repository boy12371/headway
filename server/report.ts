import connection from './connection'

import { Business, Card, Course, Mentor, Student, Unit, Admin, Activity } from './models'

const DIVIDER = '------------------------'

const printHeading = text => {
  console.log(`\n\n${text}\n${DIVIDER}\n`)
}

const getFirstActivity = (unitId, studentId) => {
  Promise.all([
    Activity.findAll({ where: { studentId } }),
    Unit.findById(unitId, { include: [Card] }).then(unit => unit.cards)
  ]).then(([activities, cards]) => {
    const cardIds = cards.map(card => card.id)
    activities = activities.filter(activity => cardIds.indexOf(activity.cardId) >= 0)
    const firstActivity = activities.sort((a, b) => a.createdAt - b.createdAt).pop()
    return firstActivity
  })
}

const studentActivity = () => {
  return Student.findAll({ include: [Card] }).then(students => {
    printHeading('Student Activity')
    students.forEach(student => {
      student.cardActivities.forEach(card => {
        const json = card.toJSON()
        console.log(`- Card "${card.name}" evidence_task: "${card.evidence_task}"`)
        console.log(`- Student ${student.displayName()} provided evidence: "${json.Activity.evidence_proof}"`)
      })
    })
  })
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

const report = async () => {
  await getFirstActivity(1, 1)
  await studentActivity()
  await studentEnrolment()
  await courseSummary()
  await unitSummary()
  await businessSummary()
}

export default report

if (process.argv.pop() === '-run') {
  connection.sync().then(() => {
    report() // .then(() => connection.close())
  })
}
