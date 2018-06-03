import { Component, Prop, Watch, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService } from '../../../services'
const courseService = new CourseService()

import { UnitService } from '../../../services'
const unitService = new UnitService()

import { Units } from '../Units'
import { Cards } from '../Cards'
import { Breadcrumbs } from '../Breadcrumbs'
import { LearningCard } from '../LearningCard'

import './Course.scss'
import store from '../../../store'

@Component({
  template: require('./Course.html'),
  name: 'Course',
  components: {
    Units,
    Cards,
    Breadcrumbs,
  }
})

export class Course extends Vue {

  @Getter currentCourse

  @State activeCourse
  @State activeUnit
  @State activeCard
  @State breadcrumbs

  @Inject() toggleModal

  @Watch('$route', { deep: true})
  watchRoute(newVal, oldVal) {
    this.updateRoute(newVal)
  }

  updateRoute(route) {
    const { cardId, courseId, unitId } = route.params
    courseService.get(courseId).then(course => {
      store.commit('setBreadcrumbs', [
        {
          label: course.name,
          link: { name: 'course', params: { courseId: course.id } }
        }
      ])
      store.commit('setActiveCourse', course)
    })
  }

  mounted() {
    this.updateRoute(this.$route)
  }

}
