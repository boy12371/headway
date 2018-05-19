import { Component, Prop, Vue } from 'vue-property-decorator'

import './Quiz.scss'

@Component({
  template: require('./Quiz.html'),
  name: 'Quiz',
  components: {}
})

export class Quiz extends Vue {
  @Prop() questions: any[]

  currentQuestion = 1

  clicked = null

  submitAnswer(i) {
    this.clicked = i
    setTimeout(() => {
      if (this.currentQuestion === this.questions.length) {
        this.currentQuestion = 1
        this.clicked = null
        this.$emit('finish')
      } else {
        this.currentQuestion++
        this.clicked = null
      }
    }, 1000)
  }
}
