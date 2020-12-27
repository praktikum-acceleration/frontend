<template>
  <div class="graphs">
    <Container>
      <h1 class="title">Статистика программы трудоустройства</h1>
    <div class="graphs__graphs">
      <UserLine :offers="offers"/>
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
  beforeMount() {
    this.$store.dispatch('offers/fetchOffers', JSON.parse(window.localStorage.getItem('token')))
  },

  computed: {
    offers() {
      return this.$store.state.offers.offers
    }
  }
}
</script>
<style>
.graphs {
  padding-top: 48px;
}
</style>
