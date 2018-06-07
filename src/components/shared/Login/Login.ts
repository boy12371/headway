import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import axios from 'axios'
import { BASE_URL } from '../../../constants'

import { Card } from '../Card'
import { Logger } from '../../../logger'
import { Modal } from '../Modal'

import './Login.scss'
import store from '../../../store'

@Component({
  template: require('./Login.html'),
  name: 'Login',
  components: {
    // Card,
    Modal,
  }
})

export class Login extends Vue {

  email = ''
  password = ''


  @State route

  login(e) {
    e.preventDefault()
    axios.post(BASE_URL + '/login/' + this.route.params.role, {
      email: this.email,
      password: this.password
    }).then(res => {
      const user = res.data
      if (res.status === 200 && user.id) {
        store.commit('setUser', user)
        if (this.route.params.role === 'admin') {
          this.$router.push({ name: 'dashboard' })
        } else if (this.route.params.role === 'student') {
          this.$router.push({ name: 'studentHome' })
        }
      }
    })
  }

  mounted() {
    // Bad code only written to help Marc with logging in
    if (this.route.params.role === 'admin') {
      this.email = 's'
      this.password = 'p'
    } else if (this.route.params.role === 'student') {
      this.email = 'me@simonlang.org'
      this.password = 'password'
    }
  }

}
