import passwordGenerator from 'generate-password'

import app from '../app'
import mailer from '../mailer'

import { authEpilogue, authAdmin, checkAdminLogin, checkStudentLogin, authStudent, checkMentorLogin, authMentor, checkStudentEnrolled, checkAdminPermission, } from '../authentication'
import { createAdmin } from '../actions'

// Models
import Admin from '../models/Admin'
import Course from '../models/Course'

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

app.post('/admin/register', (req, res) => {
  const password: string = passwordGenerator.generate(PASSWORD_OPTS)
  createAdmin​({
    name: req.body.name,
    email: req.body.email,
    password,
  }).then(admin => {
    console.log('Registered', admin.toJSON())
    console.log('TODO: send mail')
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
