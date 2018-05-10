import { Component, Prop, Watch, Vue, Inject } from 'vue-property-decorator'

import { Card } from '../Card'

import './Units.scss'

import store from '../../store'

@Component({
  template: require('./Units.html'),
  name: 'Units',
  components: {
    Card,
  }
})

export class Units extends Vue {
  @Inject() unitService

  @Prop({ default: () => [] }) units: any[]

  // Set the view name
  get courseId() {
    return this.$route.params.courseId
  }
}
