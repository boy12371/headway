import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService } from '../../services'
const courseService = new CourseService()

import { StudentService } from '../../services'
const studentService = new StudentService()

import { Header } from '../Header'
import { Onboard } from '../Onboard'
import { AddCourse } from '../AddCourse'
import { AddStudent } from '../AddStudent'
import { Students } from '../Students'

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
  }
})
export class Dashboard extends Vue {
  showCourseModal = false
  showStudentModal = false

  @State courses
  @State students

  mounted() {
    courseService.getAll().then(courses => {
      store.commit('setCourses', courses)
    })

    studentService.getAll().then(students => {
      store.commit('setStudents', students)
    })
  }

}
