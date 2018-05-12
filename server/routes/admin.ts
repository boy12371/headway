import * as passwordGenerator from 'generate-password'

import app from '../app'
import mailer from '../mailer'

import { authEpilogue, authAdmin, checkStudentLogin, authStudent, checkMentorLogin, authMentor, checkStudentEnrolled, checkAdminPermission, checkAdminLogin, } from '../authentication'
import { createAdmin, createCourse, inviteStudent, studentSummary, courseSummary, businessSummary } from '../actions'
import { PASSWORD_OPTS } from '../constants'
import mail from '../mail'

import { Admin, Course, Business, BusinessCourse, Student, Unit, Card } from '../models'
import { Logger } from '../logger'

app.use('/admin/*', checkAdminLogin)
// app.use('/admin/*', checkAdminPermission) // does not work thanks to bad req.params values

app.get('/admin/courses', (req, res) => {
  Course.findAll().then(courses => res.send(courses))
})

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

app.post('/admin/students/invite', (req, res) => {
  const { email, businessIds } = req.body
  // TODO: check Admin owns Business
  inviteStudent(email, businessIds).then(businessStudent => {
    res.send(businessStudent)
  })
})

app.get('/admin/courses', (req, res) => {
  Admin.findById(req.user.admin.id, { include: [Course] }).then(admin => {
    res.send(admin.courses)
  })
})

app.post('/admin/courses/create', (req, res) => {
  const { name, businessIds } = req.body
  const adminId = 1 // req.user.admin.id
  // TODO: check Admin owns Businesses
  createCourse(adminId, name, businessIds).then(course => {
    res.send(course)
  })
})

app.get('/admin/course/:courseId', checkAdminPermission, (req, res) => {
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

app.get('/admin/unit/:unitId', (req, res) => {
  Unit.findById(req.params.unitId, { include: [Card, Course] }).then(unit => {
    res.send(unit)
  })
})

app.get('/admin/student/:studentId', checkAdminPermission, (req, res) => {
  Student.findById(req.params.studentId, { include: [Course, Business] }).then(student => {
    res.send(student)
  })
})

app.get('/admin/business', (req, res) => {
  Business.findAll({
    include: [
      Student.scope('public'),
    ]
  }).then(business => {
    res.send(business)
  })
})

app.get('/admin/business/:businessId', checkAdminPermission, (req, res) => {
  Business.findById(req.params.businessId, {
    include: [
      Student.scope('public'),
      Course,
    ]
  }).then(business => {
    res.send(business)
  })
})
