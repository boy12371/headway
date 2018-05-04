import { Component, Prop, Vue } from 'vue-property-decorator'

import './Header.scss'

@Component({
    template: require('./Header.html'),
    name: 'Header',
    components: {
    }
})

export class Header extends Vue {
  @Prop({ default: false }) authed: boolean
}
