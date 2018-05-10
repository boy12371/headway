import { Component, Prop, Vue } from 'vue-property-decorator'

import { QuizAnswer } from '../QuizAnswer'

@Component({
  template: require('./QuizQuestion.html'),
  name: 'QuizQuestion',
  components: {
    QuizAnswer
  }
})
export class QuizQuestion extends Vue {
  @Prop() question: string
  @Prop() answers: any[]
  @Prop() count: number
}
