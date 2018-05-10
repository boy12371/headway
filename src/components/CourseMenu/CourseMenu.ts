import { Component, Prop, Vue } from 'vue-property-decorator'

import './CourseMenu.scss'

import store from '../../store'

@Component({
  template: require('./CourseMenu.html'),
  name: 'CourseMenu'
})
export class CourseMenu extends Vue {
  @Prop() items: any[]

  toggleModal(k) {
    store.commit('toggleModal', k)
  }

  linkClass(active) {
    return {
      'CourseMenu__link': true,
      'CourseMenu__link--active': active
    }
  }
}
