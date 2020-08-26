<template>
  <v-card>
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
        <v-divider />
        <v-stepper-step
          :complete="step > 3"
          :step="3"
        >
          Comidas y bebidas
        </v-stepper-step>
        <v-divider />
        <v-stepper-step
          :complete="step === 4"
          :step="4"
        >
          Confirma tu reservación
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
                  <div id="number-input">
                    <v-input
                      label="Cantidad de boletos"
                      :error-messages="errBoletos"
                    >
                      <number-input
                        v-model="reserva.boletos"
                        placeholder="Cantidad de boletos"
                        :min="1"
                        :max="disponibles"
                        center
                        controls
                      />
                    </v-input>
                  </div>
                  <v-text-field
                    label="Ingresa tu nombre"
                    v-model="reserva.nombre"
                    :error-messages="errNombre"
                  />
                  <h3 class="h6 text-center my-3">Total Q{{ total }}</h3>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="secondary"
                @click="selectAsientos()"
              >
                Continuar
                <v-icon dark right>fas fa-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <v-stepper-content :step="2">
          <SelectorAsientos
            v-if="funcion"
            :filas="funcion.sala.filas"
            :columnas="funcion.sala.columnas"
            :boletos="reserva.boletos"
            :reservas="reservas"
            @prev="step = 1"
            @next="setAsientos"
          />
        </v-stepper-content>
        <v-stepper-content :step="3">
          <SelectorCombos
            @prev="step = 2"
            @next="step = 4"
          />
        </v-stepper-content>
        <v-stepper-content :step="4">
          <ConfirmReserva
            :funcion="funcion"
            :boletos="reserva.boletos"
            @prev="step = 3"
            @save="saveReserva()"
          />
        </v-stepper-content>
      </v-stepper-items>
      <Loader :loading="loading" />
    </v-stepper>
  </v-card>
</template>

<script>
import shortid from 'shortid'
import { integer, minValue, maxValue, required } from 'vuelidate/lib/validators'
import SelectorAsientos from '@/components/reservas/SelectorAsientos'
import SelectorCombos from '@/components/reservas/SelectorCombos'
import ConfirmReserva from '@/components/reservas/ConfirmReserva'
import Loader from '@/components/utils/Loader'
export default {
  components: {
    SelectorAsientos,
    SelectorCombos,
    ConfirmReserva,
    Loader
  },
  props: {
    funcionID: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      funcion: null,
      reserva: {
        boletos: 0,
        nombre: ''
      },
      asientosSelected: [],
      step: 1,
      reservas: [],
      disponibles: 0,
      loading: false
    }
  },
  computed: {
    total () {
      if (this.funcion) {
        return this.reserva.boletos * this.funcion.precio
      }
      return 0
    },
    errBoletos () {
      const errs = []
      if (!this.$v.reserva.boletos.$dirty) return []
      !this.$v.reserva.boletos.integer && errs.push('Ingresa un numero')
      !this.$v.reserva.boletos.required && errs.push('Ingresa la cantidad de boletos')
      !this.$v.reserva.boletos.minValue && errs.push('Debes reservar la menos un boleto')
      !this.$v.reserva.boletos.maxValue && errs.push(`Puedes reservar un máximo de ${this.disponibles} boletos`)
      return errs
    },
    errNombre () {
      const errs = []
      if (!this.$v.reserva.nombre.$dirty) return []
      !this.$v.reserva.nombre.required && errs.push('El nombre es requerido')
      return errs
    }
  },
  async beforeMount () {
    if (!this.funcionID) {
      this.$router.push({ name: 'Home' })
      return
    }
    await this.getFuncion()
    this.getReservas()
  },
  methods: {
    async getFuncion () {
      const { data } = await this.$api.get(`/funcions/${this.funcionID}`)
      this.funcion = data
    },
    async getReservas () {
      const { data } = await this.$api.get(`/reservas?funcion=${this.funcionID}`)
      this.reservas = data
      const asientosTotal = this.funcion.sala.filas * this.funcion.sala.columnas
      this.disponibles = asientosTotal - this.reservas.reduce((acc, i) => acc + i.boletos.length, 0)
    },
    async saveReserva () {
      try {
        this.loading = true
        const codigo = shortid.generate()
        const reserva = {
          codigo,
          funcion: this.funcionID,
          nombre: this.reserva.nombre
        }
        const { data } = await this.$api.post('/reservas', reserva)
        const boletos = []
        for (const boleto of this.asientosSelected) {
          const boletoData = {
            px: boleto.px,
            py: boleto.py,
            reserva: data.id
          }
          boletos.push(this.$api.post('/boletos', boletoData))
        }
        await Promise.all(boletos)
        const reservas = JSON.parse(localStorage.getItem('reservas')) || []
        reservas.push(data.id)
        localStorage.setItem('reservas', JSON.stringify(reservas))
        this.$router.push({
          name: 'ReservaDetail',
          params: { codigo }
        })
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
        alert('Ha ocurrido un error')
      }
    },
    setAsientos (seleccionados) {
      this.asientosSelected = [...seleccionados]
      this.step = 3
    },
    selectAsientos () {
      this.$v.reserva.$touch()
      if (!this.$v.reserva.$invalid) {
        this.step = 2
      }
    }
  },
  validations () {
    return {
      reserva: {
        boletos: {
          integer,
          required,
          minValue: minValue(1),
          maxValue: maxValue(this.disponibles)
        },
        nombre: { required }
      }
    }
  }
}
</script>

<style>
#number-input .v-input__slot {
  display: unset;
}
</style>
