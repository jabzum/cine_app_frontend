<template>
  <v-card>
    <v-card-title class="white--text primary">
      Cartelera
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.id"
          cols="6"
          md="4"
          lg="3"
        >
          <v-img :src="item.poster">
            <div class="d-flex flex-column-reverse align-start fill-height">
              <div class="movie-title white--text text-center">
                <router-link
                  :to="{ name: 'Pelicula', params: { pelicula: item }}"
                  class="text-decoration-none white--text"
                >
                  {{ item.nombre }}
                </router-link>
              </div>
            </div>
          </v-img>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
.movie-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 100%;
  padding: 5px;
  background: rgba(0, 0, 0, 0.74);
}
</style>
