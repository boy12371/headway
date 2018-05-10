import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { BASE_URL } from '../../constants'

import { Modal } from '../Modal'
import { Card } from '../Card'

import './AddStudent.scss'
import store from '../../store'
import axios from 'axios'

const studentService = {
  invite: (name, email, businessId) => {
    return axios.post(BASE_URL + '/admin/students/invite', {
      email,
      businessId
    })
  }
}

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

  firstName = ''
  lastName = ''
  email = ''
  businessIds = []

  addStudent(e) {
    e.preventDefault()
    studentService.invite(this.firstName, this.email, this.businessIds).then(res => {
      if (res.status === 200) {
        store.commit('addStudent')
      }
    })
  }
}
