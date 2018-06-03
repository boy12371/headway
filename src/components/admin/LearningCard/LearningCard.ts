import { Component, Prop, Vue, Inject } from 'vue-property-decorator'

import './LearningCard.scss'
import { State } from 'vuex-class'

import { UnitService } from '../../../services'
const unitService = new UnitService()

import { QuizBuilder } from '../QuizBuilder'
import { Quiz } from '../../student/Quiz'
import store from '../../../store'

@Component({
  template: require('./LearningCard.html'),
  name: 'LearningCard',
  components: {
    QuizBuilder,
    Quiz,
  }
})

export class LearningCard extends Vue {
  @Inject() toggleModal
  @Prop() card

  @Prop({ default: false}) quizVisible: boolean

  @State route
  @State activeCard

  get quiz() {
    if (this.card.quiz) {
      return JSON.parse(this.card.quiz)
    }
    return []
  }

  removeCard() {
    store.commit('set', {
      key: 'removeCardId',
      value: this.card.id
    })
    this.toggleModal('removeCard')
  }

  mounted() {
    unitService.get(this.route.params.unitId).then(unit => {
      const cards = unit.cards.filter(card => card.id === parseInt(this.route.params.cardId))
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
        console.warn('No card', this.route.params.cardId, 'in unit', unit.name)
      }
    })
  }
}
