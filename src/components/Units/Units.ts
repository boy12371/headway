import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import { Card } from '../Card'

import './Units.scss'

@Component({
  template: require('./Units.html'),
  name: 'Units',
  components: {
    Card,
  }
})

export class Units extends Vue {
  @Prop() units: any[]
}
