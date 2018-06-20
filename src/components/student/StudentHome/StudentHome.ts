import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { ProgressBar } from '../../shared/ProgressBar'

import store from '../../../store'

import './StudentHome.scss'

@Component({
  template: require('./StudentHome.html'),
  name: 'StudentHome',
  components: {
    ProgressBar
  }
})

export class StudentHome extends Vue {
  @State student
}
