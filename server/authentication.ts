import * as bcrypt from 'bcrypt'
import * as passport from 'passport'
const LocalStrategy = require('passport-local').Strategy

import Admin from './models/Admin'
import Student from './models/Student'

// WARNING: HACK: Only works if admins don't have email
const isAdmin = d => !d.email

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
      console.log('bad password')
      return done(null, false)
    }
    student.lastLoggedIn = new Date()
    student.save()
    console.log('authed as student:', student.name, 'at', student.lastLoggedIn)
    return done(null, student.toJSON())
  })
}))

passport.serializeUser((entity, done) => {
  const type = isAdmin(entity) ? 'admin' : 'student'
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
  } else {
    Student.findById(id).then(student => {
      done(null, { student })
      // const { studentId } = student
      // student.findOne({ where: { studentId } }).then(student => {
      //     console.log('Authed student found student:', student.name)
      //     done(null, { student, student })
      // })
    })
  }
})

export const authAdmin = passport.authenticate('admin-local', {
  failureRedirect: '/admin/login'
})

export const authStudent = passport.authenticate('student-local', {
  failureRedirect: '/student/login'
})

export const checkAdminLogin = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.admin) {
    return res.redirect('/admin/login')
  }
  next()
}

export const checkstudentLogin = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.student) {
    return res.redirect('/student/login')
  }
  next()
}

export const checkstudentEnrolled = (req, res, next) => {
  const { courseId } = req.params
  Student.findById(req.user.student.id).then(student => {
    student.getCourses().then(courses => {
      const courseIds = courses.map(course => parseInt(course.id))
      if (courseIds.indexOf(parseInt(courseId)) === -1) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      next()
    })
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
