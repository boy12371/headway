import { createCourse, inviteStudent } from '../actions'
import app from '../app'
import { checkAdminLogin, checkAdminPermission, mockAdminLogin } from '../authentication'
import { Logger } from '../logger'
import { Admin, Business, BusinessCourse, Card, Course, CourseStudent, Student, Unit } from '../models'
import { getSignedUrl, s3 } from '../s3'
import { S3_BUCKET, UPLOAD_DIRECTORY } from '../constants'

import * as fs from 'fs'

if (!fs.existsSync(UPLOAD_DIRECTORY)) {
    fs.mkdirSync(UPLOAD_DIRECTORY)
}

if (process.env.MOCK_AUTH) {
  Logger.warn('WARNING: Mock Admin Auth enabled for /admin and /api')
  app.use('/admin*', mockAdminLogin)
  app.use('/api*', mockAdminLogin)
} else {
  app.use('/admin*', checkAdminLogin)
}


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
  const { name, businessIds = [] } = req.body
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
  Course.findById(req.params.courseId, { include: [Student, Business, Unit] }).then(course => {
    res.send(course)
  })
})


// Units

app.post('/admin/unit', checkAdminLogin, checkAdminPermission, (req, res) => {
  const { name, courseId } = req.body
  Unit.create({ name, courseId }).then(unit => {
    res.send(unit)
  })
})

app.get('/admin/unit/:unitId', (req, res) => {
  const { unitId } = req.params
  Unit.findById(unitId, { include: [Card, Course] }).then(unit => {
    if (unit && unit.course.adminId === req.user.admin.id) {
      res.send(unit)
    } else {
      res.status(401).send({ message: 'Unauthorized: Admin does not own Unit #' + unitId })
    }
  })
})


// Cards

app.post('/admin/unit/:unitId/card', (req, res) => {
  const { unitId, name } = req.body
  Unit.findById(unitId, { include: [Course] }).then(unit => {
    if (unit.course.adminId === req.user.admin.id) {
      Card.create({ unitId, name }).then(card => {
        res.send(card)
      })
    }
    else {
      res.status(401).send({ message: 'Unauthorized: Admin does not own Unit #' + unitId })
    }
  })
})

app.post('/admin/upload', (req, res) => {
  const { cardId } = req.body
  const { file } = req.files
  Card.findById(cardId, { include: [{ model: Unit, include: [Course] }] }).then(card => {
    if (card && card.unit.course.adminId === req.user.admin.id) {
      const localPath = './uploads/' + file.name
      file.mv(localPath, function (err) {
        if (err) {
          return res.status(500).send(err)
        }
        const Key = card.id + '/' + file.name
        const params = {
          Bucket: S3_BUCKET,
          Key,
          Body: file.data
        }
        s3.putObject(params, (err) => {
          if (err) {
            return res.status(500).send(err)
          } else {
            Logger.debug(`Successfully uploaded file to ${S3_BUCKET}/${Key}`)
          }
        })
        card.media = file.name
        card.save()
        res.send('Upload Successful') // WARNING: S3 upload not necessarily complete
      })
    }
    else {
      res.status(401).send({ message: 'Unauthorized: Admin does not own Card #' + cardId })
    }
  })
})


// Students

app.post('/admin/student', (req, res) => {
  const { email, first_name, last_name, businessIds = [] } = req.body
  Admin.findById(req.user.admin.id, { include: [Business] }).then(admin => {
    const ids = admin.businesses.map(d => d.id)
    for (const id of businessIds) {
      if (ids.indexOf(id) === -1) {
        res.status(401).send({ message: 'Unauthorized: Admin does not own Business #' + id })
        return
      }
    }
    inviteStudent({ email, first_name, last_name }, businessIds).then(invitation => {
      res.send({ message: 'Invite Sent' })
    }).catch(err => {
      Logger.warn(err)
      res.status(500).send({ message: 'Could not invite Student' })
    })
  })
})

app.get('/admin/student', (req, res) => {
  Admin.findById(req.user.admin.id, {
    include: [
      {
        model: Business,
        include: [Student.scope('public')]
      }
    ]
  }).then(admin => {
    res.send(admin.getStudents())
  })
})

app.get('/admin/student/:studentId', checkAdminPermission, (req, res) => {
  const adminId = req.user.admin.id
  Student.scope('public').findById(req.params.studentId, {
    include: [
      { model: Course, where: { adminId }, required: false },
      { model: Business, where: { adminId } },
      // This loads way too much data. will need to be custom scopes for sure
      // {
      //   model: Card,
      //   include: [{
      //     model: Unit,
      //     include: [{
      //       model: Course,
      //       where: { adminId }
      //     }]
      //   }]
      // }
    ]
  }).then(student => {
    // TODO: also get Activity where course.adminId === adminId
    res.send(student)
  })
})

app.delete('/admin/student/:studentId', checkAdminPermission, (req, res) => {
  // TODO: this findById include is direct copy paste
  const adminId = req.user.admin.id
  Student.scope('public').findById(req.params.studentId, {
    include: [
      { model: Course, where: { adminId }, required: false },
      { model: Business, where: { adminId } },
    ]
  }).then(student => {
    Promise.all([
      ...student.businesses.map(studentBusiness => studentBusiness.destroy()),
      ...student.courses.map(studentCourse => studentCourse.destroy()),
    ]).then(results => {
      res.send('OK')
    })
  })
})

app.post('/admin/student-course', checkAdminPermission, (req, res) => {
  const { studentId, courseIds = [] } = req.body
  Admin.findById(req.user.admin.id, { include: [Course] }).then(admin => {
    const adminCourseIds = admin.courses.map(course => course.id)
    const promises = courseIds.map(courseId => {
      if (adminCourseIds.indexOf(parseInt(courseId)) === -1) {
        return res.status(401).send({ message: 'Unauthorized: Admin does not own Course' })
      }
      return CourseStudent.findOrCreate({
        where: {
          studentId,
          courseId,
        }
      })
    })
    Promise.all(promises).then(studentCourses => {
      res.send('OK')
    })
  })
})

app.delete('/admin/student-course', checkAdminPermission, (req, res) => {
  const { studentId, courseId } = req.body
  return CourseStudent.destroy({
    where: {
      studentId,
      courseId,
    }
  }).then(result => {
    res.send('OK')
  })
})



// Businesses

app.post('/admin/business', (req, res) => {
  const adminId = req.user.admin.id
  const { name, courseIds = [] } = req.body
  Business.create({ name, adminId }).then(business => {
    const businessId = business.id
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
