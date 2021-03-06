import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './AddBusiness.scss'
import store from '../../../store'

@Component({
  template: require('./AddBusiness.html'),
  name: 'AddBusiness',
  components: {
  }
})
export class AddBusiness extends Vue {
  @Inject() toggleModal

  @State courses
  @State modals

  name: string = ''
  courseIds = []
  submitting: boolean = false

  submit() {
    if (this.submitting) {
      return
    }
    this.submitting = true
    store.dispatch('createBusiness', {
      name: this.name,
      courseIds: this.courseIds,
    }).then(d => {
      this.submitting = false
      this.name = ''
      this.courseIds = []
      this.toggleModal('addBusiness')
    })
  }
}
