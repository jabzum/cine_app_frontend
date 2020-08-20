import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pelicula',
    name: 'Pelicula',
    component: () => import('@/views/Pelicula'),
    props: (route) => ({
      ...route.params
    })
  }
]

const router = new VueRouter({
  routes
})

export default router
