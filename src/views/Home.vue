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
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Cine APP</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
              <Cartelera id="content" :items="peliculas" />
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
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import dayjs from 'dayjs'
import Cartelera from '@/components/Cartelera'
import ListFunciones from '@/components/ListFunciones'
import SelectFecha from '@/components/SelectFecha'
export default {
  name: 'Home',
  components: {
    Cartelera,
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
      const { data } = await this.$api.get('/peliculas?estado_eq=activo')
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
