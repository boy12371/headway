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
import { authEpilogue, authAdmin, checkAdminLogin, checkstudentLogin, authStudent } from './authentication'
import { cors } from './middleware'
import * as bodyParser from 'body-parser'

app.use(cors)
app.use('/', express.static(path.resolve('./dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('express-session')({ secret: 'I hate cats', resave: false, saveUninitialized: false }))
app.use(require('express-fileupload')())
app.use(passport.initialize())
app.use(passport.session())
epilogue.initialize({ app, sequelize: connection })

// Models
import Admin from './models/Admin'
import Card from './models/Card'
import Course from './models/Course'

// Public Routes
app.get('/status', (req, res) => {
  res.send(`<pre>Server started ${(new Date()).toLocaleString()}\n\nhttp://localhost:${PORT}`)
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// Student Routes
app.get('/student', checkstudentLogin, (req, res) => {
  res.send('Authed as student')
})

app.get('/student/login', (req, res) => {
  res.render('login')
})

app.post('/student/login', authStudent, (req, res) => res.redirect('/student'))

// Admin Routes
app.get('/admin', checkAdminLogin, (req, res) => {
  res.send('Authed as admin')
})

app.get('/admin/login', (req, res) => {
  res.render('login')
})

app.post('/admin/login', authAdmin, (req, res) => res.redirect('/admin'))


// Admin REST API
const restApis = {
  'admin': Admin,
  'card': Card,
  'course': Course,
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
  console.log(`<pre>Server started ${(new Date()).toLocaleString()}\n\nhttp://localhost:${PORT}`)
})

