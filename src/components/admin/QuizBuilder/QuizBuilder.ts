import { Component, Prop, Vue } from 'vue-property-decorator'

import { QuizBuilderQuestion } from './QuizBuilderQuestion'

import './QuizBuilder.scss'

@Component({
  template: require('./QuizBuilder.html'),
  name: 'QuizBuilder',
  components: {
    QuizBuilderQuestion
  }
})
export class QuizBuilder extends Vue {
  @Prop() questions: any[]

  addQuestion() {
    const question = {
      question: 'Untitled Question',
      answers: [
        {
          text: 'Option 1',
          correct: true
        }
      ]
    }
    this.questions.push(question)
  }

  addAnswer(i) {

    const totalAnswers = this.questions[i].answers.length + 1

    const answer = {
      text: 'Option ' + totalAnswers,
      correct: false
    }

    this.questions[i].answers.push(answer)
  }
}
