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

  addStudent(e) {
    e.preventDefault()
    courseService.create(this.name, this.businessIds).then(res => {
      if (res.status === 200) {
        store.commit('addStudent')
      }
    })
  }
}
