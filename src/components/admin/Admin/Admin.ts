import { Component, Prop, Watch, Vue, Provide } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService, BusinessService, StudentService, UnitService } from '../../../services'
const courseService = new CourseService()
const businessService = new BusinessService()
const studentService = new StudentService()

import { AddStudent, AddUnit, AddCard, AddBusiness, Breadcrumbs, StudentList, StudentProfile, Toast, BusinessProfile, LearningCard, Course, Businesses, CourseMenu, RemoveStudentCourse, AddCourse, RemoveCard, RemoveVideo, RemoveStudent, RemoveCourse, RemoveUnit } from '../../'

import { Login } from '../../shared/Login'

import './Admin.scss'
import store from '../../../store'
import axios from 'axios'
import { AddStudentCourse } from '../AddStudentCourse'

const toggleModal = k => store.commit('toggleModal', k)

@Component({
  template: require('./Admin.html'),
  name: 'Admin',
  directives: { focus: focus },
  components: {
    AddBusiness,
    AddCard,
    AddCourse,
    AddStudent,
    AddStudentCourse,
    AddUnit,
    Breadcrumbs,
    Course,
    LearningCard,
    CourseMenu,
    Login,
    Toast,
    RemoveCard,
    RemoveCourse,
    RemoveVideo,
    RemoveStudent,
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

  @Getter currentCourse
  @Getter registeredStudents
  @Getter pendingStudents

  @State courses
  @State businesses
  @State authed
  @State user
  @State modals
  @State breadcrumbs
  @State route
  @State activeCard
  @State adminName
  @State sidebarOpen

  loaded = false

  @Watch('sidebarOpen')
  watchSidebarOpen(newVal, oldVal) {
    if (newVal) {
      document.addEventListener('click', this.toggleSidebar)
    } else {
      document.removeEventListener('click', this.toggleSidebar)
    }
  }

  // TODO: Bad Jase only looking at courses
  // How about I return a promise on the setAdmin action below
  @Watch('courses')
  watchCourses(newVal, oldVal) {
    if (newVal) {
      this.loaded = true
    }
  }

  get view() {
    return this.$route.name
  }

  get totalStudents() {
    return this.registeredStudents.length + this.pendingStudents.length
  }

  get courseMenu() {
    if (this.courses) {
      const menu = this.courses.map((course, index) => {
        const data = {
          text: course.name,
          link: '/c/' + course.id,
          total: course.units ? course.units.length : 0,
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
          total: business.students ? business.students.length : 0,
        }
        return data
      })
      return menu
    }
  }

  removeStudent() {
    store.commit('set', {
      key: 'removeStudentId',
      value: this.$route.params.studentId
    })
    this.toggleModal('removeStudent')
  }

  removeCourse() {
    store.commit('set', {
      key: 'removeCourseId',
      value: this.$route.params.courseId
    })
    this.toggleModal('removeCourse')
  }

  removeCard() {
    store.commit('set', {
      key: 'removeCardId',
      value: this.route.params.cardId
    })
    this.toggleModal('removeCard')
  }

  toggleSidebar() {
    store.commit('toggleSidebar')
  }

  switchApp() {
    this.$router.push({ name: 'landing' })
    window.location.reload()
  }

  mounted() {
    store.dispatch('getAdmin')
  }

}
