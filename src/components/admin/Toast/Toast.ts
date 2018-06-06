import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import './Toast.scss'
import { State } from 'vuex-class'

@Component({
  template: require('./Toast.html'),
  name: 'Toast',
  components: {}
})

export class Toast extends Vue {
  @State notification

  visible = false

  toastClasses() {
    return {
      'Toast': true,
      'Toast--visible': this.visible,
      ['Toast--' + this.notification.type] : true
    }
  }

  @Watch('notification', { deep: true})
  watchNotification(newVal, oldVal) {
    if(!this.visible) {
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, 1000)
    }
  }
}
