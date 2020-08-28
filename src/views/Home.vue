<template>
  <v-row class="flex-wrap-reverse">
    <v-col cols="12" md="8">
      <ListPeliculas id="content" :items="peliculas" />
    </v-col>
    <v-col cols="12" md="4">
      <v-card>
        <v-card-title class="primary white--text">
          Funciones
        </v-card-title>
        <v-card-text>
          <SelectFecha @input="getFunciones" />
          <ListFunciones :items="funciones" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import dayjs from 'dayjs'
import ListPeliculas from '@/components/ListPeliculas'
import ListFunciones from '@/components/ListFunciones'
import SelectFecha from '@/components/SelectFecha'
export default {
  name: 'Home',
  components: {
    ListPeliculas,
    ListFunciones,
    SelectFecha
  },
  data () {
    return {
      peliculas: [],
      funciones: []
    }
  },
  beforeMount () {
    this.getCartelera()
    const now = dayjs()
    this.getFunciones({
      fecha: now.format('YYYY-MM-DD'),
      hora: now.format('HH:mm:00.00')
    })
  },
  methods: {
    async getCartelera () {
      const { data } = await this.$api.get('/peliculas?estado_eq=activo&_sort=nombre:ASC')
      const urlImg = process.env.VUE_APP_IMG
      this.peliculas = data.map(i => ({
        ...i,
        poster: `${urlImg}/w500${i.data.poster_path}`
      }))
    },
    async getFunciones (funcion) {
      const fecha = dayjs().format('YYYY-MM-DD')
      const { data } = await this.$api.get(`/funcions?fecha_eq=${funcion.fecha}&hora_inicio_gte=${funcion.hora}`)
      this.funciones = data.map(i => ({
        ...i,
        hora_inicio: dayjs(`${fecha}T${i.hora_inicio}`).format('HH:mm')
      }))
    }
  }
}
</script>
