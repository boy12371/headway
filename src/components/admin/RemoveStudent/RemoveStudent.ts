import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './RemoveStudent.scss'
import store from '../../../store'

@Component({
  template: require('./RemoveStudent.html'),
  name: 'RemoveStudent',
  components: {}
})

export class RemoveStudent extends Vue {

  @State removeStudentId

  @Inject() toggleModal

  submit() {
    store.dispatch('removeStudent', this.removeStudentId)
    this.toggleModal('removeStudent')
    this.$router.push({ name: 'dashboard' })
  }
}
