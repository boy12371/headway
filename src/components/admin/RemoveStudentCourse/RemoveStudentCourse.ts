import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './RemoveStudentCourse.scss'
import store from '../../../store'

@Component({
  template: require('./RemoveStudentCourse.html'),
  name: 'RemoveStudentCourse',
  components: {}
})

export class RemoveStudentCourse extends Vue {

  @State activeStudentProfile
  @State deleteStudentCourseId

  @Inject() toggleModal

  submitting: boolean = false

  submit() {
    if (this.submitting) {
      return
    }
    this.submitting = true
    store.dispatch('removeStudentFromCourse', {
      studentId: this.activeStudentProfile.id,
      courseId: this.deleteStudentCourseId
    }).then(() => {
      this.submitting = false
      this.toggleModal('removeStudentCourse')
    })
  }
}
