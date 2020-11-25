<template>
  <div class="page">
    <form class="form" @submit.prevent="login">

      <Inp class="form__row" label="Имя" :value.sync="userName"/>
      <Inp class="form__row" label="Пароль" type="password"/>
      <Btn class="form__row _blue" type="submit">Войти</Btn>
    </form>
  </div>
</template>

<script>
import Inp from '~/components/ui/Inp'
import Btn from '~/components/ui/Btn'
import { mapMutations } from "vuex";

export default {
  components: {
    Inp,
    Btn
  },
  data() {
    return {
      userName: '',
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    login() {
      this.setUser({name: this.userName})
      this.$router.push('/lk')
    }
  }
}

</script>

<style lang="scss">
.page {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: black;
}

.form {
  padding: 24px;
  width: 400px;
  background-color: #fff;
  border-radius: 12px;

  &__row {
    height: 56px;
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
}

</style>
