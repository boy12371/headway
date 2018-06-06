export const state = {
  authed: false,
  courses: [],
  businesses: [],
  studentListFilter: 'business',
  appView: 'studentHome',
  adminName: '',
  notification: {
    type: '',
    message: ''
  },
  activeUnit: {},
  activeCard: {},
  activeStudentProfile: {},
  activeBusinessProfile: {
    students: []
  },
  activeStudentCourse: {},
  activeStudentCard: {},
  user: {},
  breadcrumbs: [],
  modals: {
    unit: false,
    student: false,
    course: false,
    business: false,
    card: false,
    addStudentCourse: false,
    removeStudentCourse: false,
    removeCourse: false,
    removeUnit: false,
    removeCard: false,
  },
  removeCourseId: null,
  removeUnitId: null,
  removeCardId: null,
  addCardUnitId: null,
}
