import { Component, Prop, Vue } from 'vue-property-decorator'

import store from '../../../store'

import './Quiz.scss'

@Component({
  template: require('./Quiz.html'),
  name: 'Quiz',
  components: {}
})

export class Quiz extends Vue {
  @Prop() questions: any[]
  @Prop() preview: boolean

  currentQuestion = 1

  clicked = null

  passed = true

  submitAnswer(qIndex, aIndex) {
    this.clicked = aIndex
    if (!this.questions[qIndex].answers[aIndex].correct) {
      this.passed = false
    }
    setTimeout(() => {
      if (this.currentQuestion === this.questions.length) {
        this.currentQuestion = 1
        this.clicked = null
        this.$emit('finish')
        if (!this.preview) {
          store.dispatch('submitStudentCard', this.passed)
        }
      } else {
        this.currentQuestion++
        this.clicked = null
      }
    }, 1000)
  }

}
