<template>
  <div class="graphs">
    <Container>
      <h1 class="title">Статистика программы трудоустройства</h1>
    <div class="graphs__graphs">
      <client-only>
        <FunnelChart
                     :data="data"
                     :labels="labels"
                     :backgroundColor="backgroundColor"
                     :hoverBackgroundColor="hoverBackgroundColor"
                     :sdata="sdata"
        />
      </client-only>
    </div>
    </Container>
  </div>
</template>
<script>
import Container from '@/components/layout/Container'
// import UserLine from '@/components/charts/UserLine'
import {validateRoute} from '~/assets/js/common';



export default {
  layout: 'lk',
  components: {
    // UserLine,
    Container,
    FunnelChart: ()=> process.client && import('@/components/charts/FunnelChart'),
  },

  data() {
    return {
      data: [30, 60, 90, 90, 90],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FFCE56',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FFCE56',
        '#FFCE56',
        '#FFCE56',
      ],
      labels: [
        'Первый контакт',
        'Собеседование с HR',
        'Техническое собеседование',
        'Финальное собеседование',
        'Оффер'
      ],
      sdata: {
        datasets: [{
          data: [30, 60, 90, 90, 90],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FFCE56',
            '#FFCE56',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FFCE56',
            '#FFCE56',
            '#FFCE56',
          ],
        }],
        labels: [
          'Первый контакт',
          'Собеседование с HR',
          'Техническое собеседование',
          'Финальное собеседование',
          'Оффер'
        ],
      },
    }
  },

  beforeMount() {
    this.loaded = true
    validateRoute.call(this)
  },
}
</script>
<style>
.graphs {
  padding-top: 48px;
}
</style>
