import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService } from '../../services'
const courseService = new CourseService()

import { UnitService } from '../../services'
const unitService = new UnitService()

import { Units } from '../Units'
import { Cards } from '../Cards'
import { LearningCard } from '../LearningCard'

import './Course.scss'
import store from '../../store'

@Component({
  template: require('./Course.html'),
  name: 'Course',
  components: {
    Units,
    Cards,
    LearningCard,
  }
})

export class Course extends Vue {

  @State activeCourse
  @State activeUnit

  @Prop() name: string
  @Prop({ default: () => [] }) units: any[]

  @Watch('$route', { deep: true})
  watchRoute(newVal, oldVal) {
    this.updateRoute(newVal)
  }

  get view() {
    return this.$route.name
  }

  updateRoute(route) {
    if (route.name === 'course') {
      courseService.get(route.params.courseId).then(course => {
        store.commit('setActiveCourse', course)
      })
    }
    if (route.name === 'unit') {
      unitService.get(route.params.unitId).then(unit => {
        store.commit('setActiveUnit', unit)
      })
    }
  }

  mounted() {
    this.updateRoute(this.$route)
  }

}
