import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService } from '../../services'
const courseService = new CourseService()

import { StudentService } from '../../services'
const studentService = new StudentService()

import { BusinessService } from '../../services'
const businessService = new BusinessService()

import { Header } from '../Header'
import { Onboard } from '../Onboard'
import { CourseMenu } from '../CourseMenu'
import { AddCourse } from '../AddCourse'
import { AddStudent } from '../AddStudent'
import { Students } from '../Students'
import { Businesses } from '../Businesses'

import './Dashboard.scss'
import store from '../../store'

@Component({
  template: require('./Dashboard.html'),
  name: 'Dashboard',
  components: {
    Header,
    Onboard,
    AddCourse,
    AddStudent,
    Students,
    CourseMenu,
    Businesses,
  }
})
export class Dashboard extends Vue {
  showCourseModal = false
  showStudentModal = false

  @State courses
  @State students
  @State businesses

  get courseMenu() {
    // TODO: Use Course ID for link
    const menu = this.courses.map((course, index) => ({
      text: course.name,
      link: '/dashboard/course/' + index,
      totalUnits: course.units.length,
    }))
    return menu
  }

  mounted() {
    courseService.getAll().then(courses => {
      store.commit('setCourses', courses)
    })

    studentService.getAll().then(students => {
      store.commit('setStudents', students)
    })

    businessService.getAll().then(businesses => {
      store.commit('setBusinesses', businesses)
    })
  }

}
