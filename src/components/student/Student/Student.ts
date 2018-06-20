import { Component, Prop, Watch, Vue, Provide } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { StudentOnboard, StudentHeader, StudentHome, StudentCourse, StudentCard } from '../../'

import './Student.scss'

import store from '../../../store'

const toggleModal = k => store.commit('toggleModal', k)

@Component({
  template: require('./Student.html'),
  name: 'Student',
  components: {
    StudentOnboard,
    StudentHeader,
    StudentHome,
    StudentCourse,
    StudentCard,
  }
})

export class Student extends Vue {

  @State student
  @State courses
  @State appView

  @Provide() toggleModal = toggleModal

  @Watch('$route', { deep: true})
  watchRoute(newVal, oldVal) {
    this.updateRoute(newVal)
  }

  updateRoute(route) {
    store.dispatch('getStudent')
    store.dispatch('setAppView', route.name)
  }

  switchApp() {
    this.$router.push({ name: 'landing' })
    window.location.reload()
  }

  mounted() {
    this.updateRoute(this.$route)
  }

}
