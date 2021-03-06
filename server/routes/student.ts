import app from '../app'
import * as bcrypt from 'bcrypt'

import { checkStudentLogin, authStudent, checkStudentEnrolled, mockStudentLogin, authStudentInvite } from '../authentication'

import { Course, Student, Card, Unit, Business, Activity } from '../models'
import { getStudentActivitiesByUnit, studentUnitProgress, incrementCompletedUnits } from '../actions'
import { Logger } from '../logger'
import { getSignedUrl } from '../s3'

if (process.env.MOCK_AUTH) {
  Logger.warn('WARNING: Mock Student Auth enabled for /student')
  app.use('/student*', mockStudentLogin)
} else {
  app.use('/student*', checkStudentLogin)
}

app.get('/student', (req, res) => {
  Student.scope('public').findById(req.user.student.id, {
    include: [
      Business,
      {
        model: Course,
        include: [Unit]
      }
    ]
  }).then(student => res.send(student))
})

app.put('/update-student-details', authStudentInvite, (req, res) => {
  Student.findById(req.user.id).then(student => {
    const { first_name, last_name, password } = req.body
    student.first_name = first_name
    student.last_name = last_name
    if (password) {
      student.password = bcrypt.hashSync(password, student.salt)
    }
    student.save().then(d => res.send(student))
  })
})

app.get('/student/course/:courseId', checkStudentEnrolled, (req, res) => {
  Course.findById(req.params.courseId, {
    include: [
      { model: Unit, include: [Card] }
    ]
  }).then(course => {
    res.send(course)
  })
})

app.get('/student/activity', (req, res) => {
  const studentId = req.user.student.id
  Activity.findAll({
    where: {
      studentId,
    },
  }).then(activities => {
    res.send(activities)
  })
})

app.post('/student/card/:cardId/submit', (req, res) => {
  const studentId = req.user.student.id
  const { cardId } = req.params
  const { completed, text } = req.body
  Card.scope('includeCourse').findById(cardId).then(card => {
    if (!card) {
      return res.status(404)
    }
    if (completed) {
      Activity.find({
        where: {
          studentId,
          cardId,
          completed,
        }
      }).then(activity => {
        if (activity) {
          res.send('Card already completed')
        } else {
          Activity.create({
            studentId,
            cardId,
            completed,
            text,
          }).then(activity => {
            studentUnitProgress(card.unit.id, studentId).then(progress => {
              if (progress.unitCompleted) {
                incrementCompletedUnits(card.unit.course.id, studentId).then(result => {
                  res.send('Unit completed')
                })
              } else {
                res.send('OK')
              }
            })
          })
        }
      })
    }
    else {
      // Log user attempted card but failed
      Activity.create({
        studentId,
        cardId,
        completed,
        text,
      }).then(activity => {
        res.send('OK')
      })
    }
  })
})

app.get('/student/card/:cardId/media', (req, res) => {
  const { cardId } = req.params

  Promise.all([
    Card.scope('includeCourse').findById(cardId),
    Student.scope('public').findById(req.user.student.id, { include: [Course] }),
  ])
    .then(([card, student]) => {
      const courseIds = student.courses.map(course => course.id)
      if (courseIds.indexOf(card.unit.courseId) === -1) {
        res.status(401).send({ message: 'Unauthorized: Student does not own Card #' + cardId })
        return
      }
      const name = card.media
      if (!name) {
        return res.redirect('/img/no-media.png')
      }
      const Key = `${cardId}/${name}`
      getSignedUrl(Key).then(url => {
        // res.send(`<img src="${url}">`)
        res.redirect(url)
      })
    })
})
