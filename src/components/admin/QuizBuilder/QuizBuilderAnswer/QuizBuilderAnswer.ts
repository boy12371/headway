import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  template: require('./QuizBuilderAnswer.html'),
  name: 'QuizBuilderAnswer',
  components: {}
})
export class QuizBuilderAnswer extends Vue {
  @Prop() answer: string
  @Prop() correct: boolean
}
