import * as epilogue from 'epilogue'

import { authEpilogue } from '../authentication'

import { Admin, Activity, Card, Course, Student, Unit, Business, BusinessCourse } from '../models'
import { Logger } from '../logger'

// Admin REST API
const restApis = {
  'admin': Admin,
  'business-course': BusinessCourse,
  'activity': Activity,
  'card': Card,
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
  console.warn('Exposing publicly accessibly REST API: ' + k)
})

const authRest = (authorize) => (req, res, context) => {
  return new Promise((resolve, reject) => {
    Logger.debug(req.isAuthenticated, req.user)
    if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.admin) {
      res.status(401).send({ message: 'Unauthorized' })
      resolve(context.stop)
    } else {
      authorize(req, res, context, resolve)
    }
  })
}

const createRestApi = (model, k, authorize) => {
  const resource = epilogue.resource({
    model,
    endpoints: [
      `/api/${k}/:id`
    ]
  })
  resource.all.auth(authRest(authorize))
  console.log('Exposing secure REST API: ' + k)
}

createRestApi(Business, 'business', (req, res, context, resolve) => {
  const id = parseInt(req.params.id)
  const adminId = req.user.admin.id
  Admin.findById(adminId, { include: [Business] }).then(admin => {
    const ids = admin.businesses.map(d => d.id)
    Logger.debug({ ids })
    if (ids.indexOf(id) >= 0) {
      resolve(context.continue)
    } else {
      res.status(401).send({ message: `Unauthorized` })
      resolve(context.stop)
    }
  })
})

createRestApi(Course, 'course', (req, res, context, resolve) => {
  const id = parseInt(req.params.id)
  const adminId = req.user.admin.id
  Admin.findById(adminId, { include: [Course] }).then(admin => {
    const ids = admin.courses.map(d => d.id)
    Logger.debug({ ids })
    if (ids.indexOf(id) >= 0) {
      resolve(context.continue)
    } else {
      res.status(401).send({ message: `Unauthorized` })
      resolve(context.stop)
    }
  })
})
