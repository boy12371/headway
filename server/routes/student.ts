import app from '../app'

import { checkStudentLogin, authStudent, checkStudentEnrolled, mockStudentLogin } from '../authentication'

import { Course, Student, Card, Unit, Business, Activity } from '../models'
import { getStudentActivitiesByUnit, studentUnitProgress, incrementCompletedUnits } from '../actions'
import { Logger } from '../logger'

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
  Student.findById(req.user.student.id, {
    include: [
      { model: Card },
    ]
  }).then(student => {
    res.send(student.cardActivities)
  })
})

app.post('/student/:cardId/submit', (req, res) => {
  const studentId = req.user.student.id
  const { cardId } = req.params
  const { completed, evidence_proof } = req.body
  Card.scope('includeCourse').findById(cardId).then(card => {
    console.log(card.toJSON())
    Activity.create({
      studentId,
      cardId,
      completed: completed ? new Date() : null,
      evidence_proof,
    }).then(activity => {
      console.log(activity.toJSON())
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
