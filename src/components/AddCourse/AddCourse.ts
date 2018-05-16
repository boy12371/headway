import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { CourseService } from '../../services'
const courseService = new CourseService()

import { Modal } from '../Modal'
import { Card } from '../Card'

import './AddCourse.scss'
import store from '../../store'
import axios from 'axios'

@Component({
  template: require('./AddCourse.html'),
  name: 'AddCourse',
  components: {
    Card,
    Modal
  }
})

export class AddCourse extends Vue {
  @State businesses

  name = ''
  businessIds = []

  submit() {
    store.dispatch('createCourse', {
      name: this.name,
      businessIds: this.businessIds
    }).then(course => {
      this.$router.push({
        path: '/c/' + course.id,
      })
    })
    this.name = ''
    this.$emit('close')
  }
}
