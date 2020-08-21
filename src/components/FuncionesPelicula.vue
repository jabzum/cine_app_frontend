<template>
  <div>
    <v-chip
      v-for="item in items"
      :key="item.id"
      color="secondary"
      class="mr-1"
    >
      {{ item.sala.nombre }} {{ item.hora_inicio }}
    </v-chip>
    <v-alert
      v-if="items.length === 0"
      dark
      text
      dense
      color="info"
      type="info">
      No hay funciones disponibles
    </v-alert>
  </div>
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
