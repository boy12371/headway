import { Component, Prop, Vue } from 'vue-property-decorator'

import './LearningCard.scss'
import { State } from 'vuex-class'

import { Quiz } from '../Quiz'
import { StudentQuiz } from '../StudentQuiz'

@Component({
  template: require('./LearningCard.html'),
  name: 'LearningCard',
  components: {
    Quiz,
    StudentQuiz,
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
