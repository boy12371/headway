import { Logger } from './logger'

export const getters = {
  currentCourse(state) {
    const id = parseInt(state.route.params.courseId)
    const courses = state.courses.filter(course => course.id === id)
    return courses.pop()
  }
}
