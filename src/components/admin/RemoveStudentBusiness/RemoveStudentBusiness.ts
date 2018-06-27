import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './RemoveStudentBusiness.scss'
import store from '../../../store'

@Component({
  template: require('./RemoveStudentBusiness.html'),
  name: 'RemoveStudentBusiness',
  components: {}
})

export class RemoveStudentBusiness extends Vue {

  @State activeStudentProfile
  @State deleteStudentBusinessId

  @Inject() toggleModal

  submitting: boolean = false

  submit() {
    if (this.submitting) {
      return
    }
    this.submitting = true
    store.dispatch('removeStudentFromBusiness', {
      studentId: this.activeStudentProfile.id,
      businessId: this.deleteStudentBusinessId
    }).then(() => {
      this.submitting = false
      this.toggleModal('removeStudentBusiness')
    })
  }
}
