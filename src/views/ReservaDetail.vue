<template>
  <v-app>
    <div class="overflow-hidden">
      <v-app-bar
        app
        dark
        color="primary"
      >
        <!-- <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(63,81,181,.8), rgba(92,107,192,.9)"
          ></v-img>
        </template> -->
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>
          Cine APP <v-icon>fas fa-film</v-icon>
        </v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-card>
            <v-card-text>
              <v-row justify="center">
                <img :src="qrimg" height="250px" width="auto" />
              </v-row>
            </v-card-text>
          </v-card>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import qrcode from 'qrcode'
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
      qrimg: ''
    }
  },
  created () {
    this.getReserva()
    this.generateQRCode()
  },
  methods: {
    async getReserva () {
      const { data } = await this.$api.get(`/reservas?codigo_eq=${this.codigo}`)
      this.reserva = data.length > 0 ? data : null
    },
    async generateQRCode () {
      const url = `${process.env.VUE_APP_HOST}/#/reserva/${this.codigo}`
      this.qrimg = await qrcode.toDataURL(url, { width: 300 })
    }
  }
}
</script>
