import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import store from '../../../store'

import { Quiz } from '../Quiz'

import './StudentCard.scss'

@Component({
  template: require('./StudentCard.html'),
  name: 'StudentCard',
  components: {
    Quiz
  }
})

export class StudentCard extends Vue {
  @State activeStudentCard

  get courseId() {
    return this.$route.params.courseId
  }

  get unitId() {
    return this.$route.params.unitId
  }

  get cardId() {
    return this.$route.params.cardId
  }

  get parsedQuestions() {
    return JSON.parse(this.activeStudentCard.quiz)
  }

  mounted() {
    const card = {
      courseId: this.courseId,
      unitId: this.unitId,
      cardId: this.cardId
    }
    store.dispatch('getStudentCard', card)
  }
}
