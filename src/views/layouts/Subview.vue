<template>
  <v-app>
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
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
