import * as bcrypt from 'bcrypt'
import Admin from './models/Admin'
import Student from './models/Student'
import Mentor from './models/Mentor'

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
