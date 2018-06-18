import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService } from '../../../services'
const courseService = new CourseService()

import './AddCourse.scss'
import store from '../../../store'
import axios from 'axios'

@Component({
  template: require('./AddCourse.html'),
  name: 'AddCourse',
  components: {
  }
})

export class AddCourse extends Vue {
  @State businesses
  @State modals

  name = ''
  businessIds = []
  submitting: boolean = false

  submit() {
    if (this.submitting) {
      return
    }
    this.submitting = true
    store.dispatch('createCourse', {
      name: this.name,
      businessIds: this.businessIds
    }).then(course => {
      this.$router.push({
        path: '/c/' + course.id,
      })
    }).then(d => {
      this.name = ''
      this.submitting = false
      this.$emit('close')
    })
  }
}
