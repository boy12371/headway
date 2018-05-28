import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { ProgressBar } from '../../shared/ProgressBar'
import { Breadcrumbs } from '../Breadcrumbs'

import './StudentProfile.scss'
import '../Filters/Filters.scss'
import store from '../../../store'

const crumbs = () => [
  {
    label: 'Your students',
    link: '/dashboard'
  }
]

@Component({
  template: require('./StudentProfile.html'),
  name: 'StudentProfile',
  components: {
    ProgressBar,
    Breadcrumbs,
  }
})

export class StudentProfile extends Vue {
  @State breadcrumbs
  @State activeStudentProfile

  mounted() {
    const { params } = this.$route
    store.dispatch('getStudentProfile', parseInt(params.studentId))
  }

}
