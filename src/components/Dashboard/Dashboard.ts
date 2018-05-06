import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService } from '../../services'
const courseService = new CourseService()

import { BusinessService } from '../../services'
const businessService = new BusinessService()


import { Header } from '../Header'
import { CourseMenu } from '../CourseMenu'
import { AddCourse } from '../AddCourse'
import { AddStudent } from '../AddStudent'
import { AddBusiness } from '../AddBusiness'
import { Students } from '../Students'
import { Businesses } from '../Businesses'

import './Dashboard.scss'
import store from '../../store'

@Component({
  template: require('./Dashboard.html'),
  name: 'Dashboard',
  components: {
    Header,
    AddCourse,
    AddStudent,
    AddBusiness,
    Students,
    CourseMenu,
  }
})
export class Dashboard extends Vue {
  showCourseModal = false
  showStudentModal = false
  showBusinessModal = false

  @State courses
  @State authed

  get courseMenu() {
    // TODO: Use Course ID for link
    const menu = this.courses.map((course, index) => ({
      text: course.name,
      link: '/dashboard/course/' + index,
      totalUnits: course.units.length,
    }))
    return menu
  }

  mounted() {
    businessService.getAll().then(businesss => {
      store.commit('setBusinesses', businesss)
    })

    courseService.getAll().then(courses => {
      store.commit('setCourses', courses)
    })
  }

}
