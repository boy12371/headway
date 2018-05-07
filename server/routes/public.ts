import app from '../app'

// Models
import Admin from '../models/Admin'
import Business from '../models/Business'
import Card from '../models/Card'
import Course from '../models/Course'
import Unit from '../models/Unit'
import Student from '../models/Student'
import Activity from '../models/Activity'

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
