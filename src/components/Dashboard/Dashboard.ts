import { Component, Prop, Vue } from 'vue-property-decorator'

import { Header } from '../Header'
import { Onboard } from '../Onboard'
import { AddCourse } from '../AddCourse'
import { AddStudent } from '../AddStudent'

import './Dashboard.scss'

@Component({
  template: require('./Dashboard.html'),
  name: 'Dashboard',
  components: {
    Header,
    Onboard,
    AddCourse,
    AddStudent
  }
})
export class Dashboard extends Vue {
  showCourseModal = false
  showStudentModal = false
  students = []
}
