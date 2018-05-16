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
  createUnit(context, { courseId, name }) {
      return axios.post(BASE_URL + '/admin/unit', {
        courseId,
        name,
      }).then(res => {
        const unit = res.data
        context.commit('createUnit', { courseId, unit })
    })
  },
  setDashboardView(context, view) {
    context.commit('setDashboardView', view)
  },
}
