import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { ProgressBar } from '../../shared/ProgressBar'
import { Breadcrumbs } from '../Breadcrumbs'

import './StudentProfile.scss'
import '../Filters/Filters.scss'
import store from '../../../store'

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
  @State courses

  @Inject() toggleModal

  loaded = false

  @Watch('activeStudentProfile', { deep: true})
  watchStudentProfile(newVal, oldVal) {
    if (newVal) {
      this.loaded = true
    }
  }

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

  confirmRemoveBusiness(businessId) {
    store.commit('setDeleteStudentBusinessId', businessId)
    this.toggleModal('removeStudentBusiness')
  }

}
