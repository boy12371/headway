import { Component, Vue } from 'vue-property-decorator'

import { Card } from '../Card'
import { Modal } from '../Modal'
import { Header } from '../Header'

import './styleguide.scss'

@Component({
  template: require('./styleguide.html'),
  components: {
    Card,
    Modal,
    Header
  }
})

export class StyleguideComponent extends Vue {
  showModal =  false
}
