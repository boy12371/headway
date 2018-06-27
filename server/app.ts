// Dependencies
import * as path from 'path'
import * as express from 'express'
import * as exphbs from 'express-handlebars'
import * as passport from 'passport'
import * as epilogue from 'epilogue'
import * as moment from 'moment'

// Init Express Server
const app = express()
import connection from './connection'

// View Engine
const hbs = exphbs.create({})
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.engine('handlebars', hbs.engine)

// Middleware
import { cors } from './middleware'
import * as bodyParser from 'body-parser'
import { checkAdminLogin, checkStudentLogin } from './authentication'
const staticRoute = express.static(path.resolve('./dist'))

app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('express-fileupload')())
app.use(passport.initialize())
app.use(passport.session())
app.use(cors)

app.use('/landing', express.static(path.resolve('./landing')))
app.use('/invite*', staticRoute)
app.use('/confirm*', staticRoute)
app.use('/l/:userType', staticRoute)

// Student
app.use('/app', checkStudentLogin)
app.use('/app', staticRoute)

// Admin
app.use('/dashboard', checkAdminLogin)
app.use('/dashboard', staticRoute)
app.use('/c/:userType', checkAdminLogin)
app.use('/c/:userType', staticRoute)
app.use('/s/:userType', checkAdminLogin)
app.use('/s/:userType', staticRoute)
app.use('/b/:userType', checkAdminLogin)
app.use('/b/:userType', staticRoute)

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/static', staticRoute)

epilogue.initialize({ app, sequelize: connection })

export default app
