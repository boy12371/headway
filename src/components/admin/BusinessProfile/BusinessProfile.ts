import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { ProgressBar } from '../../shared/ProgressBar'
import { Breadcrumbs } from '../Breadcrumbs'

import './BusinessProfile.scss'
import '../Filters/Filters.scss'
import store from '../../../store'

const crumbs = () => [
  {
    label: 'Your students',
    link: '/dashboard'
  }
]

@Component({
  template: require('./BusinessProfile.html'),
  name: 'BusinessProfile',
  components: {
    ProgressBar,
    Breadcrumbs,
  }
})
export class BusinessProfile extends Vue {

  @State breadcrumbs
  @State activeBusinessProfile

  @Inject() toggleModal

  loaded = false

  @Watch('$route', { deep: true})
  watchRoute(newVal, oldVal) {
    this.updateRoute(newVal)
  }

  @Watch('activeBusinessProfile', { deep: true})
  watchBusinessProfile(newVal, oldVal) {
    if (newVal) {
      this.loaded = true
    }
  }

  updateRoute(route) {
    const { params } = route
    store.dispatch('getBusinessProfile', parseInt(params.businessId))
  }

  removeStudentFromCourse(courseId) {
    const studentId: number = this.activeBusinessProfile.id
    console.log({ studentId, courseId })
    store.dispatch('removeStudentFromCourse', { studentId, courseId })
  }

  confirmRemoveCourse(courseId) {
    store.commit('setDeleteStudentCourseId', courseId)
    this.toggleModal('removeStudentCourse')
  }

  removeStudentFromBusiness(businessId) {
    const studentId: number = this.activeBusinessProfile.id
    console.log({ studentId, businessId })
    store.dispatch('removeStudentFromBusiness', { studentId, businessId })
  }

  mounted() {
    this.updateRoute(this.$route)
  }

}
