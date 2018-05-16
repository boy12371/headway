import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { BASE_URL } from '../../constants'

import { Modal } from '../Modal'
import { Card } from '../Card'

import './AddStudent.scss'
import store from '../../store'
import axios from 'axios'

@Component({
  template: require('./AddStudent.html'),
  name: 'AddStudent',
  components: {
    Modal,
    Card
  }
})

export class AddStudent extends Vue {
  @Inject() studentService
  @Inject() toggleModal

  @State businesses

  firstName = ''
  lastName = ''
  email = ''
  businessIds = []

  submit() {
    store.dispatch('inviteStudent', {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      businessIds: this.businessIds,
    })

    // Reset UI
    this.toggleModal('student')
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.businessIds = []
  }
}
