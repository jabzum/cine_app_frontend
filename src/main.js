import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
import vuelidate from 'vuelidate'
import VueNumberInput from '@chenfengyuan/vue-number-input'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false
Vue.use(axios)
Vue.use(vuelidate)
Vue.use(VueNumberInput)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
