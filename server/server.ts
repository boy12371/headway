// Dependencies
import path from 'path'
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
import cors from './middleware/cors'
const bodyParser = require('body-parser')
app.use(cors)
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

// Hello World!
const STARTUP_MESSAGE = `
Server started ${(new Date()).toLocaleString()}

http://localhost:${PORT}
`

// Public Routes
app.get('/', (req, res) => {
  res.send('<pre>' + STARTUP_MESSAGE)
})

app.get('/login', (req, res) => {
  res.render('login')
})


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
  // resource.all.auth(authEpilogue)
})

const cardResource = epilogue.resource({
  model: Card,
  endpoints: ['/api/card', '/api/card/:id']
})

// adminResource.all.auth(authEpilogue)



// Start server
connection.sync().then(() => {
  app.listen(PORT)
  console.log(STARTUP_MESSAGE)
})

