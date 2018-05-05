// Dependencies
import * as path from 'path'
import * as express from 'express'
import * as exphbs from 'express-handlebars'
import * as passport from 'passport'
import * as epilogue from 'epilogue'
import * as moment from 'moment'

// Constants
const PORT = process.env.PORT || 5000

// Init Express Server
const app = express()
import connection from './connection'

// View Engine
const hbs = exphbs.create({})
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.engine('handlebars', hbs.engine)

// Middleware
import { authEpilogue, authAdmin, checkAdminLogin, checkStudentLogin, authStudent, checkMentorLogin, authMentor, checkStudentEnrolled, checkAdminPermission, } from './authentication'
import { cors } from './middleware'
import * as bodyParser from 'body-parser'

app.use(cors)
app.use('/', express.static(path.resolve('./dist')))
app.use('/app', express.static(path.resolve('./dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('express-session')({ secret: 'I hate cats', resave: false, saveUninitialized: false }))
app.use(require('express-fileupload')())
app.use(passport.initialize())
app.use(passport.session())
epilogue.initialize({ app, sequelize: connection })

// Models
import Admin from './models/Admin'
import Business from './models/Business'
import Card from './models/Card'
import Course from './models/Course'
import Unit from './models/Unit'
import Student from './models/Student'
import Activity from './models/Activity'

// Public Routes
app.get('/courses', (req, res) => {
  Course.findAll({ include: [Unit, Student] }).then((courses) => {
    console.log(courses);
    const data = courses.map(course => ({
      name: course.name,
      units: course.units.map(unit => unit.name),
      students: course.students.map(student => student.email),
    }))
    res.send(data)
  })
})

// Public Routes
app.get('/students', (req, res) => {
  Student.findAll({ include: [Course]}).then((students) => {
    const data = students.map(student => ({
      name: student.first_name + " " + student.last_name,
      email: student.email,
      courses: student.courses,
      businesses: student.courses,
    }))
    res.send(data)
  })
})

// Public Routes
app.get('/businesses', (req, res) => {
  Business.findAll({ include: [Student]}).then((businesses) => {
    const data = businesses.map(business => ({
      name: business.name,
      students: business.students,
    }))
    res.send(data)
  })
})

const SERVER_STARTUP = new Date()

app.get('/status', (req, res) => {
  res.send(`<pre>Server started ${SERVER_STARTUP.toLocaleString()}\n\nhttp://localhost:${PORT}`)
})

app.get('/user', (req, res) => {
  res.send(req.user)
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// Student Routes
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


// Mentor Routes
app.get('/mentor', checkMentorLogin, (req, res) => {
  res.send('Authed as mentor')
})

app.get('/mentor/login', (req, res) => {
  res.render('login')
})

app.post('/mentor/login', authMentor, (req, res) => {
  res.redirect('/mentor')
})

// Admin Routes
app.get('/admin', checkAdminLogin, (req, res) => {
  res.send('Authed as admin')
})

app.get('/admin/login', (req, res) => {
  res.render('login')
})

app.post('/admin/login', authAdmin, (req, res) => {
  res.redirect('/admin')
})

app.get('/admin/courses', checkAdminLogin, (req, res) => {
  Admin.findById(req.user.admin.id, { include: [Course] }).then(admin => {
    res.send(admin.courses)
  })
})

app.get('/admin/course/:courseId', checkAdminLogin, checkAdminPermission, (req, res) => {
  Course.findById(req.params.courseId).then(course => {
    res.send(`Admin ${req.user.admin.name} owns ${course.name}`)
  })
})

// Admin REST API
const restApis = {
  'admin': Admin,
  'activity': Activity,
  'card': Card,
  'course': Course,
  'student': Student,
}
Object.keys(restApis).forEach(k => {
  const model = restApis[k]
  const resource = epilogue.resource({
    model,
    endpoints: ['/api/' + k, '/api/' + k + '/:id']
  })
  resource.all.auth(authEpilogue)
})

// Start server
connection.sync().then(() => {
  app.listen(PORT)
  console.log(`headway started @ ${(new Date()).toLocaleString()}\nhttp://localhost:${PORT}\n`)
})
