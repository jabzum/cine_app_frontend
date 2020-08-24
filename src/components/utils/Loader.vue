<template>
  <v-dialog v-model="loading" persistent max-width="200px">
    <v-card color="secondary" dark>
      <v-card-text class="pt-5">
        <v-row justify="center">
          <v-progress-circular color="white" indeterminate />
        </v-row>
        <p class="subtitle-2 text-center my-1">Cargando...</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>
