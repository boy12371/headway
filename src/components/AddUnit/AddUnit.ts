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
  @Inject() toggleModal

  @State activeCourse

  name = ''

  submit() {
    store.dispatch('createUnit', {
      courseId: this.activeCourse.id,
      name: this.name
    })
    this.toggleModal('unit')
  }
}
