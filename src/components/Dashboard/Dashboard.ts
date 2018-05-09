import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService } from '../../services'
const courseService = new CourseService()

import { BusinessService } from '../../services'
const businessService = new BusinessService()

import { AddStudent, AddBusiness, Students, Course, Header, Businesses, CourseMenu, AddCourse } from '../'

import './Dashboard.scss'
import store from '../../store'

@Component({
  template: require('./Dashboard.html'),
  name: 'Dashboard',
  components: {
    Header,
    AddCourse,
    AddStudent,
    AddBusiness,
    Students,
    CourseMenu,
    Course,
  }
})
export class Dashboard extends Vue {
  showCourseModal = false
  showStudentModal = false
  showBusinessModal = false

  @State courses
  @State authed

  @State activeCourse

  @Watch('$route', { deep: true})
  watchRoute(newVal, oldVal) {
    this.updateRoute(newVal)
  }

  // Set the view name
  get view() {
    return this.$route.name
  }

  updateRoute(route) {
    if (route.name === 'course') {
      store.commit('setActiveCourse', route.params.id)
    }
  }

  get courseMenu() {
    // TODO: Use Course ID for link
    const menu = this.courses.map((course, index) => {
      const data = {
        text: course.name,
        link: '/c/' + course.id,
        totalUnits: course.units.length,
      }
      console.log(data)
      return data
    })
    return menu
  }

  mounted() {

    this.updateRoute(this.$route)

    businessService.getAll().then(businesses => {
      store.commit('setBusinesses', businesses)
    })

    courseService.getAll().then(courses => {
      store.commit('setCourses', courses)
    })

  }

}
