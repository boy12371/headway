// Dependencies
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
// const passport = require('passport')
const epilogue = require('epilogue')
// const moment = require('moment')

// Constants
const PORT = process.env.PORT || 5000

// Init Express Server
const app = express()
const connection = require('./connection')

// View Engine
const hbs = exphbs.create({})
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.engine('handlebars', hbs.engine)

// Middleware
// const { cors } = require('./middleware')
const bodyParser = require('body-parser')
// app.use(cors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(require('express-session')({ secret: 'I hate cats', resave: false, saveUninitialized: false }))
// app.use(require('express-fileupload')())
// app.use(passport.initialize())
// app.use(passport.session())
epilogue.initialize({ app, sequelize: connection })

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


// const { Admin } = require('./models')
const Admin = require('./models/Admin')

// Admin REST API
const adminResource = epilogue.resource({
    model: Admin,
    endpoints: ['/api/admin', '/api/admin/:id']
})

// adminResource.all.auth(authEpilogue)


// Start server
connection.sync().then(() => {
    app.listen(PORT)
    console.log(STARTUP_MESSAGE)
})
