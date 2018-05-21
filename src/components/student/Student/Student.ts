import { Component, Prop, Watch, Vue, Provide } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { StudentHeader, StudentHome, StudentCourse, StudentCard } from '../../'

import './Student.scss'

import store from '../../../store'
import axios from 'axios'

const toggleModal = k => store.commit('toggleModal', k)

@Component({
  template: require('./Student.html'),
  name: 'Student',
  components: {
    StudentHeader,
    StudentHome,
    StudentCourse,
    StudentCard,
  }
})

export class Student extends Vue {

  @State courses

  @Provide() toggleModal = toggleModal

  @Watch('$route', { deep: true})
  watchRoute(newVal, oldVal) {
    this.updateRoute(newVal)
  }

  get appView() {
    return this.$route.name
  }

  updateRoute(route) {
    const { cardId, courseId, unitId } = route.params
    if (route.name === 'studentHome') {
      store.dispatch('getStudent')
    }
    if (route.name === 'studentCourse') {
      store.dispatch('getStudentCourse', courseId)
    }
  }

  mounted() {
    this.updateRoute(this.$route)
  }

}
