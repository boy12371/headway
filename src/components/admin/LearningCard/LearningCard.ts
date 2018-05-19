import { Component, Prop, Vue } from 'vue-property-decorator'

import './LearningCard.scss'
import { State } from 'vuex-class'

import { QuizBuilder } from '../QuizBuilder'
import { Quiz } from '../../student/Quiz'

@Component({
  template: require('./LearningCard.html'),
  name: 'LearningCard',
  components: {
    QuizBuilder,
    Quiz,
  }
})

export class LearningCard extends Vue {

  @Prop() card

  @Prop({ default: false}) quizVisible: boolean

  get quiz() {
    if (this.card.quiz) {
      return JSON.parse(this.card.quiz)
    }
    return []
  }

}
