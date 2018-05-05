import axios from 'axios'

import { BASE_URL } from '../constants'

export class CourseService {
  getAll() {
    return axios.get(BASE_URL + '/courses')
      .then(res => {
        return res.data
      })
  }
}
