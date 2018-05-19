import Vue from 'vue'
import VueRouter, { Location, Route, RouteConfig } from 'vue-router'
import { makeHot, reload } from './util/hot-reload'

const loginComponent = () => import('./components/Login').then(({ Login }) => Login)
const landingComponent = () => import('./components/landing').then(({ LandingComponent }) => LandingComponent)
const adminAppComponent = () => import('./components/AdminApp').then(({ AdminApp }) => AdminApp)
const styleguideComponent = () => import('./components/styleguide').then(({ StyleguideComponent }) => StyleguideComponent)

Vue.use(VueRouter)

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: landingComponent
  },
  {
    path: '/login',
    name: 'login',
    component: loginComponent
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: adminAppComponent
  },
  {
    path: '/c/:courseId',
    name: 'course',
    component: adminAppComponent
  },
  {
    path: '/c/:courseId/:unitId',
    name: 'unit',
    component: adminAppComponent
  },
  {
    path: '/c/:courseId/:unitId/:cardId',
    name: 'card',
    component: adminAppComponent
  },
  {
    path: '/styleguide',
    component: styleguideComponent
  }
]

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() })
