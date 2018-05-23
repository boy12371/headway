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

  get courseName() {
    return this.activeStudentCourse.name
  }

}
