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

  getStudent(context) {
    return axios.get(BASE_URL + '/student').then(res => {
      context.commit('setStudent', res.data)
    })
  },

  getStudentCourse(context, id) {
    return axios.get(BASE_URL + '/student/course/' + id).then(res => {
      context.commit('setActiveStudentCourse', res.data)
    })
  },

  getStudentCard(context, { courseId, unitId, cardId }) {
    if (!context.activeStudentCourse) {
      return axios.get(BASE_URL + '/student/course/' + courseId).then(res => {
        const activeUnitIndex = res.data.units.findIndex(unit => unit.id === unitId)
        const unit = res.data.units[activeUnitIndex]
        const activeCardIndex = unit.cards.findIndex(card => card.id === cardId)
        context.commit('setActiveStudentCourse', res.data)
        context.commit('setActiveStudentCard', unit.cards[activeCardIndex])
      })
    } else {
      const activeUnitIndex = context.activeStudentCourse.units.findIndex(unit => unit.id === unitId)
      const activeCardIndex = context.activeStudentCourse.data.units[activeUnitIndex].cards.findIndex(card => card.id === cardId)
      context.commit('setActiveStudentCard', context.activeStudentCourse.units[activeUnitIndex].cards[activeCardIndex])
    }
  },

  submitStudentCard(context, completed) {
    const cardId = context.state.route.params.cardId
    return axios.post(`${BASE_URL}/student/card/${cardId}/submit`, { completed })
  },

  getStudentProfile(context, id) {

    context.commit('setBreadcrumbs', [
      {
        label: 'Students',
        link: { name: 'dashboard' }
      },
      {
        loading: true
      }
    ])
    return axios.get(BASE_URL + '/admin/student/' + id).then(res => {
      const student = res.data
      context.commit('setActiveStudentProfile', student)
      context.commit('setBreadcrumbs', [
        {
          label: 'Students',
          link: { name: 'dashboard' }
        },
        {
          label: student.first_name + ' ' + student.last_name,
          link: { name: 'studentProfile', params: { studentId: student.id } }
        }
      ])
    })
  },

  getBusinessProfile(context, id) {
    context.commit('setBreadcrumbs', [
      {
        label: 'Businesses'
      },
      {
        loading: true
      }
    ])
    return axios.get(BASE_URL + '/admin/business/' + id).then(res => {
      const business = res.data
      context.commit('setActiveBusinessProfile', business)
      context.commit('setBreadcrumbs', [
        {
          label: 'Businesses'
        },
        {
          label: business.name,
          link: { name: 'businessProfile', params: { businessId: business.id } }
        }
      ])
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

  addStudentCourse(context, payload) {
    return axios.post(BASE_URL + '/admin/student-course', payload).then(res => {
      context.dispatch('getStudentProfile', payload.studentId)
      return res.data
    })
  },

  removeStudentFromCourse(context, payload) {
    // TODO: can DELETE have a body? or need separate endpoint?
    return axios.delete(BASE_URL + '/admin/student-course', { data: payload }).then(res => {
      context.dispatch('getStudentProfile', payload.studentId)
      return res.data
    })
  },

  removeStudentFromBusiness(context, payload) {
    return axios.post(BASE_URL + '/admin/student-business', payload).then(res => {
      context.dispatch('getStudentProfile', payload.studentId)
      return res.data
    })
  },

  fetchCurrentCourse(context) {
    context.commit('setBreadcrumbs', [
      {
        loading: true
      }
    ])
    context.dispatch('fetchCourse', context.state.route.params.courseId)
  },

  fetchCourse(context, id) {
    return axios.get(BASE_URL + '/admin/course/' + id)
      .then(res => {
        const course = res.data
        if (!course) { debugger }
        context.commit('setBreadcrumbs', [
          {
            label: course.name,
            link: { name: 'course', params: { courseId: course.id } }
          }
        ])
        return res.data
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

  removeCourse(context, id) {
    id = parseInt(id)
    return axios.delete(BASE_URL + '/api/course/' + id).then(res => {
      context.commit('removeCourse', id)
      context.commit('setNotification', {
        message: 'Course Removed'
      })
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

  removeUnit(context, id) {
    return axios.delete(BASE_URL + '/api/unit/' + id).then(res => {
      context.commit('removeUnit', id)
    })
  },

  createCard(context, { courseId, unitId, name }) {
    return axios.post(BASE_URL + '/admin/unit/' + unitId + '/card', {
      courseId,
      unitId,
      name,
    }).then(res => {
      const card = res.data
      context.commit('createCard', { courseId, unitId, card })
    })
  },

  editCard(context, { card }) {
    return axios.put(BASE_URL + '/api/card/' + card.id, card).then(res => {
      const card = res.data
      // context.commit('updateCard', { card })
    })
  },

  removeCard(context, id) {
    return axios.delete(BASE_URL + '/api/card/' + id).then(res => {
      // ...
    })
  },

  updateActiveCard(context, card) {
    return axios.put(BASE_URL + '/api/card/' + card.id, card).then(res => {
      const card = res.data
      context.commit('setNotification', {
        type: 'success',
        message: 'Card saved'
      })
    })
  },

  updateActiveCardQuiz(context, quiz) {
    let card = context.state.activeCard
    card.quiz = JSON.stringify(quiz)
    return axios.put(BASE_URL + '/api/card/' + card.id, card).then(res => {
      const card = res.data
      context.commit('setNotification', {
        type: 'success',
        message: 'Quiz updated'
      })
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
  },

  setAppView(context, view) {
    context.commit('setAppView', view)
  },
}
