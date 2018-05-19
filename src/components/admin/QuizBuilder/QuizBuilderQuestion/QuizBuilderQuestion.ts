import { Component, Prop, Vue } from 'vue-property-decorator'

import { QuizBuilderAnswer } from '../QuizBuilderAnswer'

@Component({
  template: require('./QuizBuilderQuestion.html'),
  name: 'QuizBuilderQuestion',
  components: {
    QuizBuilderAnswer
  }
})
export class QuizBuilderQuestion extends Vue {
  @Prop() question: string
  @Prop() answers: any[]
  @Prop() count: number
}
