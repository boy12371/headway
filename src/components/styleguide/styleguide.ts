import { Component, Vue } from 'vue-property-decorator'

import { Card } from '../Card'
import { Modal } from '../Modal'
import { Header } from '../Header'
import { Menu } from '../Menu'
import { ProgressBar } from '../ProgressBar'
import { Quiz } from '../Quiz'

import './styleguide.scss'

@Component({
  template: require('./styleguide.html'),
  components: {
    Card,
    Modal,
    Header,
    Menu,
    ProgressBar,
    Quiz
  }
})

export class StyleguideComponent extends Vue {
  showModal =  false

  menuExample = [
    {
      text: 'Link one',
      link: '',
      active: true
    },
    {
      text: 'Link two',
      link: '',
      active: false
    },
    {
      text: 'Link three',
      link: '',
      active: false
    }
  ]

}
