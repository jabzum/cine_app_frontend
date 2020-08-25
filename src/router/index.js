import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import('@/views/layouts/Default'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home')
      },
      {
        path: '/reservas',
        name: 'Reservas',
        component: () => import('@/views/ListReservas')
      },
      {
        path: '/reservas/:codigo',
        name: 'ReservaDetail',
        component: () => import('@/views/ReservaDetail'),
        props: true
      },
      {
        path: '/comida',
        name: 'Combos',
        component: () => import('@/views/ListCombos')
      }
    ]
  },
  {
    path: '/pelicula',
    component: () => import('@/views/layouts/Subview'),
    children: [
      {
        path: '',
        name: 'Pelicula',
        component: () => import('@/views/Pelicula'),
        props: (route) => ({
          ...route.params
        })
      }
    ]
  },
  {
    path: '/nueva-reserva',
    component: () => import('@/views/layouts/Subview'),
    children: [
      {
        path: '',
        name: 'Reserva',
        component: () => import('@/views/Reserva'),
        props: (route) => ({
          ...route.params
        })
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
