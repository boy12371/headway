import { Component, Prop, Watch, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import './Units.scss'

import { UnitList } from '../UnitList'

import store from '../../../store'

@Component({
  template: require('./Units.html'),
  name: 'Units',
  components: {
    UnitList
  }
})

export class Units extends Vue {
  @Inject() toggleModal
  @State route

  @Prop({ default: () => [] }) units: any[]

}
