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
  @State student

  password = ''
  submitting: boolean = false

  submit() {
    if (this.submitting) {
      return
    }
    this.submitting = true
    store.dispatch('createCourse', {
      first_name: this.student.first_name,
      last_name: this.student.first_name,
    }).then(() => {
      this.$router.push({
        path: '/s/' + this.student.id,
      })
    })
  }
}
