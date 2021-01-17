<template>
  <div class="graphs">
    <Container>
      <h1 class="title">Статистика программы трудоустройства</h1>
    <div class="graphs__graphs">
      <UserLine v-if="Object.keys(offers).length" :offers="offers"/>
    </div>
    </Container>
  </div>
</template>
<script>
import Container from '@/components/layout/Container'
import UserLine from '@/components/charts/UserLine'

export default {
  layout: 'lk',
  components: {
    UserLine,
    Container
  },

  data() {
    return {
      offers: {}
    }
  },

  beforeMount() {
    this.$store.dispatch('offers/fetchStats', JSON.parse(window.localStorage.getItem('token')))
  },

  computed: {
    stats() {
      return this.$store.state.offers.stats
    }
  },

  methods: {
    getReviewDate(today) {
      return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    }
  },
  watch: {
    stats() {
      this.offers = {...this.stats}
      Object.keys(this.offers).forEach(id=> {
        const startDate = new Date(2020,0 ,-2)
        const offer = this.offers[id]
        startDate.setDate(startDate.getDate() + 7 * offer.week)
        console.log(startDate)
        offer.review_date = this.getReviewDate(startDate)
      })
    }
  }
}
</script>
<style>
.graphs {
  padding-top: 48px;
}
</style>
