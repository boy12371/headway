import axios from 'axios'

import { BASE_URL } from '../constants'

export class CourseService {
  getAll() {
    return axios.get(BASE_URL + '/courses')
      .then(res => {
        return res.data
      })
  }
  get(id) {
    return axios.get(BASE_URL + '/admin/course/' + id)
      .then(res => {
        return res.data
      })
  }
  create(name, businessIds) {
    return axios.post(BASE_URL + '/admin/courses/create', {
      name,
      businessIds
    })
    .then(res => {
      let course = res.data
      course.students = []
      course.units = []
      return course
    })
  }
}
