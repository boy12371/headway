import * as passwordGenerator from 'generate-password'

import app from '../app'
import mailer from '../mailer'

import { authEpilogue, authAdmin, checkAdminLogin, checkStudentLogin, authStudent, checkMentorLogin, authMentor, checkStudentEnrolled, checkAdminPermission, } from '../authentication'
import { createAdmin, inviteStudent } from '../actions'
import { PASSWORD_OPTS } from '../constants'
import mail from '../mail'

import { Admin, Course, Business, Student, Unit, Card } from '../models'

app.get('/admin', checkAdminLogin, (req, res) => {
  res.send('Authed as admin')
})

app.get('/admin/login', (req, res) => {
  res.render('login')
})

app.post('/admin/login', authAdmin, (req, res) => {
  res.redirect('/admin')
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
  createAdmin​(data).then(admin => {
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

app.post('/admin/students/invite', checkAdminLogin, (req, res) => {
  const { email, businessId } = req.body
  // TODO: check Admin owns Business
  inviteStudent(email, businessId).then(businessStudent => {
    res.send('Invite Sent')
  })
})

app.get('/admin/courses', checkAdminLogin, (req, res) => {
  Admin.findById(req.user.admin.id, { include: [Course] }).then(admin => {
    res.send(admin.courses)
  })
})

// app.get('/admin/course/:courseId', checkAdminLogin, checkAdminPermission, (req, res) => {
app.get('/admin/course/:courseId', (req, res) => {
  Course.findById(req.params.courseId, { include: [Student, Unit] }).then(course => {
    res.send(course)
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
