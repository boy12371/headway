export const mutations = {
  setOverview(state, overview) {
    state.courses = overview.courses
    state.students = overview.students
    state.businesses = overview.businesses
  },
  setActiveCourse(state, course) {
    state.activeCourse = course
  },
  setActiveUnit(state, unit) {
    state.activeUnit = unit
  },
  reset(state) {
    state.courses = []
    state.students = []
    state.businesses = []
  }
}
