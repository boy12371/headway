import * as bcrypt from 'bcrypt'
import Admin from './models/Admin'
import Student from './models/Student'
import Mentor from './models/Mentor'
import { Business, BusinessStudent } from './models'
import { Logger } from './logger';

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
  }).then(d => {
    Logger.debug('Student added to business', student.email, businessId)
    return d
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
