import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import './QuizBuilder.scss'
import { Answer, Question } from '../../../interfaces'
import store from '../../../store'

@Component({
  template: require('./QuizBuilder.html'),
  name: 'QuizBuilder',
  components: { }
})
export class QuizBuilder extends Vue {
  @Prop() data: any[]

  questions: Question[] = []

  @Watch('data', { deep: true })
  watchRoute(newVal, oldVal) {
    this.questions = this.data.slice()
  }

  addQuestion() {
    let question: Question = {
      question: '',
      answers: [
        {
          text: '',
          correct: true,
        }
      ]
    }
    this.questions.push(question)
    this.$nextTick(() => {
      document.getElementById('question-' + (this.questions.length - 1)).focus()
      document.getElementById('question-' + (this.questions.length - 1)).scrollIntoView(true)
    })
  }

  removeQuestion(qIndex) {
    // ...
  }

  addAnswer(qIndex) {
    let totalAnswers = this.questions[qIndex].answers.length + 1
    let answer: Answer = {
      text: '',
      correct: false
    }
    this.questions[qIndex].answers.push(answer)
    this.$nextTick(() => {
      document.getElementById('answer-' + qIndex + '-' + (this.questions[qIndex].answers.length - 1)).focus()
      document.getElementById('answer-' + qIndex + '-' + (this.questions[qIndex].answers.length - 1)).scrollIntoView(true)
    })
  }

  removeAnswer(qIndex, aIndex) {
    // ....
  }

  save() {
    store.dispatch('updateActiveCardQuiz', this.questions)
  }
}
