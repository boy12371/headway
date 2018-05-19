import { Component, Prop, Vue } from 'vue-property-decorator'

import { Header } from '../../shared/Header'

import './Student.scss'

@Component({
  template: require('./Student.html'),
  name: 'Student',
  components: {
    Header
  }
})

export class Student extends Vue {
}
