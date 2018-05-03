import { Component, Vue } from 'vue-property-decorator'

import { Card } from '../Card'
import { Modal } from '../Modal'

import './styleguide.scss'

@Component({
  template: require('./styleguide.html'),
  components: {
    Card,
    Modal
  }
})

export class StyleguideComponent extends Vue {
  showModal =  false
}
