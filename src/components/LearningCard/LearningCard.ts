import { Component, Prop, Vue } from 'vue-property-decorator'

import './LearningCard.scss'

@Component({
  template: require('./LearningCard.html'),
  name: 'LearningCard',
  components: {}
})

export class LearningCard extends Vue {
}
