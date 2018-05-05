export const mutations = {
    setCourses(state, courses) {
        state.courses = courses
    },
    setStudents(state, students) {
        state.students = students
    },
    reset(state) {
        state.courses = []
        state.students = []
    }
}
