import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './StudentHeader.scss'

@Component({
  template: require('./StudentHeader.html'),
  name: 'StudentHeader',
  components: {}
})

export class StudentHeader extends Vue {
}
