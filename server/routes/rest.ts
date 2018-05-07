import * as epilogue from 'epilogue'

import { authEpilogue } from '../authentication'

// Models
import Admin from '../models/Admin'
import Business from '../models/Business'
import Card from '../models/Card'
import Course from '../models/Course'
import Unit from '../models/Unit'
import Student from '../models/Student'
import Activity from '../models/Activity'

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
