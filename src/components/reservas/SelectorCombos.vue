<template>
  <v-card>
    <v-card-text id="combos">
      <v-row>
        <v-col
          v-for="item in combos"
          :key="item.id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card>
            <v-img :src="item.imagen" height="120px" />
            <v-card-text>
              <h2 class="h2">{{ item.nombre }}</h2>
              <p class="subtitle-1 my-1"><strong>Precio: </strong>Q{{ item.precio }}</p>
              <p class="body-2">{{ item.descripcion }}</p>
              <v-row justify="center">
                <number-input
                  v-model="item.cantidad"
                  :min="0"
                  center
                  controls
                />
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <h3 class="h6 text-center my-2">Total Q{{ total }}</h3>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="secondary"
        @click="$emit('prev')"
      >
        <v-icon left>fas fa-arrow-left</v-icon>
        Regresar
      </v-btn>
      <v-btn
        color="secondary"
        @click="$emit('next')"
      >
        Continuar
        <v-icon right>fas fa-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      combos: []
    }
  },
  computed: {
    selected () {
      return this.combos.map(i => ({
        id: i.id,
        precio: i.precio,
        cantidad: i.cantidad
      }))
    },
    total () {
      return this.combos.reduce((acc, i) => acc + (i.cantidad * i.precio), 0)
    }
  },
  created () {
    this.getCombos()
  },
  methods: {
    async getCombos () {
      const { data } = await this.$api.get('/combos')
      this.combos = data.map(i => ({
        ...i,
        imagen: process.env.VUE_APP_API + i.imagen.url,
        cantidad: 0
      }))
    }
  }
}
</script>

<style>
#combos {
  max-height: 450px;
  overflow-y: scroll;
}
</style>
