import { Component, Prop, Vue } from 'vue-property-decorator'

import './Home.scss'

@Component({
  template: require('./Home.html'),
  name: 'Home',
  components: {}
})

export class Home extends Vue {
}
