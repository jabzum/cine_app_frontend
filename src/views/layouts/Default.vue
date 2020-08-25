<template>
  <v-app>
    <v-app-bar
      app
      dark
      clipped-left
      color="primary"
    >
      <!-- <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(63,81,181,.8), rgba(92,107,192,.9)"
        ></v-img>
      </template> -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        Cine APP <v-icon>fas fa-film</v-icon>
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer fixed v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense nav>
        <template v-for="(item, i) in menu">
          <v-list-item :key="i" :to="item.to" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
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
    return {
      drawer: false,
      menu: [
        {
          text: 'Inicio',
          icon: 'fas fa-home',
          to: { name: 'Home' }
        },
        {
          text: 'Mis reservaciones',
          icon: 'fas fa-ticket-alt',
          to: { name: 'Reservas' }
        },
        {
          text: 'Comidas y bebidas',
          icon: 'fas fa-utensils',
          to: { name: 'Combos' }
        }
      ]
    }
  }
}
</script>
