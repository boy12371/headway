import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService } from '../../services'
const courseService = new CourseService()

import { Units } from '../Units'

import './Course.scss'
import store from '../../store'

@Component({
  template: require('./Course.html'),
  name: 'Course',
  components: {
    Units,
  }
})

export class Course extends Vue {

  @Prop() name: string
  @Prop({ default: () => [] }) units: any[]

  @Watch('$route', { deep: true})
  watchRoute(newVal, oldVal) {
    this.updateRoute(newVal)
  }

  updateRoute(route) {
    if (route.name === 'course') {
      console.log(route.params)
      courseService.get(route.params.name).then(course => {
        store.commit('setActiveCourse', course)
      })
    }
  }

  mounted() {

    this.updateRoute(this.$route)
    
  }

}
