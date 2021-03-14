<template>
  <div>

    <LineChart :chart-data="datacollection" :options="initialOptions" :styles="myStyles" />

  </div>
</template>
<script>
import LineChart from '@/components/charts/LineChart'

export default {
  components: { LineChart },
  props:
    ['offers'],
  data() {
    return {
      datacollection: {},
      initialOptions: {
        responsive: true,
        maintainAspectRatio: false,
        lineTension: 0
      }
    }
  },

  methods: {
    updateStats() {
      if (Object.keys(this.offers).length) {

        const offersObj = {}

        Object.keys(this.offers).reverse().forEach(id => {
          const offer = this.offers[id]
          Object.keys(offer).forEach(key => {
            offersObj[key] = offersObj[key] || []
            offersObj[key].push(offer[key])
          })
        })

        this.datacollection = {
          datasets: [
            {
              label: 'Отлики',
              borderColor: '#F78888',
              backgroundColor: '#F78888',
              fill: false,
              data: offersObj.replies,
              lineTension: 0
            },
            {
              label: 'Собеседования',
              borderColor: '#F3D250',
              backgroundColor: '#F3D250',
              fill: false,
              data: offersObj.replies_from_employer,
              lineTension: 0
            },
            {
              label: 'Тестовые',
              borderColor: '#5DA2D5',
              backgroundColor: '#5DA2D5',
              fill: false,
              data: offersObj.test_tasks,
              lineTension: 0
            },
            {
              label: 'Офферы',
              borderColor: '#90CCF4',
              backgroundColor: '#90CCF4',
              fill: false,
              data: offersObj.offers,
              lineTension: 0
            },
          ]
        }
      }
    }
  },

  computed: {
    myStyles() {
      return {
        position: 'relative'
      }
    }
  },

  watch: {
    offers() {
      this.updateStats()
    }
  },

  beforeMount() {
    this.updateStats()
  }
}
</script>
<style lang="scss">

</style>
