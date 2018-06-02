import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './RemoveUnit.scss'
import store from '../../../store'

@Component({
  template: require('./RemoveUnit.html'),
  name: 'RemoveUnit',
  components: {}
})

export class RemoveUnit extends Vue {

  @State removeUnitId

  @Inject() toggleModal

  submit() {
    store.dispatch('removeUnit', this.removeUnitId)
    this.toggleModal('removeUnit')
  }
}
