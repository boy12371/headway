import { Component, Prop, Vue } from 'vue-property-decorator'

import { Modal } from '../Modal'
import { Card } from '../Card'

import './AddStudent.scss'

@Component({
  template: require('./AddStudent.html'),
  name: 'AddStudent',
  components: {
    Modal,
    Card
  }
})
export class AddStudent extends Vue {
}
