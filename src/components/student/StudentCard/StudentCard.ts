import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import store from '../../../store'

import { Quiz } from '../Quiz'

import './StudentCard.scss'

@Component({
  template: require('./StudentCard.html'),
  name: 'StudentCard',
  components: {
    Quiz
  }
})

export class StudentCard extends Vue {
  @State activeStudentCard

  quizVisible = false

  get parsedQuestions() {
    return this.activeStudentCard.quiz ? JSON.parse(this.activeStudentCard.quiz) : []
  }

  showQuiz() {
    this.quizVisible = true
  }

  hideQuiz() {
    this.quizVisible = false
  }

  mounted() {
    const { params } = this.$route
    store.dispatch('getStudentCard', {
      courseId: parseInt(params.courseId),
      unitId: parseInt(params.unitId),
      cardId: parseInt(params.cardId)
    })
  }
}
