import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService } from '../../../services'
const courseService = new CourseService()

import './RemoveStudentCourse.scss'
import store from '../../../store'
import axios from 'axios'

@Component({
  template: require('./RemoveStudentCourse.html'),
  name: 'RemoveStudentCourse',
  components: {
  }
})

export class RemoveStudentCourse extends Vue {

  name = ''

}
