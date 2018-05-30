import { Component, Prop, Watch, Vue, Provide } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService, BusinessService, StudentService, UnitService } from '../../../services'
const courseService = new CourseService()
const businessService = new BusinessService()
const studentService = new StudentService()

import { AddStudent, AddUnit, AddCard, AddBusiness, Breadcrumbs, StudentList, StudentProfile, Course, Businesses, CourseMenu, AddCourse } from '../../'

import { Login } from '../../shared/Login'

import './Admin.scss'
import store from '../../../store'
import axios from 'axios'

const toggleModal = k => store.commit('toggleModal', k)

@Component({
  template: require('./Admin.html'),
  name: 'Admin',
  components: {
    AddCourse,
    AddStudent,
    AddBusiness,
    AddUnit,
    AddCard,
    StudentList,
    StudentProfile,
    CourseMenu,
    Course,
    Login,
    Breadcrumbs,
  }
})

export class Admin extends Vue {
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
  @State breadcrumbs

  @State activeCourse

  get view() {
    return this.$route.name
  }

  get courseMenu() {
    if (this.courses) {
      const menu = this.courses.map((course, index) => {
        const data = {
          text: course.name,
          link: '/c/' + course.id,
          totalUnits: course.units ? course.units.length : 0,
        }
        return data
      })
      return menu
    }
  }

  mounted() {
    store.dispatch('getAdmin')
  }

}
