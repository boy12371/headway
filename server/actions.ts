import * as passwordGenerator from 'generate-password'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import Admin from './models/Admin'
import Student from './models/Student'
import Mentor from './models/Mentor'
import { Business, BusinessCourse, BusinessStudent, Activity, Unit, Card, CourseStudent, Course } from './models'
import { Logger } from './logger'
import { UnitProgress } from './interfaces'
import { PASSWORD_OPTS, SALT_ROUNDS, JWT_ISSUER } from './constants'
import mailer from './mailer'
import mail from './mail'

export const createAdmin = (data) => {
  const { email, name } = data
  const salt = bcrypt.genSaltSync(SALT_ROUNDS)
  const password = bcrypt.hashSync(data.password, salt)
  return Admin.create({
    name,
    email,
    password,
    salt,
  })
}

export const createCourse = (adminId, name, businessIds = []) => {
  return Course.create({
    name,
    adminId,
  }).then(course => {
    if (businessIds.length) {
      const promises = businessIds.map(businessId => {
        return linkBusinessToCourse(businessId, course.id)
      })
      return Promise.all(promises).then(d => {
        return course
      })
    }
    return course
  })
}

export const createStudent = (data) => {
  const { email, first_name, last_name } = data
  const salt = bcrypt.genSaltSync(SALT_ROUNDS)
  const password = bcrypt.hashSync(data.password, salt)
  return Student.create({
    first_name,
    last_name,
    email,
    password,
    salt,
  })
}

export const linkBusinessToCourse = (businessId, courseId) => {
  return BusinessCourse.findOrCreate({
    where: {
      businessId,
      courseId,
      // autoInviteStudents: true,
    }
  }).then(businessCourse => {
    return Business.findById(businessId, { include: [Student] }).then(business => {
      return business.students.map(student => {
        return student.addToCourse(courseId)
      })
    })
  })
}

export const createMentor = (data) => {
  const { email, first_name, last_name } = data
  const salt = bcrypt.genSaltSync(SALT_ROUNDS)
  const password = bcrypt.hashSync(data.password, salt)
  return Mentor.create({
    first_name,
    last_name,
    email,
    password,
    salt,
  })
}

export const addStudentToBusinesses = (student: Student, businessIds: number[]) => {
  const promises = businessIds.map(id => addStudentToBusiness(student, id))
  return Promise.all(promises)
}

export const addStudentToBusiness = (student: Student, businessId: number) => {
  return BusinessStudent.findOrCreate({
    where: {
      businessId,
      studentId: student.id,
    }
  }).then(businessStudents => {
    Business.findById(businessId, {
      include: [
        { model: Course }
      ]
    }).then(business => {
      // TODO: where BusinessCourse.autoInviteStudents true
      business.courses.forEach(course => {
        student.addToCourse(course.id)
      })
    })
    return businessStudents
  })
}

export const inviteStudent = async (payload, businessIds: number[]) => {
  const { email } = payload
  return Student.findOne({ where: { email }, include: [Business] }).then(student => {
    if (!student) {
      const password: string = passwordGenerator.generate(PASSWORD_OPTS)
      return createStudent({ email, password }).then(student => {
        const token = jwt.sign({
          sub: student.id,
          email: student.email,
          iss: JWT_ISSUER,
          userType: 'student',
          aud: 'invite',
        }, process.env.JWT_SECRET)
        mailer.messages().send({
          to: student.email,
          from: mail.FROM,
          subject: mail.invite.subject,
          text: mail.invite.text({token}),
          html: mail.invite.html({token}),
        }, (error, body) => {
          if (error) {
            console.warn(error)
          }
        })
        return addStudentToBusinesses(student, businessIds)
      })
    } else {
      return addStudentToBusinesses(student, businessIds)
    }
  })
}

export const getStudentActivitiesByUnit = async (unitId, studentId) => {
  return Promise.all([
    Activity.findAll({ where: { studentId } }),
    Unit.findById(unitId, { include: [Card] }).then(unit => unit.cards)
  ]).then(([activities, cards]) => {
    const cardIds = cards.map(card => card.id)
    // .sort((a, b) => a.createdAt - b.createdAt).pop()
    return activities.filter(activity => cardIds.indexOf(activity.cardId) >= 0)
  })
}

export const incrementCompletedUnits = async (courseId, studentId) => {
  return CourseStudent.find({
    where: {
      studentId,
      courseId,
    }
  }).then(courseStudent => {
    courseStudent.completedUnits = courseStudent.completedUnits + 1
    return courseStudent.save()
  })
}

export const studentUnitProgress = async (unitId, studentId): Promise<UnitProgress> => {
  Logger.debug('studentCourseProgress', unitId, studentId)
  return Promise.all([
    getStudentActivitiesByUnit(unitId, studentId),
    Unit.findById(unitId, { include: [Card] }),
  ])
    .then(([activities, unit]) => {
      const cards = unit.cards
      const completed = activities.filter(activity => activity.completed)
      // look at dates
      // activities.forEach(activity => {
      //   Logger.debug(activity.createdAt)
      // })
      const res: UnitProgress = {
        numberOfCards: cards.length,
        completedLength: completed.length,
        unitCompleted: completed.length === cards.length,
      }
      Logger.debug(res)
      return res
    })
}
