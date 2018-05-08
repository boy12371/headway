import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { Units } from '../Units'

import './Course.scss'
import store from '../../store'

@Component({
  template: require('./Course.html'),
  name: 'Course',
  components: {
    Units,
  }
})

export class Course extends Vue {

  @Prop() name: string
  @Prop() units: any[]

}
