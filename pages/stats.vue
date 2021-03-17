<template>
  <div class="graphs">
    <Container>
      <h1 class="title">Статистика программы трудоусройства</h1>
      <div class="graphs__graphs">
        <line-chart :chart-data="datacollection" :options="initialOptions" :styles="myStyles"/>
      </div>
    </Container>
  </div>
</template>
<script>
import LineChart from '@/components/charts/LineChart'
import Container from '@/components/layout/Container'

export default {
  layout: 'lk',
  components: {
    LineChart,
    Container
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

  methods: {
    updateStats() {
      if(Object.keys(this.offers).length) {
        console.log(this.offers,'updateStats')

        const offersObj = {
          review_date: []
        }

        console.log(this.offers,'updateStats')
        // Object.keys(this.offers).forEach(id=> {
        //   const offer = this.offers[id]
        //   // offer.offers = +offer.offers
        //   // offer.replies_from_employer = +offer.replies_from_employer
        //   // offer.reply = +offer.reply
        //   // offer.test_task = +offer.test_task
        //   //
        //   // if(offersObj.review_date.includes(offer.review_date)) {
        //   //   const index = offersObj.review_date.findIndex(date => {
        //   //     return date === offer.review_date
        //   //   })
        //   //   Object.keys(offer).forEach(key=> {
        //   //     if(key !== 'review_date') {
        //   //       offersObj[key][index] += offer[key]
        //   //     }
        //   //   })
        //   // }
        //   Object.keys(offer).forEach(key=> {
        //     offersObj[key] = offersObj[key] || []
        //     offersObj[key].push(offer[key])
        //   })
        // })

        // this.datacollection = {
        //   labels: [...offersObj.review_date.map(date => {
        //     const newDate = date.split('-')
        //     return `${newDate[2]}.${newDate[1]}`
        //   })
        //   ],
        //   datasets: [
        //     {
        //       label: 'Отлики',
        //       borderColor: '#F78888',
        //       backgroundColor: '#F78888',
        //       fill: false,
        //       data: [...offersObj.replies],
        //       lineTension: 0
        //     },
        //     {
        //       label: 'Собеседования',
        //       borderColor: '#F3D250',
        //       backgroundColor: '#F3D250',
        //       fill: false,
        //       data: [...offersObj.replies_from_employer],
        //       lineTension: 0
        //     },
        //     {
        //       label: 'Тестовые',
        //       borderColor: '#5DA2D5',
        //       backgroundColor: '#5DA2D5',
        //       fill: false,
        //       data: [...offersObj.test_tasks],
        //       lineTension: 0
        //     },
        //     {
        //       label: 'Офферы',
        //       borderColor: '#90CCF4',
        //       backgroundColor: '#90CCF4',
        //       fill: false,
        //       data: [...offersObj.offers],
        //       lineTension: 0
        //     },
        //     {
        //       label: 'Нашел работу',
        //       borderColor: '#89c676',
        //       backgroundColor: '#89c676',
        //       fill: false,
        //       data: [...offersObj.job_status.filter(status => status === 'True')],
        //       lineTension: 0
        //     }
        //   ]
        // }
      }
    }
  },

  computed: {
    offers() {
      const { stats } = this.$store.state.offers
      return stats
    },
    myStyles () {
      return {
        height: '300px',
        position: 'relative'
      }
    }
  },
  beforeMount() {
    this.$store.dispatch('offers/fetchStats')
  },

  watch: {
    offers() {
      console.log(this.offers,'wtahc offers')
      this.updateStats()
    }
  },

}
</script>
<style>
.graphs {
  padding-top: 48px;
}
</style>
