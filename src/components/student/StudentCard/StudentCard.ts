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

  get parsedQuestions() {
    return this.activeStudentCard.quiz ? JSON.parse(this.activeStudentCard.quiz) : []
  }

  mounted() {
    const { params } = this.$route
    store.dispatch('getStudentCard', {
      courseId: parseInt(params.courseId),
      unitId: parseInt(params.unitId),
      cardId: parseInt(params.cardId)
    })
  }
}
