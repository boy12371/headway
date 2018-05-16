import * as passwordGenerator from 'generate-password'

import app from '../app'
import mailer from '../mailer'

import { authEpilogue, authAdmin, checkStudentLogin, authStudent, checkMentorLogin, authMentor, checkStudentEnrolled, checkAdminPermission, checkAdminLogin, mockAdminLogin, } from '../authentication'
import { createAdmin, createCourse, inviteStudent } from '../actions'
import { PASSWORD_OPTS } from '../constants'
import mail from '../mail'

import { Admin, Course, Business, BusinessCourse, Student, Unit, Card } from '../models'
import { Logger } from '../logger'

// app.use('/admin*', checkAdminLogin)

Logger.warn('WARNING: Mock Admin Auth enabled for /admin and /api')
app.use('/admin*', mockAdminLogin)
app.use('/api*', mockAdminLogin)

// Overview

app.get('/admin', (req, res) => {
  const adminId = req.user.admin.id
  Admin.findById(adminId, {
    include: [
      {
        model: Business,
        include: [
          Student.scope('public'),
        ],
      },
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

// Courses

app.get('/admin/course', (req, res) => {
  Admin.findById(req.user.admin.id, {
    include: [
      { model: Course, include: [Unit] }
    ]
  }).then(admin => {
    res.send(admin.courses)
  })
})

app.post('/admin/course', (req, res) => {
  const { name, businessIds } = req.body
  Admin.findById(req.user.admin.id, { include: [Business] }).then(admin => {
    const ids = admin.businesses.map(d => d.id)
    for (const id of businessIds) {
      if (ids.indexOf(id) === -1) {
        res.status(401).send({ message: 'Unauthorized: Admin does not own Business #' + id })
        return
      }
    }
    createCourse(req.user.admin.id, name, businessIds).then(course => {
      res.send(course)
    })
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
  Unit.create({ name, courseId }).then(unit => {
    res.send(unit)
  })
})

app.get('/admin/unit/:unitId', (req, res) => {
  const { unitId } = req.params
  Unit.findById(unitId, { include: [Card, Course] }).then(unit => {
    if (unit.course.adminId === req.user.admin.id) {
      res.send(unit)
    }
    else {
      res.status(401).send({ message: 'Unauthorized: Admin does not own Unit #' + unitId })
    }
  })
})


// Cards

app.post('/admin/unit/:unitId/card', (req, res) => {
  const { unitId } = req.params
  Unit.findById(unitId, { include: [Course] }).then(unit => {
    if (unit.course.adminId === req.user.admin.id) {
      Card.create({ unitId }).then(card => {
        res.send(card)
      })
    }
    else {
      res.status(401).send({ message: 'Unauthorized: Admin does not own Unit #' + unitId })
    }
  })
})

app.put('/admin/card/:cardId', (req, res) => {
  const { cardId } = req.params
  Card.findById(cardId, { include: [{ model: Unit, include: [Course] }] }).then(card => {
    if (card.unit.course.adminId === req.user.admin.id) {
      Card.findById(cardId).then(card => {
        Logger.debug('TODO: modify card')
        res.send(card)
      })
    }
    else {
      res.status(401).send({ message: 'Unauthorized: Admin does not own Card #' + cardId })
    }
  })
})


// Students

app.post('/admin/student', (req, res) => {
  const { email, businessIds } = req.body
  inviteStudent(email, businessIds).then(student => {
    res.send(student)
  })
})

app.get('/admin/student', (req, res) => {
  Admin.findById(req.user.admin.id, { include: [{ model: Business, include: [Student] }] }).then(admin => {
    res.send(admin.getStudents())
  })
})

app.get('/admin/student/:studentId', checkAdminPermission, (req, res) => {
  Student.findById(req.params.studentId, { include: [Course, Business] }).then(student => {
    res.send(student)
  })
})


// Businesses

app.post('/admin/business', (req, res) => {
  const adminId = req.user.admin.id
  const { name, courseIds } = req.body
  Business.create({ name, adminId }).then(business => {
    const businessId = business.id
    console.warn('TODO: check Admin owns Course before linking')
    Admin.findById(adminId, { include: [Course] }).then(admin => {
      for (const courseId of courseIds) {
        if (admin.ownsCourse(courseId)) {
          BusinessCourse.create({ courseId, businessId })
        } else {
          console.warn(`Admin does not own Course #${courseId}`)
        }
      }
    })
    res.send(business)
  })
})

app.get('/admin/business', (req, res) => {
  const adminId = req.user.admin.id
  Admin.findById(adminId, { include: [{ model: Business }] }).then(admin => {
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
