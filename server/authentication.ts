import * as bcrypt from 'bcrypt'
import * as passport from 'passport'
import { Model } from 'sequelize-typescript'
const LocalStrategy = require('passport-local').Strategy

import Admin from './models/Admin'
import Student from './models/Student'
import Mentor from './models/Mentor'
import Course from './models/Course';

passport.use('admin-local', new LocalStrategy((username, password, done) => {
  return Admin.findOne({ where: { username } }).then(admin => {
    if (!admin) {
      return done(null, false)
    }
    const hash = bcrypt.hashSync(password, admin.salt)
    if (admin.password !== hash) {
      return done(null, false)
    }
    return done(null, admin.toJSON())
  })
}))

passport.use('student-local', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  return Student.findOne({ where: { email } }).then(student => {
    if (!student) {
      return done(null, false)
    }
    const hash = bcrypt.hashSync(password, student.salt)
    if (student.password !== hash) {
      return done(null, false)
    }
    student.lastLoggedIn = new Date()
    student.save()
    return done(null, student.toJSON())
  })
}))

passport.use('mentor-local', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  return Mentor.findOne({ where: { email } }).then(mentor => {
    if (!mentor) {
      return done(null, false)
    }
    const hash = bcrypt.hashSync(password, mentor.salt)
    if (mentor.password !== hash) {
      return done(null, false)
    }
    return done(null, mentor.toJSON())
  })
}))

passport.serializeUser((entity, done) => {
  const type = entity.userType
  return done(null, {
    id: entity.id,
    type,
  })
})

passport.deserializeUser((key, done) => {
  const { id, type } = key
  if (type === 'admin') {
    Admin.findById(id).then(admin => {
      done(null, { admin })
    })
  } else if (type === 'mentor') {
    Mentor.findById(id).then(mentor => {
      done(null, { mentor })
    })
  } else {
    Student.findById(id).then(student => {
      done(null, { student })
    })
  }
})

export const authAdmin = passport.authenticate('admin-local', {
  failureRedirect: '/admin/login'
})

export const authStudent = passport.authenticate('student-local', {
  failureRedirect: '/student/login'
})

export const authMentor = passport.authenticate('mentor-local', {
  failureRedirect: '/mentor/login'
})

export const checkAdminLogin = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.admin) {
    return res.redirect('/admin/login')
  }
  next()
}

export const checkStudentLogin = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.student) {
    return res.redirect('/student/login')
  }
  next()
}

export const checkMentorLogin = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.mentor) {
    return res.redirect('/mentor/login')
  }
  next()
}

export const checkStudentEnrolled = (req, res, next) => {
  const { courseId } = req.params
  if (!req.user) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
  Student.findById(req.user.student.id, {include: [Course]}).then(student => {
    const ids = student.courses.map(course => course.id)
    if (ids.indexOf(parseInt(courseId)) === -1) {
        return res.status(401).send({ message: 'Unauthorized' })
    }
    next()
  })
}

export const authEpilogue = (req, res, context) => {
  return new Promise((resolve, reject) => {
    if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.admin) {
      res.status(401).send({ message: 'Unauthorized' })
      resolve(context.stop)
    } else {
      resolve(context.continue)
    }
  })
}
