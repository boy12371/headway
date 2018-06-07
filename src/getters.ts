import { Logger } from './logger'

import { values } from 'lodash'

export const getters = {
  currentCourse(state) {
    const id = parseInt(state.route.params.courseId)
    const courses = state.courses.filter(course => course.id === id)
    return courses.pop()
  },
  allStudents(state) {
    let map = {}

    if(state.businesses) {
      state.businesses.forEach(business => {
        if (!business.students) {
          return
        }
        business.students.forEach(student => {
          map[student.email] = student
        })
      })
      return values(map)
    }
  }
}
