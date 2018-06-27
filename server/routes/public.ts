import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as passwordGenerator from 'generate-password'

import app from '../app'
import resetDatabase from '../reset-database'
import { createAdmin } from '../actions'
import { PASSWORD_OPTS, SALT_ROUNDS, JWT_ISSUER } from '../constants'
import { authAdmin, authStudent, authAdminInvite } from '../authentication'
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
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password,
  }
  createAdmin(data).then(admin => {
    const token = jwt.sign({
      sub: admin.id,
      name: admin.name,
      firstName: req.body.first_name,
      email: admin.email,
      iss: JWT_ISSUER,
      userType: 'admin',
      aud: 'invite',
    }, process.env.JWT_SECRET)

    const mailData = {
      token,
      name: data.name,
      first_name: req.body.first_name,
    }
    mailer.messages().send({
      to: admin.email,
      from: mail.FROM,
      subject: mail.welcome.subject(admin.name),
      text: mail.welcome.text(mailData),
      html: mail.welcome.html(mailData),
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

app.put('/update-admin-details', authAdminInvite, (req, res) => {
  const { id } = req.user
  // console.log('/update-admin-details', req.user)
  Admin.findById(id).then(admin => {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
    admin.salt = salt
    admin.password = bcrypt.hashSync(req.body.password, salt)
    admin.save()
    res.send(admin)
  })
})

app.post('/login/student', authStudent, (req, res) => {
  res.send(req.user)
})
