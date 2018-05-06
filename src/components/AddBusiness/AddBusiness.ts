import { Component, Prop, Vue } from 'vue-property-decorator'

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
}
