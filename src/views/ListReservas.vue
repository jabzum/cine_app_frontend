<template>
  <v-card>
    <v-card-title class="primary white--text">
      Mis reservaciones
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="item in reservas"
          :key="item.id"
          cols="12"
          md="6"
        >
          <v-card>
            <div class="d-flex flex-wrap flex-md-nowrap">
              <img :src="item.qrcode" width="160px" height="160px" />
              <div class="ma-4">
                <h2 class="h2">{{ item.peliculaNombre }}</h2>
                <p class="subtitle-1 my-1"><strong>Fecha: </strong>{{ item.fecha }}</p>
                <p class="subtitle-1 my-1"><strong>Boletos: </strong>{{ item.boletosLabel }}</p>
                <p class="subtitle-1 my-1"><strong>Total: </strong>Q{{ item.total }}</p>
                <v-btn color="secondary" :to="{ name: 'ReservaDetail', params: { codigo: item.codigo } }">
                  Ver detalle
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-alert
        v-if="!reservas.length"
        dark
        text
        dense
        color="info"
        type="info"
      >
        No hay reservaciones registradas
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import qrcode from 'qrcode'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      reservas: []
    }
  },
  created () {
    this.getReservasPelicula()
  },
  methods: {
    async getReservas () {
      const listReservas = JSON.parse(localStorage.getItem('reservas')) || []
      const listRequests = []
      for (const reserva of listReservas) {
        listRequests.push(this.$api.get(`/reservas/${reserva}`))
      }
      const values = await Promise.all(listRequests)
      return values.map(i => i.data)
    },
    async getReservasPelicula () {
      const reservas = await this.getReservas()
      const peliculasID = reservas.map(i => i.funcion.pelicula)
      const peliculasSet = new Set(peliculasID)
      const peliculasRequests = []
      for (const item of peliculasSet) {
        peliculasRequests.push(this.$api.get(`/peliculas/${item}`))
      }
      const values = await Promise.all(peliculasRequests)
      const peliculasData = values.map(i => i.data)
      const reservasData = reservas.map(async i => {
        const pelicula = peliculasData.find(p => p.id === i.funcion.pelicula)
        const qrcode = await this.generateQRCode(i.codigo)
        return {
          ...i,
          qrcode,
          fecha: dayjs(`${i.funcion.fecha}T${i.funcion.hora_inicio}`).format('DD/MM/YYYY HH:mm'),
          boletosLabel: i.boletos.map(b => `${this.numberToLetter(b.py)}${b.px}`).join(', '),
          peliculaNombre: pelicula.nombre,
          peliculaPoster: `${process.env.VUE_APP_IMG}/w500/${pelicula.data.poster_path}`,
          total: i.funcion.precio * i.boletos.length
        }
      })
      this.reservas = await Promise.all(reservasData)
    },
    async generateQRCode (codigo) {
      const url = `${process.env.VUE_APP_HOST}/#/reservas/${codigo}`
      return await qrcode.toDataURL(url, { width: 250 })
    },
    numberToLetter (num) {
      return String.fromCharCode(65 + num)
    }
  }
}
</script>
