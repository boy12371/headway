import { Component, Prop, Vue } from 'vue-property-decorator'

import { QuizQuestion } from './QuizQuestion'

import './Quiz.scss'

@Component({
  template: require('./Quiz.html'),
  name: 'Quiz',
  components: {
    QuizQuestion
  }
})
export class Quiz extends Vue {
  questions = []

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
