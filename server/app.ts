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
const staticRoute = express.static(path.resolve('./dist'))

app.use(cors)
app.use('/', staticRoute)
app.use('/app', staticRoute)
app.use('/dashboard', staticRoute)
app.use('/login*', staticRoute)
app.use('/c/*', staticRoute)
app.use(express.static(path.resolve('./src/static')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('express-session')({ secret: 'I hate cats', resave: false, saveUninitialized: false }))
app.use(require('express-fileupload')())
app.use(passport.initialize())
app.use(passport.session())
epilogue.initialize({ app, sequelize: connection })

export default app
