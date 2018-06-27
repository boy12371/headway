import { Component, Prop, Vue, Inject } from 'vue-property-decorator'

import './AddStudentBusiness.scss'
import { State } from 'vuex-class'
import store from '../../../store'

@Component({
  template: require('./AddStudentBusiness.html'),
  name: 'AddStudentBusiness',
  components: {}
})

export class AddStudentBusiness extends Vue {
  @Inject() toggleModal

  @State businesses
  @State activeStudentProfile

  businessIds = []

  submitting: boolean = false

  submit() {
    if (this.submitting) {
      return
    }
    this.submitting = true
    store.dispatch('addStudentBusiness', {
      studentId: this.activeStudentProfile.id,
      businessIds: this.businessIds,
    }).then(course => {
      this.businessIds = []
      this.submitting = false
      this.toggleModal('addStudentBusiness')
    })
  }
}
