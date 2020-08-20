import axios from 'axios'

const url = process.env.VUE_APP_API || 'http://localhost:1337'
const api = axios.create({ baseURL: url })

const services = {
  $api: {
    get () {
      return api
    },
    post () {
      return api
    },
    put () {
      return api
    },
    delete () {
      return api
    }
  }
}

export default (Vue) => {
  Object.defineProperties(Vue.prototype, services)
}
