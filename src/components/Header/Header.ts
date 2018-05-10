import { Component, Prop, Vue } from 'vue-property-decorator'

import './Header.scss'
import { State } from 'vuex-class'

@Component({
    template: require('./Header.html'),
    name: 'Header',
    components: {
    }
})

export class Header extends Vue {
  @State user
  @Prop({ default: false }) authed: boolean
}
