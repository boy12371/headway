import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './StudentOnboard.scss'
import store from '../../../store'
import axios from 'axios'

@Component({
  template: require('./StudentOnboard.html'),
  name: 'StudentOnboard',
  components: {}
})

export class StudentOnboard extends Vue {
  first_name = ''
  last_name = ''
  password = ''
  passwordConfirm = ''
  submitting: boolean = false

  submit() {
    if (this.submitting) {
      return
    }
    this.submitting = true
    store.dispatch('editStudentDetails', {
      first_name: this.first_name,
      last_name: this.last_name,
      password: this.password,
    }).then(student => {
      if (student) {
        this.$router.push({
          name: 'studentHome',
        })
      }
    })
  }
}
