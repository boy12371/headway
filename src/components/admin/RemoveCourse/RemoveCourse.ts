import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './RemoveCourse.scss'
import store from '../../../store'

@Component({
  template: require('./RemoveCourse.html'),
  name: 'RemoveCourse',
  components: {}
})

export class RemoveCourse extends Vue {

  @State removeCourseId

  @Inject() toggleModal

  submit() {
    store.dispatch('removeCourse', this.removeCourseId)
    this.toggleModal('removeCourse')
  }
}
