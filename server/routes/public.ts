import app from '../app'

import { Business, Card, Course, Mentor, Student, Unit, Admin, BusinessStudent, BusinessCourse, CourseStudent, Activity } from '../models'

const SERVER_STARTUP = new Date()

app.get('/courses', (req, res) => {
  Course.findAll({ include: [Unit, Student] }).then((courses) => {
    const data = courses.map(course => ({
      name: course.name,
      units: course.units.map(unit => unit.name),
      students: course.students.map(student => student.email),
    }))
    res.send(data)
  })
})

app.get('/students', (req, res) => {
  Student.findAll({ include: [Course] }).then((students) => {
    const data = students.map(student => ({
      name: student.displayName(),
      email: student.email,
      courses: student.courses,
      businesses: student.courses,
    }))
    res.send(data)
  })
})

app.get('/businesses', (req, res) => {
  Business.findAll({ include: [Student] }).then((businesses) => {
    const data = businesses.map(business => ({
      name: business.name,
      students: business.students,
    }))
    res.send(data)
  })
})

app.get('/status', (req, res) => {
  res.send(`<pre>Server started ${SERVER_STARTUP.toLocaleString()}`)
})

app.get('/user', (req, res) => {
  res.send(req.user)
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


// This is probably a really bad idea

app.get('/reset-database', (req, res) => {
  res.send('<form method="POST"><button>RESET DATABASE</button></form>')
})

app.post('/reset-database', (req, res) => {

})
