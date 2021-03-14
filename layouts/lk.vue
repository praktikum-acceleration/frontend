<template>
  <div :class="['root']">
    <header class="lk-header">
      <Container class="lk-header__container">
        <nuxt-link class="lk-header__logo" to="/">Logo</nuxt-link>
        <nuxt-link class="lk-header__link" to="/">Комментарии пользователей</nuxt-link>
        <template v-if="userLogin">
          <nuxt-link class="lk-header__link" to="/table">Дневник</nuxt-link>
          <nuxt-link class="lk-header__link" to="/stats">Статистика</nuxt-link>
          <nuxt-link class="lk-header__link" to="/my">Мои отзывы</nuxt-link>
          <nuxt-link class="lk-header__link" to="/profile">Профиль</nuxt-link>
          <button class="lk-header__logout" @click="logout">Выйти</button>
        </template>
        <template v-else>
          <nuxt-link class="lk-header__link" to="/login">Войти</nuxt-link>
        </template>
      </Container>
    </header>
    <transition name="slide-fade" appear>
      <Nuxt @updateUser="checkUser"/>
    </transition>
    <Popup>
      <ReplyForm v-if="replyFormPopup"/>
    </Popup>
  </div>
</template>

<script>
import Container from '@/components/layout/Container'
import Popup from '~/components/layout/Popup';
import ReplyForm from '~/components/ReplyForm';

export default {
  components: {
    ReplyForm,
    Popup,
    Container
  },

  data() {
    return {
      loadedOffers: {},
      userLogin: false,
    }
  },

  computed: {
    isLoaded() {
      const { isLoaded } = this.$store.state.offers
      return isLoaded
    },

    replyFormPopup() {
      const { replyForm } = this.$store.state.popup
      return replyForm
    }
  },

  methods: {
    logout() {
      window.localStorage.removeItem('token')
      window.location.reload()
    },

    checkUser() {
      this.userLogin = JSON.parse(window.localStorage.getItem('token'))
    },
  },

  beforeMount() {
    this.checkUser()
    this.$root.$on('updateUser',this.checkUser)
  },

  mounted() {
    this.$store.dispatch('popup/openReplyFormPopup',{
      title:'Привет! Расскажи, как прошла твоя неделя 🙌'
    })
  }

}

</script>
<style lang="scss">
.root {
  min-height: 100vh;
}

.lk-root {
  width: fit-content;
  margin: 0 auto;
}

.lk-header {
  border-bottom: 1px solid $blue-light;
  color: #151414;

  &__container {
    height: 80px;
    display: flex;
    align-items: center;
    //justify-content: space-between;
  }

  &__logo {
    text-decoration: none;
    color: inherit;
    font-size: 24px;
    font-weight: 700;
    margin-right: auto;
  }

  &__link {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    margin: 0 12px;
  }

  &__logout {
    font-weight: 700;
    border: none;
    outline: none;
    background-color: #ef4d4d;
    color: white;
    margin: 0 12px;
    border-radius: 4px;
    padding: 4px 10px;
    cursor: pointer;
  }
}

.user-menu {
  position: relative;

  &__avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }

  &__list {
    position: absolute;
    right: 0;
    top: 40px;
    width: 250px;
    background-color: #fff;
    box-shadow: 1px 1px 5px 1px #47494e;
    list-style: none;
  }

  &__item {
    padding: 8px;
    cursor: pointer;
  }
}

.lk-root {
  opacity: 1;
  padding-top: 48px;
}

.slide-fade-enter-active {
  transition: all .4s ease;
  //opacity: 0;
}

.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-leave-to {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transform: translateX(-30%);
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(30%);
  opacity: 0;
}
</style>
