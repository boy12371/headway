import Vue from 'vue'
import VueRouter, { Location, Route, RouteConfig } from 'vue-router'
import { makeHot, reload } from './util/hot-reload'

const landingComponent = () => import('./components/landing').then(({ LandingComponent }) => LandingComponent)
const styleguideComponent = () => import('./components/styleguide').then(({ StyleguideComponent }) => StyleguideComponent)

Vue.use(VueRouter)

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: landingComponent
  },
  {
    path: '/styleguide',
    component: styleguideComponent
  }
]

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() })
