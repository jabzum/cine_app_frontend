<template>
  <v-card>
    <v-card-text>
      <v-row align="center" justify="space-around" class="my-4">
        <div>
          <v-icon color="primary" class="asientos-item">fas fa-couch</v-icon>
          Libre
        </div>
        <div>
          <v-icon color="secondary" class="asientos-item">fas fa-couch</v-icon>
          Seleccionado
        </div>
        <div>
          <v-icon color="accent" class="asientos-item">fas fa-couch</v-icon>
          No disponible
        </div>
      </v-row>
      <div class="pantalla-container">
        <div class="pantalla">
        </div>
      </div>
      <ul v-for="(fila, indexFila) in asientos" :key="indexFila" class="asientos-fila">
        <li class="asientos-letra">{{ numberToLetter(indexFila) }}</li>
        <li v-for="(asiento, indexAsiento) in fila" :key="indexAsiento" class="asientos-item">
          <v-icon
            :color="asiento.color"
            @click="setOcupado(asiento)"
          >fas fa-couch</v-icon>
        </li>
        <li class="asientos-letra">{{ numberToLetter(indexFila) }}</li>
      </ul>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="secondary"
        @click="$emit('prev')"
      >
        <v-icon left>fas fa-arrow-left</v-icon>
        Regresar
      </v-btn>
      <v-btn
        color="secondary"
        @click="validateNext()"
      >
        Continuar
        <v-icon right>fas fa-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    boletos: {
      type: Number,
      default: () => 1
    },
    filas: {
      type: Number,
      default: () => 1
    },
    columnas: {
      type: Number,
      default: () => 1
    },
    reservas: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      asientos: [],
      seleccionados: [],
      reservados: []
    }
  },
  beforeMount () {
    this.reservados = this.reservas.reduce((acc, i) => acc.concat(i.boletos), [])
    this.createAsientos()
  },
  methods: {
    createAsientos () {
      const items = []
      for (let y = 0; y < this.filas; y++) {
        const fila = []
        for (let x = 0; x < this.columnas; x++) {
          const isReservado = this.reservados.find(i => i.py === y && i.px === x)
          if (isReservado) {
            fila.push({
              px: x,
              py: y,
              estado: 'vendido',
              color: 'accent'
            })
            continue
          }
          fila.push({
            id: `${y}${x}`,
            px: x,
            py: y,
            estado: 'libre',
            color: 'primary'
          })
        }
        items.push(fila)
      }
      this.asientos = items
    },
    numberToLetter (num) {
      return String.fromCharCode(65 + num)
    },
    setOcupado (asiento) {
      if (this.seleccionados.length < this.boletos && asiento.estado === 'libre') {
        asiento.color = 'secondary'
        asiento.estado = 'reservado'
        this.seleccionados.push({ ...asiento })
      } else if (asiento.estado === 'reservado') {
        asiento.color = 'primary'
        asiento.estado = 'libre'
        this.seleccionados = this.seleccionados.filter(i => i.id !== asiento.id)
      }
    },
    validateNext () {
      if (this.seleccionados.length === this.boletos) {
        this.$emit('next', this.seleccionados)
      } else {
        alert(`Selecciona tus ${this.boletos} asientos`)
      }
    }
  }
}
</script>

<style>
.asientos-fila {
  padding: 0;
  margin: 1em 0;
  display: flex;
  justify-content: space-between;
}
.asientos-item {
  list-style: none;
  transform: rotate(180deg);
}
.asientos-letra {
  list-style: none;
}
.pantalla-container {
  display: flex;
  justify-content: center;
  position: relative;
  perspective: 146px;
}
.pantalla {
  transform: rotateX(-20deg) rotateY(-1deg);
  height: 20px;
  width: 80%;
  background: #3F51B5;
}
</style>
