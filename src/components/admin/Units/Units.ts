import { Component, Prop, Watch, Vue, Inject } from 'vue-property-decorator'

import './Units.scss'

import store from '../../../store'

@Component({
  template: require('./Units.html'),
  name: 'Units',
  components: {}
})

export class Units extends Vue {
  @Inject() toggleModal

  @Prop({ default: () => [] }) units: any[]

  // Set the view name
  get courseId() {
    return this.$route.params.courseId
  }

  removeCourse() {
    store.commit('set', {
      key: 'removeCourseId',
      value: this.$route.params.courseId
    })
    this.toggleModal('removeCourse')
  }
}
