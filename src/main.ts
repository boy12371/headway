import Vue from 'vue'
import { makeHot, reload } from './util/hot-reload'
import { createRouter } from './router'

import './sass/main.scss'

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app-main',
  router: createRouter(),
  components: {
  }
})
