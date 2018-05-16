import app from '../app'

import { checkStudentLogin, authStudent, checkStudentEnrolled } from '../authentication'

import { Course, Student, Card, Unit, Business } from '../models'
import { getStudentActivitiesByUnit, studentUnitProgress, incrementCompletedUnits } from '../actions'

app.use('/student*', checkStudentLogin)

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
  const { cardId } = res.body // params?
  Card.findById(cardId).then(card => {
    studentUnitProgress(card.unitId, cardId).then(progress => {
      if (progress.unitCompleted) {
        // TODO: do not allow double submit
        // incrementCompletedUnits(courseId, studentId)
        res.send('Unit completed')
      } else {
        res.send(progress.completedLength + ' / ' + progress.numberOfCards + ' cards completed')
      }
    })
  })
})
