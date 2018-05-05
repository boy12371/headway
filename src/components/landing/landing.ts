import { Component, Vue } from 'vue-property-decorator'

import { CourseService } from '../../services'
const courseService = new CourseService()

import './landing.scss'
import store from '../../store'

@Component({
  template: require('./landing.html'),
  components: {
  }
})

export class LandingComponent extends Vue {
  mounted() {
    courseService.getAll().then(courses => {
      store.commit('setCourses', courses)
    })
  }
}
