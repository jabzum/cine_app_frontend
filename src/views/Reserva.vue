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
          <v-stepper v-model="step" :vertical="false">
            <!-- =========================================================== -->
            <!-- Steps -->
            <!-- =========================================================== -->
            <v-stepper-header>
              <v-stepper-step
                :complete="step > 1"
                :step="1"
              >
                Cantidad de boletos
              </v-stepper-step>
              <v-divider />
              <v-stepper-step
                :complete="step > 2"
                :step="2"
              >
                Selecciona los asientos
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content :step="1">
                <v-card>
                  <v-card-text v-if="funcion">
                    <v-row justify="center">
                      <v-col cols="12" md="4">
                        <h1 class="h3 text-center">{{ funcion.sala.nombre }}</h1>
                        <h2 class="h5 text-center my-3">Precio por boleto Q{{ funcion.precio }}</h2>
                        <v-text-field
                          label="Cantidad de boletos"
                          v-model.number="boletos"
                          prepend-icon="fas fa-minus"
                          append-icon="fas fa-plus"
                          @click:prepend="boletos = boletos > 0 ? boletos - 1 : 0"
                          @click:append="boletos += 1"
                        />
                        <h3 class="h6 text-center my-3">Total Q{{ total }}</h3>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="secondary"
                      @click="step = 2"
                    >
                      Continuar
                      <v-icon dark right>fas fa-arrow-right</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>
              <v-stepper-content :step="2">
                <v-card>
                  <v-card-text>
                    <SelectorAsientos
                      v-if="funcion"
                      :filas="funcion.sala.filas"
                      :columnas="funcion.sala.columnas"
                      :boletos="boletos"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="secondary"
                      @click="step = 1"
                    >
                      <v-icon dark left>fas fa-arrow-left</v-icon>
                      Regresar
                    </v-btn>
                    <!-- <v-btn
                      color="secondary"
                      @click="step = 3"
                    >
                      Continuar
                    </v-btn> -->
                  </v-card-actions>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import SelectorAsientos from '@/components/SelectorAsientos'
export default {
  props: {
    funcionID: {
      type: String,
      default: null
    }
  },
  components: {
    SelectorAsientos
  },
  data () {
    return {
      funcion: null,
      boletos: 0,
      step: 1
    }
  },
  computed: {
    total () {
      if (this.funcion) {
        return this.boletos * this.funcion.precio
      }
      return 0
    }
  },
  beforeMount () {
    if (!this.funcionID) {
      this.$router.push({ name: 'Home' })
    }
    this.getFuncion()
  },
  methods: {
    async getFuncion () {
      const { data } = await this.$api.get(`/funcions/${this.funcionID}`)
      this.funcion = data
    }
  }
}
</script>
