import * as passwordGenerator from 'generate-password'

import app from '../app'
import mailer from '../mailer'

import { authEpilogue, authAdmin, checkAdminLogin, checkStudentLogin, authStudent, checkMentorLogin, authMentor, checkStudentEnrolled, checkAdminPermission, } from '../authentication'
import { createAdmin } from '../actions'

// Models
import Admin from '../models/Admin'
import Course from '../models/Course'
import mail from '../mail';

const PASSWORD_OPTS = {
  uppercase: false,
  numbers: true,
  excludeSimilarCharacters: true,
}

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
      console.log(body)
    })
    res.send(admin)
  })
})

app.get('/admin/courses', checkAdminLogin, (req, res) => {
  Admin.findById(req.user.admin.id, { include: [Course] }).then(admin => {
    res.send(admin.courses)
  })
})

app.get('/admin/course/:courseId', checkAdminLogin, checkAdminPermission, (req, res) => {
  Course.findById(req.params.courseId).then(course => {
    res.send(`Admin ${req.user.admin.name} owns ${course.name}`)
  })
})
