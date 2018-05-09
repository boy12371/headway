import app from '../app'

import { Business, Card, Course, Mentor, Student, Unit, Admin, BusinessStudent, BusinessCourse, CourseStudent, Activity } from '../models'

const SERVER_STARTUP = new Date()

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
