import { Component, Prop, Vue } from 'vue-property-decorator'

import axios from 'axios'
import { BASE_URL } from '../../constants'

import { Card } from '../Card'
import { Logger } from '../../logger'
import { Modal } from '../Modal'

import './Login.scss'
import store from '../../store'

@Component({
  template: require('./Login.html'),
  name: 'Login',
  components: {
    // Card,
    Modal,
  }
})

export class Login extends Vue {
  email = 's'
  password = 'p'

  login(e) {
    e.preventDefault()
    axios.post(BASE_URL + '/admin/login', {
      email: this.email,
      password: this.password
    }).then(res => {
      const user = res.data
      if (res.status === 200 && user.id) {
        store.commit('setUser', user)
        this.$router.push('dashboard')
      }
    })
  }
}
