import * as epilogue from 'epilogue'

import { authEpilogue } from '../authentication'

import { Admin, Activity, Card, Course, Student, Unit } from '../models'


// Admin REST API
const restApis = {
  'admin': Admin,
  'activity': Activity,
  'card': Card,
  'course': Course,
  'student': Student,
  'unit': Unit,
}
Object.keys(restApis).forEach(k => {
  const model = restApis[k]
  const resource = epilogue.resource({
    model,
    endpoints: ['/api/' + k, '/api/' + k + '/:id']
  })
  // resource.all.auth(authEpilogue)
})
