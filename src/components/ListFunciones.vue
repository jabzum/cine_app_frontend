<template>
  <div>
    <v-list>
      <v-list-item
        v-for="(item, index) in funciones" :key="index"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ item[0].pelicula.nombre }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip
              v-for="(funcion, i) in item"
              :key="i"
              color="secondary"
              class="mr-1"
            >
              {{ funcion.hora_inicio }}
            </v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-alert
      v-if="!items.length"
      dark
      text
      dense
      color="info"
      type="info"
    >
      No hay funciones disponibles
    </v-alert>
  </div>
</template>

<script>
import { groupBy } from '@/utils/arrays'
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    funciones () {
      return groupBy(this.items, (i) => i.pelicula.id)
    }
  }
}
</script>
