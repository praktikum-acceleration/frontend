<template>
  <div class="lk-root">
    <Container>
      <h1>Мои отзывы</h1>
      <ReplyList :offers="myOffers" />

    </Container>
  </div>
</template>
<script>
import Container from '@/components/layout/Container'
import ReplyList from '@/components/ReplyList'

export default {
  layout: 'lk',
  components: {
    Container,
    ReplyList
  },

  data() {
    return {
    }
  },

  beforeMount() {
    if(!window.localStorage.getItem('token')) {

    }
  },

  methods: {
    editReplyHandler(reply) {
      this.$store.dispatch('popup/openReplyFormPopup', {title:reply})
    }
  },

  computed: {
    myOffers() {
      const { myOffers } = this.$store.state.offers
      return myOffers
    }
  },
}
</script>
<style lang="scss">
.news {

}
</style>
