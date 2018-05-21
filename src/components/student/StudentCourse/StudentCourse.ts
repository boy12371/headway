import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './StudentCourse.scss'

@Component({
  template: require('./StudentCourse.html'),
  name: 'StudentCourse',
  components: {}
})

export class StudentCourse extends Vue {
  @State courses
  @State studentCourse

  // Set the view name
  get courseId() {
    return this.$route.params.courseId
  }
}
