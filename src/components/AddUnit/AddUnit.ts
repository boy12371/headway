import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { Modal } from '../Modal'
import { Card } from '../Card'

import './AddUnit.scss'
import store from '../../store'
import axios from 'axios'

@Component({
  template: require('./AddUnit.html'),
  name: 'AddUnit',
  components: {
    Card,
    Modal
  }
})

export class AddUnit extends Vue {

  @Inject() unitService

  name = ''

  submit() {
    this.unitService.create(1, this.name).then(unit => {
      console.log('TODO: add unit to course in store')
      // store.commit('addUnit', unit)
    })
  }
}
