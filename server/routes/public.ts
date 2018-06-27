import * as passwordGenerator from 'generate-password'

import app from '../app'
import resetDatabase from '../reset-database'
import { createAdmin } from '../actions'
import { PASSWORD_OPTS } from '../constants'
import { authAdmin, authStudent } from '../authentication'
import mailer from '../mailer'
import mail from '../mail'

import { Business, Card, Course, Mentor, Student, Unit, Admin, BusinessStudent, BusinessCourse, CourseStudent, Activity } from '../models'

const SERVER_STARTUP = new Date()

app.get('/status', (req, res) => {
  res.send(`<pre>Server started ${SERVER_STARTUP.toLocaleString()}`)
})

app.get('/user', (req, res) => {
  res.send(req.user)
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.post('/login/admin', authAdmin, (req, res) => {
  res.send(req.user)
})

app.post('/register', (req, res) => {
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
    Business.create({
      adminId: admin.id,
      name: admin.name,
    }).then(business => {
      res.send(admin)
    })
  })
})

app.post('/login/student', authStudent, (req, res) => {
  res.send(req.user)
})
