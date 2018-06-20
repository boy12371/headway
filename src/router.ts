import Vue from 'vue'
import VueRouter, { Location, Route, RouteConfig } from 'vue-router'
import { makeHot, reload } from './util/hot-reload'

const loginComponent = () => import('./components/shared/Login').then(({ Login }) => Login)
const landingComponent = () => import('./components/landing').then(({ LandingComponent }) => LandingComponent)
const adminComponent = () => import('./components/admin/Admin').then(({ Admin }) => Admin)
const studentAppComponent = () => import('./components/student/Student').then(({ Student }) => Student)
const studentOnboard = () => import('./components/student/StudentOnboard').then(({ StudentOnboard }) => StudentOnboard)
const styleguideComponent = () => import('./components/shared/styleguide').then(({ StyleguideComponent }) => StyleguideComponent)

Vue.use(VueRouter)

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    name: 'landing',
    component: landingComponent
  },
  {
    path: '/login/:role',
    name: 'login',
    component: loginComponent
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: adminComponent
  },
  {
    path: '/s/:studentId',
    name: 'studentProfile',
    component: adminComponent
  },
  {
    path: '/b/:businessId',
    name: 'businessProfile',
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
    name: 'studentHome',
    component: studentAppComponent
  },
  {
    path: '/invite/:token',
    name: 'studentInvite',
    component: studentOnboard
  },
  {
    path: '/app/:courseId',
    name: 'studentCourse',
    component: studentAppComponent
  },
  {
    path: '/app/:courseId/:unitId/:cardId',
    name: 'studentCard',
    component: studentAppComponent
  },
  {
    path: '/styleguide',
    component: styleguideComponent
  }
]

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() })
