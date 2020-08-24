import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/pelicula',
    name: 'Pelicula',
    component: () => import('@/views/Pelicula'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/reserva',
    name: 'Reserva',
    component: () => import('@/views/Reserva'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/reserva/:codigo',
    name: 'ReservaDetail',
    component: () => import('@/views/ReservaDetail'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
