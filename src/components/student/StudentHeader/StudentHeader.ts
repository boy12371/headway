import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './StudentHeader.scss'

import store from '../../../store'

@Component({
  template: require('./StudentHeader.html'),
  name: 'StudentHeader',
  components: {}
})

export class StudentHeader extends Vue {
  @State activeStudentCourse
  @State activeStudentCard
  @State appView
  @State student

  get courseName() {
    return this.activeStudentCourse.name
  }

  get initials() {
    if (this.student.first_name) {
      return this.student.first_name.charAt(0) + this.student.last_name.charAt(0)
    }
  }

}
