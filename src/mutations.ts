export const mutations = {
  setAdmin(state, admin) {
    state.courses = admin.courses
    state.businesses = admin.businesses
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
  setDashboardView(state, view) {
    state.dashboardView = view
  },
  createCourse(state, course) {
    state.courses.push(course)
  },
  toggleModal(state, k) {
    state.modals[k] = !state.modals[k]
  },
  createBusiness(state, business) {
    state.businesses.push(business)
  },
  createUnit(state, {courseId, unit}) {
    state.courses = state.courses.map(course => {
      if (course.id === courseId) {
        course.units = [...course.units, unit]
      }
      return course
    })
    if (courseId === state.activeCourse.id) {
      state.activeCourse.units.push(unit)
    }
  },
  createCard(state, {unitId, card}) {
    // TODO: state.courses course.units
    if (unitId === state.activeUnit.id) {
      state.activeUnit.cards.push(card)
    }
  },
  reset(state) {
    state.courses = []
    state.students = []
    state.businesses = []
  }
}
