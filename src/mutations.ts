export const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
  setStudents(state, students) {
    state.students = students
  },
  setActiveCourse(state, course) {
    state.activeCourse = course
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
