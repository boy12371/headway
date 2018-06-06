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

  @Getter allStudents
  @State studentListFilter
  @State route

  @Prop({ default: crumbs }) breadcrumbs: any[]

  setStudentListFilter(view) {
    store.commit('setStudentListFilter', view)
  }

  mounted() {
    store.commit('setBreadcrumbs', [
      {
        label: 'Students'
      }
    ])
  }
}
