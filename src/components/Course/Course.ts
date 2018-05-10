import { Component, Prop, Watch, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService } from '../../services'
const courseService = new CourseService()

import { UnitService } from '../../services'
const unitService = new UnitService()

import { Units } from '../Units'
import { Cards } from '../Cards'
import { Breadcrumbs } from '../Breadcrumbs'
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
    Breadcrumbs,
  }
})

export class Course extends Vue {

  @State activeCourse
  @State activeUnit
  @State activeCard
  @State breadcrumbs

  @Inject() toggleModal

  @Watch('$route', { deep: true})
  watchRoute(newVal, oldVal) {
    this.updateRoute(newVal)
  }

  get view() {
    return this.$route.name
  }

  updateRoute(route) {
    const { cardId, courseId, unitId } = route.params
    if (route.name === 'course') {
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
    if (route.name === 'unit') {
      unitService.get(unitId).then(unit => {
        store.commit('setBreadcrumbs', [
          {
            label: unit.course.name,
            link: { name: 'course', params: { courseId: unit.course.id } }
          },
          {
            label: unit.name,
            link: { name: 'unit', params: { courseId: unit.course.id, unitId: unit.id } }
          }
        ])
        store.commit('setActiveUnit', unit)
      })
    }
    if (route.name === 'card') {
      unitService.get(unitId).then(unit => {
        store.commit('setActiveUnit', unit)
        const cards = unit.cards.filter(card => card.id === parseInt(cardId))
        if (cards.length === 1) {
          const card = cards.pop()
          store.commit('setActiveCard', card)
          store.commit('setBreadcrumbs', [
            {
              label: unit.course.name,
              link: { name: 'course', params: { courseId: unit.course.id } }
            },
            {
              label: unit.name,
              link: { name: 'unit', params: { courseId: unit.course.id, unitId: unit.id } }
            },
            {
              label: this.activeCard.name,
              link: { name: 'card', params: { courseId: unit.course.id, unitId: unit.id, cardId: this.activeCard.id } }
            }
          ])
        } else {
          console.warn('No card', cardId, 'in unit', unit.name)
        }
      })
    }
  }

  mounted() {
    this.updateRoute(this.$route)
  }

}
