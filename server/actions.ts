import * as bcrypt from 'bcrypt'
import Admin from './models/Admin'
import Student from './models/Student'
import Mentor from './models/Mentor'
import { Business, BusinessStudent, Activity, Unit, Card, CourseStudent } from './models'
import { Logger } from './logger'
import { UnitProgress } from './interfaces'

const saltRounds = 10

export const createAdmin = (data) => {
  const { email, name } = data
  const salt = bcrypt.genSaltSync(saltRounds)
  const password = bcrypt.hashSync(data.password, salt)
  return Admin.create({
    name,
    email,
    password,
    salt,
  })
}

export const createStudent = (data) => {
  const { email, first_name, last_name } = data
  const salt = bcrypt.genSaltSync(saltRounds)
  const password = bcrypt.hashSync(data.password, salt)
  return Student.create({
    first_name,
    last_name,
    email,
    password,
    salt,
  })
}

export const createMentor = (data) => {
  const { email, first_name, last_name } = data
  const salt = bcrypt.genSaltSync(saltRounds)
  const password = bcrypt.hashSync(data.password, salt)
  return Mentor.create({
    first_name,
    last_name,
    email,
    password,
    salt,
  })
}

export const addStudentToBusiness = (student: Student, businessId: number) => {
  Logger.debug('Add student to business', student.email, businessId)
  return BusinessStudent.create({
    businessId,
    studentId: student.id,
  }).then(businessStudent => {
    Logger.debug('Student added to business', student.email, businessId)
    return businessStudent
  }).catch(err => {
    Logger.debug('Could not add student to business', student.email, businessId)
    return null
  })
}

export const inviteStudent = async (email: string, businessId: number) => {
  Logger.debug('Invite Student', email, 'to business', businessId)
  return Student.findOne({ where: { email }, include: [Business] }).then(student => {
    if (!student) {
      Logger.debug('Create new student and link to business', email)
      const password = 'password'
      return createStudent({ email, password }).then(student => {
        return addStudentToBusiness(student, businessId)
      })
    } else {
      Logger.debug('Student exists', email)
      const ids = student.businesses.map(business => business.id)
      if (ids.indexOf(businessId) >= 0) {
        Logger.debug(student.email, 'already added to business', businessId)
      } else {
        return addStudentToBusiness(student, businessId)
      }
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
    courseStudent.save()
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
