<template>
  <div class="lk-root">
    <div class="graphs__graphs">
      <line-chart :chart-data="datacollection" :options="initialOptions" :styles="myStyles"/>
    </div>
  </div>
</template>
<script>
import LineChart from '@/components/charts/LineChart'

export default {
  middleware:['lk','offers'],
  layout: 'lk',
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: {},
      initialOptions: {
        // cubicInterpolationMode: 'monotone',
        responsive: true,
        maintainAspectRatio: false,
        lineTension: 0,
      }
    };
  },

// #F78888 – #F3D250 – #ECECEC – #90CCF4 – #5DA2D5
  beforeMount() {
    const offersObj = {}
    const offers = this.$store.getters['offers/getOffers']
    offers.forEach(offer=> {
      Object.keys(offer).forEach(key=> {
        offersObj[key] = offersObj[key] || []
        offersObj[key].push(offer[key])
      })
    })
    this.datacollection = {
      labels: [...offersObj.review_date.map(date=> {
        const newDate = date.split('-')
        return `${newDate[2]}.${newDate[1]}`
      })
      ],
      datasets: [
        {
          label: 'Отлики',
          borderColor: '#F78888',
          backgroundColor: '#F78888',
          fill: false,
          data: [...offersObj.reply],
          lineTension: 0,
        },
        {
          label: 'Собеседования',
          borderColor: '#F3D250',
          backgroundColor: '#F3D250',
          fill: false,
          data: [...offersObj.replies_from_employer],
          lineTension: 0,
        },
        {
          label: 'Тестовые',
          borderColor: '#5DA2D5',
          backgroundColor: '#5DA2D5',
          fill: false,
          data: [...offersObj.test_tasks],
          lineTension: 0,
        },
        {
          label: 'Офферы',
          borderColor: '#90CCF4',
          backgroundColor: '#90CCF4',
          fill: false,
          data: [...offersObj.offers],
          lineTension: 0,
        }
      ]
    }
  },
  methods: {
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  computed: {
    myStyles () {
      return {
        height: '300px',
        position: 'relative'
      }
    }
  }
}
</script>
<style>

</style>
