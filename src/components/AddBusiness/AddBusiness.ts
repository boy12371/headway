import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { Modal } from '../Modal'
import { Card } from '../Card'

import './AddBusiness.scss'

@Component({
  template: require('./AddBusiness.html'),
  name: 'AddBusiness',
  components: {
    Modal,
    Card
  }
})
export class AddBusiness extends Vue {
  @State courses
}
