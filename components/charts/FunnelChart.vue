<template>
  <canvas id="myChart" ref="chart"></canvas>
</template>
<script>
import Chart from 'chart.js';

import * as funnel from 'chartjs-plugin-funnel';

export default {
  name: 'app',
  data() {
    return {
      olddata: {
        datasets: [{
          data: this.data,
          backgroundColor: this.backgroundColor,
          hoverBackgroundColor: this.hoverBackgroundColor
        }],
        labels: this.labels,
      },
      data: {
        datasets: [{
          data: [30, 60, 90],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }],
        labels: this.labels
      }
    };

  },


  computed: {
    stats() {
      return this.$store.state.offers.stats
    }
  },

  methods: {
    getReviewDate(today) {
      return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    },

    createChart() {
      console.log(this.stats)
      const ctx = document.querySelector('#myChart').getContext('2d');
      this.chart = new Chart(ctx, {
          type: 'funnel',
          data: {
            datasets: [{
              // data: [...this.sdata.datasets[0].data],
              data: [1,2,3,],

              // backgroundColor: [...this.sdata.datasets[0].backgroundColor],
              // hoverBackgroundColor: [...this.sdata.datasets[0].hoverBackgroundColor],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ]
            }],
            labels: []
          },
        },
      );
    }

  },
  watch: {
    stats() {
      this.offers = {...this.stats}
      Object.keys(this.offers).forEach(id=> {
        const startDate = new Date(2020,0 ,-2)
        const offer = this.offers[id]
        startDate.setDate(startDate.getDate() + 7 * offer.week)
        console.log(this.offers)
      })
    }
  },

  mounted() {
    if(!this.stats) {
      this.$store.dispatch('offers/fetchStats', JSON.parse(window.localStorage.getItem('token')))
        .then(this.createChart)
    } else this.createChart()

    // if(Object.keys(this.sdata).length) {
    //   // this.addData(this.data.labels,this.data.datasets)
    // }
  },
};
</script>
<style lang="scss">
</style>


