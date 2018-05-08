import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService } from '../../services'
const courseService = new CourseService()

import { BusinessService } from '../../services'
const businessService = new BusinessService()


import { Header } from '../Header'
import { CourseMenu } from '../CourseMenu'
import { AddCourse } from '../AddCourse'
import { AddStudent } from '../AddStudent'
import { AddBusiness } from '../AddBusiness'
import { Students } from '../Students'
import { Course } from '../Course'
import { Businesses } from '../Businesses'

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
    if (newVal.name === 'course') {
      store.commit('setActiveCourse', newVal.params.id)
    }
  }

  // Set the view name
  get view() {
    return this.$route.name
  }

  get courseMenu() {
    // TODO: Use Course ID for link
    const menu = this.courses.map((course, index) => ({
      text: course.name,
      link: '/c/' + course.name,
      totalUnits: course.units.length,
    }))
    return menu
  }

  mounted() {

    businessService.getAll().then(businesses => {
      store.commit('setBusinesses', businesses)
    })

    courseService.getAll().then(courses => {
      store.commit('setCourses', courses)
    })

  }

}
