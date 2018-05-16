import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { Modal } from '../Modal'
import { Card } from '../Card'

import './AddBusiness.scss'
import store from '../../store'

@Component({
  template: require('./AddBusiness.html'),
  name: 'AddBusiness',
  components: {
    Modal,
    Card
  }
})
export class AddBusiness extends Vue {
  @Inject() toggleModal

  @State courses

  name: string = ''
  courseIds = []

  submit() {
    store.dispatch('createBusiness', {
      name: this.name,
      courseIds: this.courseIds,
    })
    this.toggleModal('business')
  }
}
