export const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
  setStudents(state, students) {
    state.students = students
  },
  setActiveCourse(state, name) {
    state.activeCourse = state.courses
      .find(course => course.name === name)
  },
  setBusinesses(state, businesses) {
    state.businesses = businesses
  },
  reset(state) {
    state.courses = []
    state.students = []
    state.businesses = []
  }
}
