import { Component, Prop, Vue } from 'vue-property-decorator'

import './Dashboard.scss'

@Component({
  template: require('./Dashboard.html'),
  name: 'Dashboard',
  components: {}
})
export class Dashboard extends Vue {
}
