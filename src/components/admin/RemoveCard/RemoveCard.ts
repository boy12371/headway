import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './RemoveCard.scss'
import store from '../../../store'

@Component({
  template: require('./RemoveCard.html'),
  name: 'RemoveCard',
  components: {}
})

export class RemoveCard extends Vue {

  @State removeCardId

  @Inject() toggleModal

  submit() {
    store.dispatch('removeCard', this.removeCardId)
    this.toggleModal('removeCard')
  }
}
