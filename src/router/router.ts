import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = []

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
