import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { StudentService } from '../../../services'
const studentService = new StudentService()

import { ProgressBar } from '../../shared/ProgressBar'
import { Breadcrumbs } from '../Breadcrumbs'

import './StudentList.scss'
import '../Filters/Filters.scss'
import store from '../../../store'

const crumbs = () => [
  {
    label: 'Your students',
    link: '/dashboard'
  }
]

@Component({
  template: require('./StudentList.html'),
  name: 'StudentList',
  components: {
    ProgressBar,
    Breadcrumbs,
  }
})

export class StudentList extends Vue {

  @State businesses
  @State courses
  @State studentListFilter

  @Prop({ default: crumbs }) breadcrumbs: any[]

  mounted() {
    store.commit('setBreadcrumbs', [
      {
        label: 'Your students',
        link: { name: 'dashboard' }
      }
    ])
  }
}
