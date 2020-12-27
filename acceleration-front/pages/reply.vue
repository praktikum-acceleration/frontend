<template>
  <div class="lk-root">
    <Container class="review">
      <h1 class="title">Добавить отзыв</h1>
      <ReplyForm
        class="review__form"
        title="Отправить"
        method="POST" @success="updateReplies"/>
    </Container>
  </div>
</template>
<script>
import Inp from '@/components/ui/Inp'
import Btn from '@/components/ui/Btn'
import Container from '@/components/layout/Container'

import ReplyForm from '@/components/ReplyForm'

import TextAr from '@/components/ui/TextAr'

import 'assets/css/form.scss'

export default {
  layout: 'lk',
  components: {
    Inp,
    Btn,
    TextAr,
    ReplyForm,
    Container
  },

  methods: {
    updateReplies() {
      this.$store.dispatch('offers/fetchOffers',JSON.parse(window.localStorage.getItem('token')))
      this.$router.push('/')
    },
  }
}
</script>
<style lang="scss">
.review {
  background-color: #fff;

  &__form {
    width: 400px;
  }

}


</style>
