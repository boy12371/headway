import { Component, Prop, Watch, Vue, Provide } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService, BusinessService, StudentService, UnitService } from '../../services'
const courseService = new CourseService()
const businessService = new BusinessService()
const studentService = new StudentService()

import { AddStudent, AddUnit, AddCard, AddBusiness, Students, Course, Header, Businesses, CourseMenu, AddCourse } from '../'

import { Login } from '../Login'

import './Dashboard.scss'
import store from '../../store'
import axios from 'axios'

const toggleModal = k => store.commit('toggleModal', k)

@Component({
  template: require('./Dashboard.html'),
  name: 'Dashboard',
  components: {
    Header,
    AddCourse,
    AddStudent,
    AddBusiness,
    AddUnit,
    AddCard,
    Students,
    CourseMenu,
    Course,
    Login,
  }
})
export class Dashboard extends Vue {
  showCourseModal = false
  showStudentModal = false
  showBusinessModal = false
  showUnitModal = false

  @Provide() studentService = new StudentService()
  @Provide() businessService = new BusinessService()
  @Provide() unitService = new UnitService()
  @Provide() toggleModal = toggleModal

  @State courses
  @State authed
  @State user
  @State modals

  @State activeCourse

  // Set the view name
  get view() {
    return this.$route.name
  }

  get courseMenu() {
    // TODO: Use Course ID for link
    if (this.courses) {
      const menu = this.courses.map((course, index) => {
        const data = {
          text: course.name,
          link: '/c/' + course.id,
          totalUnits: course.unit ? course.units.length : 0,
        }
        return data
      })
      return menu
    }
  }

  mounted() {
    store.dispatch('getAdminOverview')
  }

  resetDatabase() {
    axios.post('/api/course/create', )
  }

}
