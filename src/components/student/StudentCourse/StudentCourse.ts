import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import store from '../../../store'

import './StudentCourse.scss'

@Component({
  template: require('./StudentCourse.html'),
  name: 'StudentCourse',
  components: {}
})

export class StudentCourse extends Vue {
  @State activeStudentCourse

  // Set the view name
  get courseId() {
    return this.$route.params.courseId
  }

  mounted() {
    store.dispatch('getStudentCourse', this.courseId)
  }
}
