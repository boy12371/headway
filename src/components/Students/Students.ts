import { Component, Prop, Vue } from 'vue-property-decorator'

import { Card } from '../Card'

import './Students.scss'

@Component({
  template: require('./Students.html'),
  name: 'Students',
  components: {
    Card
  }
})

export class Students extends Vue {
  @Prop() students: any[]
}
