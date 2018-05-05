import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

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
  @State courses

  mounted() {
    courseService.getAll().then(courses => {
      store.commit('setCourses', courses)
    })
  }
}
