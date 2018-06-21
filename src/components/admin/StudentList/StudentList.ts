import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { StudentService } from '../../../services'
const studentService = new StudentService()

import { StudentCard } from '../StudentCard'

import './StudentList.scss'
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
    StudentCard,
  }
})

export class StudentList extends Vue {

  @Getter registeredStudents
  @Getter pendingStudents
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
