<template>
  <v-select
    v-model="selected"
    label="Selecciona la fecha"
    :items="fechas"
    item-text="label"
    item-value="index"
    @change="setFecha"
  />
</template>

<script>
import dayjs from 'dayjs'
import { numberMesToString } from '@/utils/fechas'
export default {
  data () {
    return {
      selected: 0
    }
  },
  computed: {
    fechas () {
      const items = []
      const today = dayjs()
      items.push({
        index: 0,
        label: `Hoy (${today.date()} ${numberMesToString(today.month())})`,
        date: today.format('YYYY-MM-DD'),
        hour: today.format('HH:mm:00.00')
      })
      const tomorrow = today.add(1, 'day').startOf('day')
      items.push({
        index: 1,
        label: `Mañana (${tomorrow.date()} ${numberMesToString(tomorrow.month())})`,
        date: tomorrow.format('YYYY-MM-DD'),
        hour: tomorrow.format('HH:mm:00.00')
      })
      for (let i = 1; i < 6; i++) {
        const dateItem = tomorrow.add(i, 'day')
        items.push({
          index: i + 1,
          label: `${dateItem.date()} ${numberMesToString(dateItem.month())}`,
          date: dateItem.format('YYYY-MM-DD'),
          hour: dateItem.format('HH:mm:00.00')
        })
      }
      return items
    }
  },
  methods: {
    setFecha () {
      const item = this.fechas.find(i => i.index === this.selected)
      this.$emit('input', {
        fecha: item.date,
        hora: item.hour
      })
    }
  }
}
</script>
