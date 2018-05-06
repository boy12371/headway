import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

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
  @State businesses
}
