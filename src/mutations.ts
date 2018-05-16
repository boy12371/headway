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
  createCourse(state, course) {
    state.courses.push(course)
  },
  toggleModal(state, k) {
    state.modals[k] = !state.modals[k]
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
  reset(state) {
    state.courses = []
    state.students = []
    state.businesses = []
  }
}
