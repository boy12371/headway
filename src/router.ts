import Vue from 'vue'
import VueRouter, { Location, Route, RouteConfig } from 'vue-router'
import { makeHot, reload } from './util/hot-reload'

const loginComponent = () => import('./components/shared/Login').then(({ Login }) => Login)
const landingComponent = () => import('./components/landing').then(({ LandingComponent }) => LandingComponent)
const adminComponent = () => import('./components/admin/Admin').then(({ Admin }) => Admin)
const studentAppComponent = () => import('./components/student/Student').then(({ Student }) => Student)
const styleguideComponent = () => import('./components/shared/styleguide').then(({ StyleguideComponent }) => StyleguideComponent)

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
    component: adminComponent
  },
  {
    path: '/c/:courseId',
    name: 'course',
    component: adminComponent
  },
  {
    path: '/c/:courseId/:unitId',
    name: 'unit',
    component: adminComponent
  },
  {
    path: '/c/:courseId/:unitId/:cardId',
    name: 'card',
    component: adminComponent
  },
  {
    path: '/app',
    name: 'student',
    component: studentAppComponent
  },
  {
    path: '/styleguide',
    component: styleguideComponent
  }
]

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() })
