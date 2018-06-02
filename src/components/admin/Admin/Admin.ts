import { Component, Prop, Watch, Vue, Provide } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService, BusinessService, StudentService, UnitService } from '../../../services'
const courseService = new CourseService()
const businessService = new BusinessService()
const studentService = new StudentService()

import { AddStudent, AddUnit, AddCard, AddBusiness, Breadcrumbs, StudentList, StudentProfile, BusinessProfile, Course, Businesses, CourseMenu, RemoveStudentCourse, AddCourse, RemoveCard, RemoveCourse, RemoveUnit } from '../../'

import { Login } from '../../shared/Login'

import './Admin.scss'
import store from '../../../store'
import axios from 'axios'
import { AddStudentCourse } from '../AddStudentCourse'

const toggleModal = k => store.commit('toggleModal', k)

@Component({
  template: require('./Admin.html'),
  name: 'Admin',
  components: {
    AddBusiness,
    AddCard,
    AddCourse,
    AddStudent,
    AddStudentCourse,
    AddUnit,
    Breadcrumbs,
    Course,
    CourseMenu,
    Login,
    RemoveCard,
    RemoveCourse,
    RemoveStudentCourse,
    RemoveUnit,
    StudentList,
    BusinessProfile,
    StudentProfile,
  }
})

export class Admin extends Vue {

  @Provide() studentService = new StudentService()
  @Provide() businessService = new BusinessService()
  @Provide() unitService = new UnitService()
  @Provide() toggleModal = toggleModal

  @State courses
  @State businesses
  @State authed
  @State user
  @State modals
  @State breadcrumbs
  @State route

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

  get businessMenu() {
    if (this.businesses) {
      const menu = this.businesses.map((business, index) => {
        const data = {
          text: business.name,
          link: '/b/' + business.id,
          totalStudents: business.students ? business.students.length : 0,
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
