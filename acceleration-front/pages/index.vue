<template>
  <div class="page">
    <transition-group name="slide-fade">
    <form v-if="loginForm" class="form" @submit="login" :key="1"
          method="POST" action="http://0819a8e70ee9.ngrok.io/auth/login/">
      <Inp class="form__row" label="Почта" name="email" :value.sync="userName"/>
      <Inp class="form__row" label="Пароль" name="password" type="text"/>
      <button type="button" class="form__disclaimer" @click="loginForm=false">Зарегстрироваться</button>
      <Btn class="form__row _blue" type="submit">Войти</Btn>
    </form>
    <form v-else class="form" @submit="singUp" :key="2"
          method="POST" action="http://0819a8e70ee9.ngrok.io/auth/registration/">
      <Inp class="form__row" label="Почта" name="email" :value.sync="userName"/>
      <Inp class="form__row" label="Имя" name="username" :value.sync="userName"/>
<!--      <Inp class="form__row" label="Фамилия" :value.sync="userName"/>-->
<!--      <Inp class="form__row" label="Когорта" :value.sync="userName"/>-->
      <Inp class="form__row" label="Пароль" name="password" type="password"/>
      <Inp class="form__row" label="Повторите пароль" type="password"/>
      <button type="button" class="form__disclaimer" @click="loginForm=true">Уже зарегестрированы? Войти.</button>

      <Btn class="form__row _blue" type="submit">Зарегестироваться</Btn>
    </form>
    </transition-group>
  </div>
</template>

<script>
import Inp from '~/components/ui/Inp'
import Btn from '~/components/ui/Btn'
import { mapMutations } from "vuex";

import '@/assets/css/form.scss'

export default {
  components: {
    Inp,
    Btn
  },
  data() {
    return {
      userName: '',
      loginForm: true,
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    login() {
      this.setUser({name: this.userName})
      this.$router.push('/lk')
    },
    singUp() {
      this.setUser({name: this.userName})
      this.$router.push('/lk')
    }
  }
}

</script>

<style lang="scss" scoped>
.page {
  //display: flex;
  min-height: 100vh;
  //justify-content: center;
  //align-items: center;
  background-color: black;
}

form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(-30%) translateY(-50%);
  opacity: 0;
}

</style>
