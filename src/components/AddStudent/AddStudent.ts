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
  @State businesses

  @Inject() studentService

  firstName = ''
  lastName = ''
  email = ''
  businessIds = []

  addStudent(e) {
    e.preventDefault()
    this.studentService.invite(this.firstName, this.email, this.businessIds).then(res => {
      if (res.status === 200) {
        store.commit('addStudent')
      }
    })
  }
}
