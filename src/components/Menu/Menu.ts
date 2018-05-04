import { Component, Prop, Vue } from 'vue-property-decorator'

import './Menu.scss'

@Component({
  template: require('./Menu.html'),
  name: 'Menu'
})
export class Menu extends Vue {
  @Prop() items: any[]
  linkClass(active) {
    return {
      'Menu__link': true,
      'Menu__link--active': active
    }
  }
}
