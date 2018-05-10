import * as passwordGenerator from 'generate-password'

import app from '../app'
import mailer from '../mailer'

import { authEpilogue, authAdmin, checkAdminLogin, checkStudentLogin, authStudent, checkMentorLogin, authMentor, checkStudentEnrolled, checkAdminPermission, } from '../authentication'
import { createAdmin, createCourse, inviteStudent, studentSummary, courseSummary, businessSummary } from '../actions'
import { PASSWORD_OPTS } from '../constants'
import mail from '../mail'

import { Admin, Course, Business, BusinessCourse, Student, Unit, Card } from '../models'
import { Logger } from '../logger'

// app.use('/admin/*', checkAdminLogin)

app.get('/admin', checkAdminLogin, (req, res) => {
  res.send(req.user)
})

app.get('/admin/login', (req, res) => {
  res.render('login')
})

app.post('/admin/login', authAdmin, (req, res) => {
  res.send(req.user)
})

app.get('/admin/register', (req, res) => {
  res.render('register')
})

app.post('/admin/register', (req, res) => {
  const password: string = passwordGenerator.generate(PASSWORD_OPTS)
  const data = {
    name: req.body.name,
    email: req.body.email,
    password,
  }
  createAdmin(data).then(admin => {
    mailer.messages().send({
      to: admin.email,
      from: mail.FROM,
      subject: mail.welcome.subject(admin.name),
      text: mail.welcome.text(data),
      html: mail.welcome.html(data),
    }, (error, body) => {
      if (error) {
        console.warn(error)
      }
    })
    res.send(admin)
  })
})

// TODO: checkAdminLogin
app.get('/admin/overview', (req, res) => {
  // TODO: provide req.user.admin.id
  Promise.all([
    courseSummary(),
    studentSummary(),
    businessSummary(),
  ]).then(([courses, students, businesses]) => {
    res.send({
      courses,
      students,
      businesses,
      user: req.user ? req.user.admin : null
    })
  })
})

// app.post('/admin/students/invite', checkAdminLogin, (req, res) => {
app.post('/admin/students/invite', (req, res) => {
  const { email, businessIds } = req.body
  // TODO: check Admin owns Business
  inviteStudent(email, businessIds).then(businessStudent => {
    res.send(businessStudent)
  })
})

app.get('/admin/courses', checkAdminLogin, (req, res) => {
  Admin.findById(req.user.admin.id, { include: [Course] }).then(admin => {
    res.send(admin.courses)
  })
})

// app.post('/admin/students/invite', checkAdminLogin, (req, res) => {
app.post('/admin/courses/create', (req, res) => {
  const { name, businessIds } = req.body
  // TODO: check Admin owns Business
  createCourse(name, businessIds).then(course => {
    res.send(course)
  })
})

// app.get('/admin/course/:courseId', checkAdminLogin, checkAdminPermission, (req, res) => {
app.get('/admin/course/:courseId', (req, res) => {
  Course.findById(req.params.courseId, { include: [Student, Unit, Business] }).then(course => {
    res.send(course)
  })
})

app.post('/admin/units/create', (req, res) => {
  const { name, courseId } = req.body
  // TODO: check Admin owns Course
  Unit.create({name, courseId}).then(unit => {
    res.send(unit)
  })
})

// app.get('/admin/unit/:unitId', checkAdminLogin, checkAdminPermission, (req, res) => {
app.get('/admin/unit/:unitId', (req, res) => {
  Unit.findById(req.params.unitId, { include: [Card, Course] }).then(unit => {
    res.send(unit)
  })
})

// app.get('/admin/course/:courseId', checkAdminLogin, checkAdminPermission, (req, res) => {
app.get('/admin/student/:studentId', (req, res) => {
  Student.findById(req.params.studentId, { include: [Course, Business] }).then(student => {
    res.send(student)
  })
})

// app.get('/admin/course/:courseId', checkAdminLogin, checkAdminPermission, (req, res) => {
app.get('/admin/business/:businessId', (req, res) => {
  Business.findById(req.params.businessId, { include: [Student, Course] }).then(business => {
    res.send(business)
  })
})
