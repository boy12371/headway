import app from '../app'

import {checkStudentLogin, authStudent, checkStudentEnrolled } from '../authentication'

import {Course, Student} from '../models'

app.get('/student', checkStudentLogin, (req, res) => {
  res.send('Authed as student')
})

app.get('/student/login', (req, res) => {
  res.render('login')
})

app.post('/student/login', authStudent, (req, res) => {
  res.redirect('/student')
})

app.get('/student/courses', checkStudentLogin, (req, res) => {
  Student.findById(req.user.student.id, { include: [Course] }).then(student => {
    res.send(student.courses)
  })
})

app.get('/student/course/:courseId', checkStudentEnrolled, (req, res) => {
  Course.findById(req.params.courseId).then(course => {
    res.send(`Student ${req.user.student.displayName()} enrolled in course ${course.name}`)
  })
})
