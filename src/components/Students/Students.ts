import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { StudentService } from '../../services'
const studentService = new StudentService()

import { Card } from '../Card'
import { ProgressBar } from '../ProgressBar'
import { Breadcrumbs } from '../Breadcrumbs'

import './Students.scss'
import '../Filters/Filters.scss'
import store from '../../store'

const crumbs = () => [
  {
    label: 'Your students',
    link: '/dashboard'
  }
]

@Component({
  template: require('./Students.html'),
  name: 'Students',
  components: {
    Card,
    ProgressBar,
    Breadcrumbs,
  }
})

export class Students extends Vue {

  @State businesses
  @State courses
  @State dashboardView

  @Prop({ default: crumbs }) breadcrumbs: any[]

  setDashboardView(view) {
    store.commit('setDashboardView', view)
  }
}
