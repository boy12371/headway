import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './RemoveVideo.scss'
import store from '../../../store'

@Component({
  template: require('./RemoveVideo.html'),
  name: 'RemoveVideo',
  components: {}
})

export class RemoveVideo extends Vue {

  @State removeVideoCardId

  @Inject() toggleModal

  submitting: boolean = false

  submit() {
    if (this.submitting) {
      return
    }
    this.submitting = true
    store.dispatch('removeCardVideo', this.removeVideoCardId)
    .then(() => {
      this.submitting = false
      this.toggleModal('removeVideo')
    })
  }
}
