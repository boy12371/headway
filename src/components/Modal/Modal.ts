import { Component, Prop, Vue } from 'vue-property-decorator'

import './modal.scss'

@Component({
    template: require('./modal.html'),
    name: 'modal',
    components: {}
})
export class Modal extends Vue {
}
