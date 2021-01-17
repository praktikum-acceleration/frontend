<template>
  <div>
    <pie-chart :chart-data="datacollection" :options="initialOptions" :styles="myStyles" />
  </div>
</template>
<script>
export default {
  props:
    ['offers'],
  data() {
    return {
      datacollection: {},
      initialOptions: {
        responsive: true,
        maintainAspectRatio: false,
        lineTension: 0,
      }
    }
  },

  methods: {
    updateStats() {
      if(Object.keys(this.offers).length) {
        const offersObj = {}

        Object.keys(this.offers).forEach(id=> {
          const offer = this.offers[id]
          offersObj.offers = offersObj.offers ?  parseInt(offer.offers) + offersObj.offers : parseInt(offer.offers)
          offersObj.replies_from_employer= offersObj.replies_from_employer ?  parseInt(offer.replies_from_employer) + offersObj.replies_from_employer : parseInt(offer.offers)
          offersObj.reply= offersObj.reply ?  parseInt(offer.reply) + offersObj.reply : parseInt(offer.reply)
          offersObj.test_tasks= offersObj.test_tasks ?  parseInt(offer.test_tasks) + offersObj.test_tasks : parseInt(offer.test_tasks)

        })

        this.datacollection = {
          labels: ['Отлики','Собеседования','Тестовые','Офферы'],
          datasets: [
            {
              label: ['Отлики','Собеседования','Тестовые','Офферы'],
              borderColor: ['#F78888','#F3D250','#5DA2D5','#90CCF4'],
              backgroundColor: ['#F78888','#F3D250','#5DA2D5','#90CCF4'],
              fill: false,
              data: [offersObj.reply, offersObj.replies_from_employer, offersObj.test_tasks,offersObj.offers],

            }
          ]
        }
      }
    }
  },


  computed: {
    myStyles () {
      return {
        height: '300px',
        position: 'relative'
      }
    }
  },

  beforeMount() {
    this.updateStats()
  },

  watch: {
    offers() {
      this.updateStats()
    },
  },


}
</script>
<style lang="scss">

</style>
