import { Component, Prop, Vue } from 'vue-property-decorator'

import { Modal } from '../Modal'
import { Card } from '../Card'

import './AddCourse.scss'

@Component({
  template: require('./AddCourse.html'),
  name: 'AddCourse',
  components: {
    Card,
    Modal
  }
})

export class AddCourse extends Vue {
}
