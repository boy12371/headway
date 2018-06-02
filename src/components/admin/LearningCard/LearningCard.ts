import { Component, Prop, Vue, Inject } from 'vue-property-decorator'

import './LearningCard.scss'
import { State } from 'vuex-class'

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
}
