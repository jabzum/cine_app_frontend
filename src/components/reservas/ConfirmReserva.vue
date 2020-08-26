<template>
  <v-card>
    <v-card-text v-if="funcion">
      <v-row justify="center">
        <v-col cols="12" md="6" lg="4">
          <v-card>
            <v-img
              :src="poster"
              height="200px"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title>{{ funcion.pelicula.nombre }}</v-card-title>
              <v-card-subtitle class="white--text h6">{{ funcion.sala.nombre }}</v-card-subtitle>
            </v-img>
            <v-card-text>
              <p class="subtitle-1 my-1"><strong>Boletos:</strong> {{ boletos }}</p>
              <p class="subtitle-1 my-1"><strong>Precio:</strong> Q{{ funcion.precio }}</p>
              <p class="subtitle-1 my-1"><strong>Subtotal boletos:</strong> Q{{ totalBoletos }}</p>
              <p class="subtitle-1 my-1"><strong>Subtotal comidas y bebidas:</strong> Q{{ totalCombos }}</p>
              <v-divider />
              <p class="subtitle-1 my-1 font-weight-bold text-right">Total: Q{{ totalBoletos + totalCombos }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="secondary"
        @click="$emit('prev')"
      >
        <v-icon dark left>fas fa-arrow-left</v-icon>
        Regresar
      </v-btn>
      <v-btn
        color="primary"
        @click="$emit('save')"
      >
        Confirmar
        <v-icon right>fas fa-check</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    funcion: {
      type: Object,
      default: () => null
    },
    boletos: {
      type: Number,
      default: () => 0
    },
    combos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    poster () {
      if (this.funcion) {
        return process.env.VUE_APP_IMG + '/w500' + this.funcion.pelicula.data.poster_path
      }
      return ''
    },
    totalBoletos () {
      if (this.funcion) {
        return this.boletos * this.funcion.precio
      }
      return 0
    },
    totalCombos () {
      return this.combos.reduce((acc, i) => acc + (i.cantidad * i.precio), 0)
    }
  }
}
</script>
