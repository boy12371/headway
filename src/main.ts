import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import { makeHot, reload } from './util/hot-reload'
import { createRouter } from './router'

import './sass/headway.scss'
import './sass/fa/fontawesome.scss'
import './sass/fa/fa-light.scss'
import './sass/fa/fa-solid.scss'
import './components/shared/Tabs/Tabs.scss'

// Sync Router and Store
import store from './store'
const router = createRouter()
sync(store, router)

// Global Components
import { Modal } from './components/shared/Modal'
import { Card } from './components/shared/Card'
import { Header } from './components/shared/Header'
import { Tabs, Tab } from 'vue-tabs-component'
import vue2Dropzone from 'vue2-dropzone'
import wysiwyg from 'vue-wysiwyg'
import { focus } from 'vue-focus'
Vue.use(wysiwyg, {
  // image: {
  //   uploadURL: '/admin/upload',
  //   dropzoneOptions: {}
  // },
})
// Vue.component('vueDropzone', vue2Dropzone)
Vue.component('Card', Card)
Vue.component('Modal', Modal)
Vue.component('Header', Header)
Vue.component('Tabs', Tabs)
Vue.component('Tab', Tab)
Vue.directive('focus', focus)

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app-main',
  router,
  store,
})

Vue.use(require('vue-moment'))
