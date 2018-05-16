import axios from 'axios'
import { BASE_URL } from './constants'

export const actions = {
  getAdminOverview(context) {
    return axios.get(BASE_URL + '/admin/overview').then(res => {
      context.commit('setOverview', res.data)
    })
  }
}
