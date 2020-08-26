<template>
  <v-card>
    <v-card-text v-if="reserva && pelicula && sala">
      <h1 class="h1 text-center">
        {{ pelicula.nombre }}
      </h1>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-row class="flex-wrap-reverse">
            <v-col cols="12" md="6">
              <v-img :src="poster"></v-img>
            </v-col>
            <v-col cols="12" md="6">
              <v-row justify="center">
                <img :src="qrimg" height="200px" width="auto" />
              </v-row>
              <p class="subtitle-1 my-1">
                <strong>Nombre: </strong>{{ reserva.nombre }}
              </p>
              <p class="subtitle-1 my-1">
                <strong>Fecha: </strong>{{ fecha }}
              </p>
              <p class="subtitle-1 my-1">
                <strong>Sala: </strong>{{ sala.nombre }}
              </p>
              <p class="subtitle-1 my-1">
                <strong>Boletos: </strong>{{ boletos }}
              </p>
              <p class="subtitle-1 my-1">
                <strong>Subtotal boletos: </strong>Q{{ total }}
              </p>
              <p class="subtitle-1 my-1">
                <strong>Subtotal comidas y bebidas: </strong>Q{{ totalCombos }}
              </p>
              <v-divider />
              <p class="subtitle-1 my-1 font-weight-bold text-right">
                Total: Q{{ total+ totalCombos }}
              </p>
              <v-list>
                <v-list-item
                  v-for="item in combos"
                  :key="item.id"
                  three-line
                >
                  <v-list-item-avatar>
                    <v-img :src="item.imagen" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.nombre }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Precio: {{ item.precio }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      Cantidad: {{ item.cantidad }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import qrcode from 'qrcode'
import dayjs from 'dayjs'
export default {
  props: {
    codigo: {
      type: String,
      default: () => null
    }
  },
  data () {
    return {
      reserva: null,
      pelicula: null,
      sala: null,
      qrimg: '',
      combos: []
    }
  },
  computed: {
    fecha () {
      if (this.reserva) {
        const fecha = `${this.reserva.funcion.fecha}T${this.reserva.funcion.hora_inicio}`
        return dayjs(fecha).format('DD/MM/YYYY HH:mm')
      }
      return ''
    },
    boletos () {
      if (this.reserva) {
        return this.reserva.boletos.map(i => `${this.numberToLetter(i.py)}${i.px}`).join(', ')
      }
      return ''
    },
    total () {
      if (this.reserva) {
        return this.reserva.funcion.precio * this.reserva.boletos.length
      }
      return 0
    },
    totalCombos () {
      if (this.reserva) {
        return this.reserva.reserva_combos.reduce((acc, i) => acc + (i.cantidad * i.precio), 0)
      }
      return 0
    },
    poster () {
      if (this.pelicula) {
        return `${process.env.VUE_APP_IMG}/w500/${this.pelicula.data.poster_path}`
      }
      return ''
    }
  },
  async created () {
    await this.getReserva()
    this.getPelicula()
    this.getSala()
    this.getCombos()
    this.generateQRCode()
  },
  methods: {
    async getReserva () {
      const { data } = await this.$api.get(`/reservas?codigo_eq=${this.codigo}`)
      this.reserva = data.length > 0 ? data[0] : null
    },
    async getPelicula () {
      const { data } = await this.$api.get(`/peliculas/${this.reserva.funcion.pelicula}`)
      this.pelicula = data
    },
    async getSala () {
      const { data } = await this.$api.get(`/salas/${this.reserva.funcion.sala}`)
      this.sala = data
    },
    async getCombos () {
      const requests = []
      for (const item of this.reserva.reserva_combos) {
        requests.push(this.$api.get(`/combos/${item.combo}`))
      }
      const responses = await Promise.all(requests)
      const combos = responses.map(i => i.data)
      this.combos = combos.map((item, index) => {
        return {
          ...item,
          imagen: process.env.VUE_APP_API + item.imagen.formats.small.url,
          cantidad: this.reserva.reserva_combos[index].cantidad,
          precio: this.reserva.reserva_combos[index].precio
        }
      })
    },
    async generateQRCode () {
      const url = `${process.env.VUE_APP_HOST}/#/reserva/${this.codigo}`
      this.qrimg = await qrcode.toDataURL(url, { width: 300 })
    },
    numberToLetter (num) {
      return String.fromCharCode(65 + num)
    }
  }
}
</script>
