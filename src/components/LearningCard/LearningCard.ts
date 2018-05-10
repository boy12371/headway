import { Component, Prop, Vue } from 'vue-property-decorator'

import './LearningCard.scss'
import { State } from 'vuex-class'
import { Quiz } from '../Quiz'

@Component({
  template: require('./LearningCard.html'),
  name: 'LearningCard',
  components: {
    Quiz,
  }
})

export class LearningCard extends Vue {

  @Prop() card

  get quiz() {
    if (this.card) {
      console.log(JSON.parse(this.card.quiz))
      return JSON.parse(this.card.quiz)
    }
    return []
  }

  // submit() {
  //   console.log(this.card)
  // }
}
