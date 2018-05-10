
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { Modal } from '../Modal'
import { Card } from '../Card'

import './AddCard.scss'
import store from '../../store'
import axios from 'axios'

@Component({
  template: require('./AddCard.html'),
  name: 'AddCard',
  components: {
    Card,
    Modal
  }
})

export class AddCard extends Vue {

  @Inject() unitService

  name = ''

  submit() {
  }
}
