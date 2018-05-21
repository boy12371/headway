import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './StudentCard.scss'

@Component({
  template: require('./StudentCard.html'),
  name: 'StudentCard',
  components: {}
})

export class StudentCard extends Vue {
}
