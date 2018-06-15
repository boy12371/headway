import app from '../app'

import { checkStudentLogin, authStudent, checkStudentEnrolled, mockStudentLogin } from '../authentication'

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
      Course,
    ]
  }).then(student => res.send(student))
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
  const { completed, evidence_proof } = req.body
  Card.scope('includeCourse').findById(cardId).then(card => {
    if (!card) {
      return res.status(404)
    }
    Activity.create({
      studentId,
      cardId,
      completed,
      evidence_proof,
    }).then(activity => {
      studentUnitProgress(card.unit.id, card.id).then(progress => {
        if (progress.unitCompleted) {
          // TODO: do not allow double submit
          incrementCompletedUnits(card.unit.course.id, studentId).then(result => {
            res.send('Unit completed')
          })
        } else {
          res.send(progress.completedLength + ' / ' + progress.numberOfCards + ' cards completed')
        }
      })
    })
  })
})

app.get('/student/:courseId/:unitId/:cardId/media', checkStudentEnrolled, (req, res) => {
  const { cardId } = req.params

  Promise.all([
    Card.scope('includeCourse').findById(cardId),
    Student.scope('public').findById(req.user.student.id, {include: [Course]}),
  ])
    .then(([card, student]) => {
      const courseIds = student.courses.map(course => course.id)
      if (courseIds.indexOf(card.unit.courseId) === -1) {
        res.status(401).send({ message: 'Unauthorized: Student does not own Card #' + cardId })
        return
      }
      const name = card.media
      const Key = `${cardId}/${name}`
      getSignedUrl(Key).then(url => {
        // res.send(`<img src="${url}">`)
        res.redirect(url)
      })
    })
})
