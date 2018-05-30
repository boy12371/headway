import { Component, Prop, Vue, Inject } from 'vue-property-decorator'

import './AddStudentCourse.scss'
import { State } from 'vuex-class'
import store from '../../../store'

@Component({
  template: require('./AddStudentCourse.html'),
  name: 'AddStudentCourse',
  components: {}
})

export class AddStudentCourse extends Vue {
  @Inject() toggleModal

  @State courses
  @State activeStudentProfile

  courseIds = []

  submit() {
    store.dispatch('addStudentCourse', {
      studentId: this.activeStudentProfile.id,
      courseIds: this.courseIds,
    })
    this.courseIds = []
    this.toggleModal('addStudentCourse')
  }
}
