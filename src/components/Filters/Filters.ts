import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './Filters.scss'
import store from '../../store'

@Component({
  template: require('./Filters.html'),
  name: 'Filters',
  components: {
  }
})

export class Filters extends Vue {
  @State businesses
  @State courses
  @State dashboardView

  setDashboardView(view) {
    store.dispatch('setDashboardView', view)
  }
}


