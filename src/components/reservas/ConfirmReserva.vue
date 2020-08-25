<template>
  <v-card>
    <v-card-text v-if="funcion">
      <div class="d-flex flex-column align-center">
        <v-img max-width="160px" :src="poster" />
        <h2 class="h2 text-center my-2">{{ funcion.pelicula.nombre }}</h2>
        <p class="subtitle-1 text-center my-0">{{ funcion.sala.nombre }}</p>
      </div>
      <v-row justify="center">
        <v-col cols="12" md="6" lg="4">
          <p class="subtitle-1 my-1">Cantidad de boletos: {{ boletos }}</p>
          <p class="subtitle-1 my-1">Precio por boleto: Q{{ funcion.precio }}</p>
          <v-divider />
          <p class="subtitle-1 font-weight-bold text-right">Total: Q{{ boletos * funcion.precio }}</p>
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
    }
  },
  computed: {
    poster () {
      if (this.funcion) {
        return process.env.VUE_APP_IMG + '/w500' + this.funcion.pelicula.data.poster_path
      }
      return ''
    }
  }
}
</script>
