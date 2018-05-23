import { Component, Prop, Watch, Vue, Provide } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { StudentHeader, StudentHome, StudentCourse, StudentCard } from '../../'

import './Student.scss'

import store from '../../../store'

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
  @State appView

  @Provide() toggleModal = toggleModal

  @Watch('$route', { deep: true})
  watchRoute(newVal, oldVal) {
    this.updateRoute(newVal)
  }

  updateRoute(route) {
    store.dispatch('setAppView', route.name )
  }

  mounted() {
    this.updateRoute(this.$route)
  }

}
