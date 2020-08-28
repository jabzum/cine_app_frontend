<template>
  <v-card>
    <v-card-title class="primary white--text">
      Comidas y bebidas
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="item in combos"
          :key="item.id"
          cols="12"
          md="6"
          xl="4"
        >
          <v-card>
            <v-card-title>
              {{ item.nombre }}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-row justify="center">
                    <img :src="item.imagen" width="200px" />
                  </v-row>
                </v-col>
                <v-col cols="12" md="6">
                  <p class="body-2">{{ item.descripcion }}</p>
                  <p class="subtitle-1"><strong>Precio: </strong>Q{{ item.precio }}</p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      combos: []
    }
  },
  created () {
    this.getCombos()
  },
  methods: {
    async getCombos () {
      const { data } = await this.$api.get('/combos?_sort=nombre:ASC')
      this.combos = data.map(i => ({
        ...i,
        imagen: process.env.VUE_APP_API + i.imagen.formats.small.url
      }))
    }
  }
}
</script>
