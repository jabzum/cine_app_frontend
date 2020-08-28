<template>
  <v-card>
    <v-card-title class="primary white--text">
      Catelera
    </v-card-title>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <SelectFecha @input="getFunciones" />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="orden"
            label="Ordenar por..."
            :items="opciones"
            item-value="value"
            item-text="label"
            @change="sortFunciones()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="item in funciones" :key="item.id" cols="12" md="6">
          <v-card>
            <div class="d-flex justify-space-between">
              <img :src="item.poster" width="25%" height="auto" />
              <div class="pa-6" style="width: 60%">
                <p class="body-1 my-1"><strong>{{ item.pelicula.nombre }}</strong></p>
                <p class="body-1 my-1"><strong>Hora: </strong>{{ item.hora }}</p>
                <p class="body-1 my-1"><strong>Sala: </strong>{{ item.sala.nombre }}</p>
                <p class="body-1 my-1"><strong>Precio: </strong>Q{{ item.precio }}</p>
                <v-btn
                  color="secondary"
                  @click="$router.push({ name: 'Reserva', params: { funcionID: item.id } })"
                >
                  Reservar
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-alert
        v-if="!funciones.length"
        dark
        text
        dense
        color="info"
        type="info"
      >
        No hay funciones disponibles
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from 'dayjs'
import SelectFecha from '@/components/SelectFecha'
export default {
  components: {
    SelectFecha
  },
  data () {
    return {
      funcionesData: [],
      funciones: [],
      orden: 0,
      opciones: [
        { value: 0, label: 'Ninguno' },
        { value: 1, label: 'Precio' },
        { value: 2, label: 'Taquilla' }
      ]
    }
  },
  beforeMount () {
    const now = dayjs()
    this.getFunciones({
      fecha: now.format('YYYY-MM-DD'),
      hora: now.format('HH:mm:00.00')
    })
  },
  methods: {
    async getFunciones (date) {
      const { data } = await this.$api.get(`/funcions?fecha_eq=${date.fecha}&hora_inicio_gte=${date.hora}&_sort=hora_inicio:ASC`)
      this.funcionesData = data.map(i => ({
        ...i,
        poster: `${process.env.VUE_APP_IMG}/w500${i.pelicula.data.poster_path}`,
        hora: dayjs(`${i.fecha}T${i.hora_inicio}`).format('HH:mm')
      }))
      this.funciones = [...this.funcionesData]
    },
    sortFunciones () {
      if (this.orden === 0) {
        this.funciones = this.funcionesData
      } else if (this.orden === 1) {
        this.sortByPrecio()
      } else {
        this.sortByTaquilla()
      }
    },
    sortByPrecio () {
      this.funciones = [...this.funcionesData].sort((curr, next) => {
        if (curr.precio < next.precio) {
          return -1
        }
        if (curr.precio > next.precio) {
          return 1
        }
        return 0
      })
    },
    sortByTaquilla () {
      this.funciones = [...this.funcionesData].sort((curr, next) => {
        if (curr.pelicula.taquilla > next.pelicula.taquilla) {
          return -1
        }
        if (curr.pelicula.taquilla < next.pelicula.taquilla) {
          return 1
        }
        return 0
      })
    }
  }
}
</script>
