import app from '../app'

import { checkStudentLogin, authStudent, checkStudentEnrolled } from '../authentication'

import { Course, Student, Card } from '../models'
import { getStudentActivitiesByUnit, studentUnitProgress, incrementCompletedUnits } from '../actions'

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

app.post('/students/:cardId/submit', (req, res) => {
  const { cardId } = res.body
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
