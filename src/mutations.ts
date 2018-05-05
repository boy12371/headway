export const mutations = {
    setCourses(state, courses) {
        state.courses = courses
    },
    reset(state) {
        state.courses = []
    }
}
