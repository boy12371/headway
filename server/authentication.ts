import { defaults } from 'lodash'
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt

import * as bcrypt from 'bcrypt'
import * as passport from 'passport'
const LocalStrategy = require('passport-local').Strategy

import Admin from './models/Admin'
import Student from './models/Student'
import Mentor from './models/Mentor'
import Course from './models/Course'
import { Business, Card } from './models'
import { JWT_ISSUER } from './constants'

passport.use('admin-local', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  return Admin.findOne({ where: { email } }).then(admin => {
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

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer: JWT_ISSUER,
  audience: 'invite',
}, (jwt_payload, done) => {
  const { sub, userType } = jwt_payload
  if (userType === 'admin') {
    Admin.findById(sub).then(admin => {
      if (admin) {
        return done(null, admin)
      } else {
        return done(null, false)
      }
    })
  } else {
    Student.findById(sub).then(student => {
      if (student) {
        return done(null, student)
      } else {
        return done(null, false)
      }
    })
  }
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
  // successReturnToOrRedirect: true,
  failureRedirect: '/l/admin'
})

export const authStudent = passport.authenticate('student-local', {
  failureRedirect: '/l/student'
})

export const authStudentInvite = passport.authenticate('jwt', {
  failureRedirect: '/l/student'
})

export const authAdminInvite = passport.authenticate('jwt', {
  failureRedirect: '/l/admin'
})

export const authMentor = passport.authenticate('mentor-local', {
  failureRedirect: '/l/mentor'
})

export const checkAdminLogin = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.admin) {
    return res.redirect('/l/admin')
  }
  next()
}

export const mockAdminLogin = (req, res, next) => {
  req.isAuthenticated = () => true // =\
  req.user = {
    admin: {
      id: 1
    }
  }
  next()
}

export const mockStudentLogin = (req, res, next) => {
  req.isAuthenticated = () => true // =\
  req.user = {
    student: {
      id: 1
    }
  }
  next()
}

export const checkStudentLogin = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.student) {
    return res.redirect('/l/student')
  }
  next()
}

export const checkMentorLogin = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.mentor) {
    return res.redirect('/l/mentor')
  }
  next()
}

export const checkStudentEnrolled = (req, res, next) => {
  const { courseId } = req.params
  if (!req.user) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
  Student.findById(req.user.student.id, { include: [Course] }).then(student => {
    const ids = student.courses.map(course => course.id)
    if (ids.indexOf(parseInt(courseId)) === -1) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    next()
  })
}

export const checkAdminPermission = (req, res, next) => {
  const { courseId, businessId, studentId, cardId } = defaults(req.body, req.params)
  if (!req.user) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
  Admin.findById(req.user.admin.id, {
    include: [
      Course,
      {
        model: Business,
        include: [Student]
      },
    ]
  }).then(admin => {
    if (cardId) {
      Card.scope('includeCourse').findById(cardId).then(card => {
        if (card && card.unit.course.adminId === admin.id) {
          next()
        } else {
          return res.status(401).send({ message: 'Unauthorized: Admin does not own Card' })
        }
      })
      return
    }
    if (courseId) {
      const courseIds = admin.courses.map(course => course.id)
      if (courseIds.indexOf(parseInt(courseId)) === -1) {
        return res.status(401).send({ message: 'Unauthorized: Admin does not own Course' })
      }
    }
    if (businessId) {
      const businessIds = admin.businesses.map(business => business.id)
      if (businessIds.indexOf(parseInt(businessId)) === -1) {
        return res.status(401).send({ message: 'Unauthorized: Admin does not own Business' })
      }
    }
    if (studentId) {
      const studentIds = admin.businesses.reduce((previousValue, currentValue) => {
        const ids = currentValue.students.map(student => student.id)
        return previousValue.concat(ids)
      }, [])
      if (studentIds.indexOf(parseInt(studentId)) === -1) {
        return res.status(401).send({ message: 'Unauthorized: Admin does not own Student' })
      } else {
        next()
      }
    } else {
      next()
    }
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
