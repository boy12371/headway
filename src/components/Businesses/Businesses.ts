import { Component, Prop, Vue } from 'vue-property-decorator'

import { Card } from '../Card'

import './Businesses.scss'

@Component({
  template: require('./Businesses.html'),
  name: 'Businesses',
  components: {
    Card
  }
})

export class Businesses extends Vue {
  @Prop() businesses: any[]
}
