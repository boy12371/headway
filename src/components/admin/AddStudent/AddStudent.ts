import { Component, Prop, Vue, Inject, Watch } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { BASE_URL } from '../../../constants'

import './AddStudent.scss'
import store from '../../../store'
import axios from 'axios'

@Component({
  template: require('./AddStudent.html'),
  name: 'AddStudent',
  components: {
  }
})

export class AddStudent extends Vue {
  @Inject() studentService
  @Inject() toggleModal

  @State businesses
  @State modals

  @State activeBusinessProfile
  @Watch('activeBusinessProfile', { deep: true })
  watchBusiness(newVal, oldVal) {
    if (newVal) {
      this.businessIds = [newVal.id]
    }
  }

  firstName = ''
  lastName = ''
  email = ''
  businessIds = []
  submitting: boolean = false

  submit() {
    if (this.submitting) {
      return
    }
    this.submitting = true
    store.dispatch('inviteStudent', {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      businessIds: this.businessIds,
    }).then(course => {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.businessIds = []
      this.submitting = false
      this.toggleModal('student')
    })
  }
}
