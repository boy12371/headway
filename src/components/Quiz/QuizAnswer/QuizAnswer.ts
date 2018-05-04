import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  template: require('./QuizAnswer.html'),
  name: 'QuizAnswer',
  components: {}
})
export class QuizAnswer extends Vue {
  @Prop() answer: string
  @Prop() correct: boolean
}
