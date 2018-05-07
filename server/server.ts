import app from './app'
import connection from './connection'

import './routes/public'
import './routes/admin'
import './routes/student'
import './routes/rest'
import './routes/mentor'

// Constants
const PORT = process.env.PORT || 5000

// Start server
connection.sync().then(() => {
  app.listen(PORT)
  console.log(`headway started @ ${(new Date()).toLocaleString()}\nhttp://localhost:${PORT}\n`)
})
