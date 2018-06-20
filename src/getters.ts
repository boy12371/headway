import { Logger } from './logger'

import { values } from 'lodash'

export const getters = {
  currentCourse(state) {
    const id = parseInt(state.route.params.courseId)
    const courses = state.courses.filter(course => course.id === id)
    return courses.pop()
  },
  registeredStudents(state) {
    let map = {}

    if (state.businesses) {
      state.businesses.forEach(business => {
        if (!business.students) {
          return
        }
        business.students.forEach(student => {
          if (student.first_name) {
            map[student.email] = student
          }
        })
      })
      return values(map)
    }
  },
  pendingStudents(state) {
    let map = {}

    if (state.businesses) {
      state.businesses.forEach(business => {
        if (!business.students) {
          return
        }
        business.students.forEach(student => {
          if (!student.first_name) {
            map[student.email] = student
          }
        })
      })
      return values(map)
    }
  },
}
