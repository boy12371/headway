import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
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

  @Inject() toggleModal

  mounted() {
    const { params } = this.$route
    store.dispatch('getStudentProfile', parseInt(params.studentId))
  }

  removeStudentFromCourse(courseId) {
    const studentId: number = this.activeStudentProfile.id
    console.log({ studentId, courseId })
    store.dispatch('removeStudentFromCourse', { studentId, courseId })
  }

  confirmRemoveCourse(courseId) {
    store.commit('setDeleteStudentCourseId', courseId)
    this.toggleModal('removeStudentCourse')
  }

  removeStudentFromBusiness(businessId) {
    const studentId: number = this.activeStudentProfile.id
    console.log({ studentId, businessId })
    store.dispatch('removeStudentFromBusiness', { studentId, businessId })
  }

}
