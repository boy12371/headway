import Vue from 'vue'
import { makeHot, reload } from './util/hot-reload'
import { createRouter } from './router'

import './sass/headway.scss'

import store from './store'

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app-main',
  router: createRouter(),
  store,
  components: {
  }
})

Vue.use(require('vue-moment'))
