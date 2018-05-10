export const mutations = {
  setOverview(state, overview) {
    state.courses = overview.courses
    state.students = overview.students
    state.businesses = overview.businesses
    state.user = overview.user
    // state.authed = overview.user && overview.user.id
    state.authed = true
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
  setUser(state, user) {
    state.authed = true
    state.user = user
  },
  setBreadcrumbs(state, crumbs) {
    state.breadcrumbs = crumbs
  },
  toggleModal(state, k) {
    state.modals[k] = !state.modals[k]
  },
  reset(state) {
    state.courses = []
    state.students = []
    state.businesses = []
  }
}
