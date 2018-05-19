import { Component, Prop, Watch, Vue, Inject } from 'vue-property-decorator'

import './Cards.scss'

@Component({
  template: require('./Cards.html'),
  name: 'Cards',
  components: {
  }
})

export class Cards extends Vue {
  @Inject() toggleModal
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
