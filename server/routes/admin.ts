import * as passwordGenerator from 'generate-password'

import app from '../app'
import mailer from '../mailer'

import { authEpilogue, authAdmin, checkStudentLogin, authStudent, checkMentorLogin, authMentor, checkStudentEnrolled, checkAdminPermission, checkAdminLogin, mockAdminLogin, } from '../authentication'
import { createAdmin, createCourse, inviteStudent, studentSummary, courseSummary, businessSummary } from '../actions'
import { PASSWORD_OPTS } from '../constants'
import mail from '../mail'

import { Admin, Course, Business, BusinessCourse, Student, Unit, Card } from '../models'
import { Logger } from '../logger'

// app.use('/admin*', checkAdminLogin)
app.use('/admin*', mockAdminLogin)

// Overview

app.get('/admin', (req, res) => {
  const adminId = req.user.admin.id
  Admin.findById(adminId, {
    include: [
      Business,
      {
        model: Course,
        include: [
          Student.scope('public'),
          Unit,
        ],
      },
    ]
  }).then(admin => {
    res.send(admin)
  })
})

app.get('/admin/overview', (req, res) => {
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


// Courses

app.get('/admin/course', (req, res) => {
  Admin.findById(req.user.admin.id, { include: [Course, Unit] }).then(admin => {
    res.send(admin.courses)
  })
})

app.post('/admin/course', (req, res) => {
  const { name, businessIds } = req.body
  // TODO: check Admin owns Businesses
  createCourse(req.user.admin.id, name, businessIds).then(course => {
    res.send(course)
  })
})

app.get('/admin/course/:courseId', checkAdminPermission, (req, res) => {
  Course.findById(req.params.courseId, { include: [Student, Unit, Business] }).then(course => {
    res.send(course)
  })
})


// Units

app.post('/admin/unit', checkAdminLogin, (req, res) => {
  const { name, courseId } = req.body
  Unit.create({name, courseId}).then(unit => {
    res.send(unit)
  })
})

app.get('/admin/unit/:unitId', (req, res) => {
  // TODO: check Admin owns Unit
  Unit.findById(req.params.unitId, { include: [Card, Course] }).then(unit => {
    res.send(unit)
  })
})


// Students

app.get('/admin/student/:studentId', checkAdminPermission, (req, res) => {
  Student.findById(req.params.studentId, { include: [Course, Business] }).then(student => {
    res.send(student)
  })
})


// Businesses

app.get('/admin/business', (req, res) => {
  const adminId = req.user.admin.id
  Admin.findById(adminId, {
    include: [
      {
        model: Business,
        // include: [
        //   Student.scope('public'),
        // ],
      },
    ]
  }).then(admin => {
    res.send(admin.businesses)
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
