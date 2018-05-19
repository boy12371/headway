import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './AddUnit.scss'
import store from '../../../store'

@Component({
  template: require('./AddUnit.html'),
  name: 'AddUnit',
  components: {
  }
})

export class AddUnit extends Vue {

  @Inject() unitService
  @Inject() toggleModal

  @State activeCourse

  name = ''
  submitting: boolean = false

  submit() {
    this.submitting = true
    store.dispatch('createUnit', {
      courseId: this.activeCourse.id,
      name: this.name
    }).then(d => {
      this.name = ''
      this.submitting = false
      this.toggleModal('unit')
    })
  }
}
