<template>
  <div>
    <Container>
      <h1>Добро пожаловать {{ user ? user.name : ''}}</h1>
    </Container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Container from '@/components/layout/Container'

export default {
  layout: 'lk',
  middleware: 'offers',
  computed: mapState([
    'user'
  ]),
  components: {
    Container
  }
  ,
  mounted() {
    console.log(this.$store.getters['offers/getOffers'])
  }
}
</script>
<style lang="scss">

</style>
