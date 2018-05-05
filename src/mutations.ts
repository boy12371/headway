export const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
  setStudents(state, students) {
    state.students = students
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
