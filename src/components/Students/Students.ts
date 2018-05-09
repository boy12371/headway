import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { StudentService } from '../../services'
const studentService = new StudentService()

import { Card } from '../Card'
import { ProgressBar } from '../ProgressBar'
import { Filters } from '../Filters'

import './Students.scss'
import store from '../../store'

@Component({
  template: require('./Students.html'),
  name: 'Students',
  components: {
    Card,
    ProgressBar,
    Filters,
  }
})

export class Students extends Vue {
  @State students
}
