import { Component, Prop, Vue } from 'vue-property-decorator'

import './CourseMenu.scss'

@Component({
  template: require('./CourseMenu.html'),
  name: 'CourseMenu'
})
export class CourseMenu extends Vue {
  @Prop() items: any[]
  linkClass(active) {
    return {
      'CourseMenu__link': true,
      'CourseMenu__link--active': active
    }
  }
}
