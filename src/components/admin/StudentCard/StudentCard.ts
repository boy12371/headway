import { Component, Prop, Vue } from 'vue-property-decorator'

import './StudentCard.scss'

@Component({
  template: require('./StudentCard.html'),
  name: 'StudentCard',
  components: {}
})

export class StudentCard extends Vue {
  @Prop() firstName: string
  @Prop() lastName: string
  @Prop() email: string
  @Prop() studentId: number
  @Prop() courses: any[]
}
