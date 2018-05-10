import { Component, Prop, Vue } from 'vue-property-decorator'

import './Breadcrumbs.scss'

@Component({
  template: require('./Breadcrumbs.html'),
  name: 'Breadcrumbs',
  components: {}
})

export class Breadcrumbs extends Vue {
  @Prop() crumbs: any[]
}
