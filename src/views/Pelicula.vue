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
        <v-btn text fab @click="$router.go(-1)">
          <v-icon>fas fa-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>
          Cine APP <v-icon>fas fa-film</v-icon>
        </v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <Sinopsis :pelicula="pelicula" />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Sinopsis from '@/components/Sinopsis'
export default {
  components: {
    Sinopsis
  },
  props: {
    pelicula: {
      type: Object,
      default: () => null
    }
  }
}
</script>
