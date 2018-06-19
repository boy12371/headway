export const mutations = {
  setAdmin(state, admin) {
    state.adminName = admin.name
    state.courses = admin.courses
    state.businesses = admin.businesses
    // state.authed = overview.user && overview.user.id
    state.authed = true
  },
  setStudent(state, student) {
    state.student = student
    state.authed = true
  },
  set(state, {key, value}) {
    state[key] = value
  },
  setNotification(state, payload) {
    state.notification = payload
  },
  setActiveCard(state, card) {
    state.activeCard = card
  },
  setActiveCardVideo(state, file) {
    state.activeCard.media = file
  },
  setActiveStudentCourse(state, course) {
    state.activeStudentCourse = course
  },
  setActiveStudentCard(state, card) {
    state.activeStudentCard = card
  },
  setDeleteStudentCourseId(state, id) {
    state.deleteStudentCourseId = id
  },
  setActiveStudentProfile(state, profile) {
    state.activeStudentProfile = profile
  },
  setActiveBusinessProfile(state, profile) {
    state.activeBusinessProfile = profile
  },
  setUser(state, user) {
    state.authed = true
    state.user = user
  },
  setBreadcrumbs(state, crumbs) {
    state.breadcrumbs = crumbs
  },
  setStudentListFilter(state, view) {
    state.studentListFilter = view
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
  addOrUpdateStudent(state, {student, businessIds}) {
    console.log('todo: add student to appropriate courses too')
    // state.businesses = state.businesses.map(business => {
    //   if (businessIds.indexOf(business.id) >= 0) {
    //     business.students.push(student)
    //   }
    // })
  },
  createUnit(state, {courseId, unit}) {
    const i = state.courses.findIndex(course => course.id === courseId)
    state.courses[i].units.push(unit)
  },
  setUnitInCourse(state, { unit, courseId}) {
    const i = state.courses.findIndex(course => course.id === courseId)
    const j = state.courses[i].units.findIndex(u => u.id === unit.id)
    state.courses[i].units[j] = unit
  },
  removeUnit(state, id) {
    state.courses.forEach(course => {
      course.units = course.units.filter(unit => unit.id !== id)
    })
  },
  removeCourse(state, id) {
    state.courses = state.courses.filter(course => course.id !== id)
  },
  createCard(state, {courseId, unitId, card}) {
    const courseIndex = state.courses.findIndex(course => course.id === courseId)
    const unitIndex = state.courses[courseIndex].units.findIndex(unit => unit.id === unitId)
    state.courses[courseIndex].units[unitIndex].cards.push(card)
  },
  reset(state) {
    state.courses = []
    state.businesses = []
  },
  setAppView(state, view) {
    state.appView = view
  },
  toggleSidebar(state) {
    state.sidebarOpen = !state.sidebarOpen
  },
}
