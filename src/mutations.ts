export const mutations = {
  setOverview(state, overview) {
    state.courses = overview.courses
    state.students = overview.students
    state.businesses = overview.businesses
    state.user = overview.user
  },
  setActiveCourse(state, course) {
    state.activeCourse = course
  },
  setActiveUnit(state, unit) {
    state.activeUnit = unit
  },
  setActiveCard(state, card) {
    state.activeCard = card
  },
  reset(state) {
    state.courses = []
    state.students = []
    state.businesses = []
  }
}
