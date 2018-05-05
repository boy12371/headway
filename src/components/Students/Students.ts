import { Component, Prop, Vue } from 'vue-property-decorator'

import { Card } from '../Card'
import { ProgressBar } from '../ProgressBar'

import './Students.scss'

@Component({
  template: require('./Students.html'),
  name: 'Students',
  components: {
    Card,
    ProgressBar
  }
})

export class Students extends Vue {
  @Prop() students: any[]
}
