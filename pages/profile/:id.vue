<template>
  <div class="lk-root">
    <Container class="profile">
      <img :src="user.avatar" class="profile__avatar">
      <h1 class="profile__username">{{ user.first_name}} {{user.last_name }}</h1>
      <p class="profile__programm">{{user.programm}}, {{ user.wave }}-й поток</p>
      <ul class="profile__list">
        <Reply v-for="(offer, index) in offers"
               :key="index"
               :reply="offer"
        />
      </ul>
    </Container>
  </div>
</template>
<script>
import Container from '@/components/layout/Container'

export default {
  name: ':id',
  layout: 'lk',
  components: {
    Container
  },

  data() {
    return {
      user: {
        first_name: 'Иван',
        last_name: 'Иван',
        gender: 'Человек',
        age: 25,
        wave: 1,
        programm: 'Python-разработка',
      },
      offers: []
    }
  },

  beforeMount() {

  },

  methods: {
    async getUser(id) {
      this.user = await fetch(`{process.env.base`,{
        method: 'GET',
        headers: {
          authorization: window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      })
        .then(res=>res.json())
        .catch(err=>console.log(err))
    },
  }
}
</script>
<style lang="scss" module>

</style>
