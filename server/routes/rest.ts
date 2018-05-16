import * as epilogue from 'epilogue'

import { authEpilogue } from '../authentication'

import { Admin, Activity, Card, Course, Student, Unit, Business, BusinessCourse } from '../models'
import { Logger } from '../logger'

// Admin REST API
const restApis = {
  'business-course': BusinessCourse,
  'activity': Activity,
}
Object.keys(restApis).forEach(k => {
  const model = restApis[k]
  const resource = epilogue.resource({
    model,
    endpoints: ['/api/' + k, '/api/' + k + '/:id']
  })
  // resource.all.auth(authEpilogue)
  Logger.warn('Exposing publicly accessible REST API: ' + k)
})

const authRest = (authorize) => (req, res, context) => {
  return new Promise((resolve, reject) => {
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
  Logger.info('Exposing secure REST API: ' + k)
}

createRestApi(Business, 'business', (req, res, context, resolve) => {
  const id = parseInt(req.params.id)
  const adminId = req.user.admin.id
  Admin.findById(adminId, { include: [Business] }).then(admin => {
    const ids = admin.businesses.map(d => d.id)
    if (ids.indexOf(id) >= 0) {
      resolve(context.continue)
    } else {
      res.status(401).send({ message: 'Unauthorized: Admin does not own Business #' + id })
      resolve(context.stop)
    }
  })
})

createRestApi(Course, 'course', (req, res, context, resolve) => {
  const id = parseInt(req.params.id)
  const adminId = req.user.admin.id
  Admin.findById(adminId, { include: [Course] }).then(admin => {
    const ids = admin.courses.map(d => d.id)
    if (ids.indexOf(id) >= 0) {
      resolve(context.continue)
    } else {
      res.status(401).send({ message: 'Unauthorized: Admin does not own Course #' + id })
      resolve(context.stop)
    }
  })
})

createRestApi(Unit, 'unit', (req, res, context, resolve) => {
  const id = parseInt(req.params.id)
  const adminId = req.user.admin.id
  Admin.findById(adminId, { include: [{ model: Course, include: [Unit] }] })
    .then(admin => {
      if (admin.ownsUnit(id)) {
        resolve(context.continue)
      } else {
        res.status(401).send({ message: 'Unauthorized: Admin does not own Unit #' + id })
        resolve(context.stop)
      }
    })
})

createRestApi(Card, 'card', (req, res, context, resolve) => {
  const id = parseInt(req.params.id)
  const adminId = req.user.admin.id
  Admin.findById(adminId, { include: [{ model: Course, include: [{model: Unit, include: [Card]}] }] })
    .then(admin => {
      if (admin.ownsCard(id)) {
        resolve(context.continue)
      } else {
        res.status(401).send({ message: 'Unauthorized: Admin does not own Card #' + id })
        resolve(context.stop)
      }
    })
})

createRestApi(Student, 'student', (req, res, context, resolve) => {
  const id = parseInt(req.params.id)
  const adminId = req.user.admin.id
  Admin.findById(adminId, { include: [{ model: Business, include: [Student] }] })
    .then(admin => {
      if (admin.ownsStudent(id)) {
        resolve(context.continue)
      } else {
        res.status(401).send({ message: 'Unauthorized: Admin does not own Student #' + id })
        resolve(context.stop)
      }
    })
})
