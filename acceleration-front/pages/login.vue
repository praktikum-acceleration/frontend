<template>
  <div class="lk-root" @click="closeDropDown">
    <div class="login">
    <transition name="slide-fade">
      <form v-if="loginForm" enctype="multipart/form-data" class="login-form" @submit.prevent="login" :key="1"
            method="POST" action="auth/login/">

        <p v-if="showError" class="form__error">{{ errorText }}</p>
        <Inp class="form__row"
             label="Почта"
             name="email"
             type="email"
             :value.sync="email" />
        <Inp class="form__row" label="Пароль" name="password" type="text" :value.sync="password" />
        <button type="button" class="form__disclaimer" @click="loginForm=false">Зарегстрироваться
        </button>
        <Btn class="form__row _blue" type="submit">Войти</Btn>
      </form>
      <form v-else class="login-form" @submit.prevent="singUp" :key="2"
            method="POST">
        <p v-if="showError" class="form__error">{{ errorText }}</p>
        <Inp class="form__row" label="Почта" name="email" :value.sync="email" />
        <Inp class="form__row" label="Имя" name="username" :value.sync="userName" />
        <Dropdown :class="['form__row',{_error: errorDropdown},{_success: selected}] " :title="selected ||'Факультет'">
          <Radio v-for="programm in programms"
                 :value="programm.programm_name"
                 name="programm"
                 @radio-change="setSelected">{{ programm.programm_name }}
          </Radio>
        </Dropdown>
        <Inp class="form__row" label="Пароль" name="password" type="password" :value.sync="password" />
        <Inp class="form__row" label="Повторите пароль" type="password" :value.sync="newpassword" />
        <button type="button" class="form__disclaimer" @click="loginForm=true">Уже зарегестрированы?
          Войти.
        </button>

        <Btn class="form__row _blue" type="submit">Зарегестироваться</Btn>
      </form>
    </transition>
    </div>
  </div>
</template>

<script>
import Inp from '~/components/ui/Inp'
import Btn from '~/components/ui/Btn'
import Dropdown from '@/components/ui/Dropdown'
import Container from '@/components/layout/Container'
import { mapMutations } from 'vuex'

import '@/assets/css/form.scss'

export default {
  components: {
    Inp,
    Btn,
    Dropdown,
    Container
  },
  layout: 'lk',
  data() {
    return {
      userName: '',
      loginForm: true,
      email: '',
      showError: false,
      errorText: '',
      programms: [],
      password: '',
      selectedProgramm: 'Python-разработка',
      selected: '',
      newpassword: '',
      errorDropdown: ''
    }
  },

  async created() {
    const query = this.$route.query
    if (query.message === 'noUser') {
      this.showError = true
      this.errorText = 'Для просмотра этой старницы необходимо авторизоваться'
    }

    try {
      this.programms = await fetch(`${process.env.baseUrl}get-programm/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
    } catch (e) {
      console.log(e)
    }

  },
  methods: {
    closeDropDown() {
      this.$store.dispatch('dropDown/closeDropDown')
    },

    setSelected(e) {
      this.selected = e.target.value
      this.selectedProgramm = this.selected
      this.errorDropdown = false
      this.closeDropDown()
    },
    async login() {

      fetch(`${process.env.baseUrl}auth/login/`, {
        method: 'POST',
        body: JSON.stringify({
          email: this.email,
          password: this.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
          if (!res.ok) {
            return Promise.reject(res)
          }
          return res.json()
        })
        .then(res => {
          window.localStorage.setItem('token', JSON.stringify(res.token))
          this.$store.dispatch('offers/fetchOffers', res.token)
          this.$root.$emit('updateUser')
          this.$router.push('/')
          return res
        })
        .catch(e => console.log(e.json()))
        .finally(res => {

        })

    },
    singUp(e) {
      const formData = new FormData(e.currentTarget)
      if (this.password !== this.newpassword) {
        this.showError = true
        this.errorText = 'Пароли не совпадают'
        return
      }
      if (!this.selected) {
        this.errorDropdown = true
        return
      } else {
        this.errorDropdown = false
      }
      fetch(`${process.env.baseUrl}auth/registration/`, {
        method: 'POST',
        body: JSON.stringify({
          email: this.email,
          username: this.userName,
          password: this.password
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
          if (!res.ok) {
            return Promise.reject(res)
          }
          return res.json()
        })
        .then(res => {
          window.localStorage.setItem('token', JSON.stringify(res.token))
          return res
        })
        .then(res => {
          return fetch(`${process.env.baseUrl}profile/`, {
            method: 'POST',
            body: JSON.stringify({
              email: this.email,
              owner: this.userName,
              password: this.password,
              programm: this.selectedProgramm,
              age: 25,
              gender: 'Человек',
              city: 'Москва',
              wave: 1,
              first_name: '1212',
              last_name: '12112'
            }),
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`

            }
          })
        })
        .then(res => {
          this.$root.$emit('updateUser')
          this.$router.push('/')
        })
        .catch(e => console.log(e.json()))
    }
  }
}

</script>

<style lang="scss">

.login {
  padding-top: 0;
  height: calc(100vh);

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */
  {
    transform: translateX(-30%) translateY(-50%);
    opacity: 0;
  }
}

.login-form {
  width: 400px;
  //padding: 20px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}


</style>
