import axios from 'axios'
import { BASE_URL } from './constants'

// import { CourseService, BusinessService, StudentService, UnitService } from './services'
// const unitService = new UnitService()

export const actions = {
  getAdmin(context) {
    return axios.get(BASE_URL + '/admin').then(res => {
      context.commit('setAdmin', res.data)
    })
  },

  inviteStudent(context, payload) {
    return axios.post(BASE_URL + '/admin/student', payload).then(res => {
      const student = res.data
      // context.commit('addOrUpdateStudent', student)
      context.dispatch('getAdmin')
      return student
    })
  },

  createCourse(context, { name, businessIds }) {
    return axios.post(BASE_URL + '/admin/course', {
      name,
      businessIds
    }).then(res => {
      let course = res.data
      course.students = []
      course.units = []
      context.commit('createCourse', course)
      return course
    })
  },

  createUnit(context, { courseId, name }) {
    return axios.post(BASE_URL + '/admin/unit', {
      courseId,
      name,
    }).then(res => {
      const unit = res.data
      context.commit('createUnit', { courseId, unit })
    })
  },

  createCard(context, { unitId, name }) {
    return axios.post(BASE_URL + '/admin/unit/' + unitId + '/card', {
      unitId,
      name,
    }).then(res => {
      const card = res.data
      context.commit('createCard', { unitId, card })
    })
  },

  editCard(context, { card }) {
    return axios.put(BASE_URL + '/admin/card/' + card.id, card).then(res => {
      const card = res.data
      // context.commit('updateCard', { card })
    })
  },

  createBusiness(context, { name, courseIds }) {
    return axios.post(BASE_URL + '/admin/business', {
      name,
      courseIds,
    }).then(res => {
      const business = res.data
      context.commit('createBusiness', business)
    })
  }
}
