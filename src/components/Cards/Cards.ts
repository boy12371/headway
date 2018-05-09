import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import { Card } from '../Card'

import './Cards.scss'

@Component({
  template: require('./Cards.html'),
  name: 'Cards',
  components: {
    Card,
  }
})

export class Cards extends Vue {
  @Prop() cards: any[]

  // Set the view name
  get courseId() {
    return this.$route.params.courseId
  }

  // Set the view name
  get unitId() {
    return this.$route.params.unitId
  }
}
