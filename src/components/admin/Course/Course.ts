import { Component, Prop, Watch, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { UnitList } from '../UnitList'

import { dragscroll } from 'vue-dragscroll'

import './Course.scss'
import store from '../../../store'

@Component({
  template: require('./Course.html'),
  name: 'Course',
  components: {
    UnitList,
  },
  directives: {
    'dragscroll': dragscroll
  }
})

export class Course extends Vue {

  @Getter currentCourse

  @State breadcrumbs
  @State route

  @Inject() toggleModal

  @Watch('$route', { deep: true})
  watchRoute(newVal, oldVal) {
    this.updateRoute(newVal)
  }

  updateRoute(route) {
    store.dispatch('fetchCurrentCourse')
  }

  mounted() {
    this.updateRoute(this.$route)
  }

}
