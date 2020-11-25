<template>
  <div>
  <header class="lk-header">
    <Container class="lk-header__container">
      <nuxt-link class="lk-header__logo" to="/lk/">Logo</nuxt-link>
      <nuxt-link class="lk-header__link" to="/lk/reply">Добавить отзыв</nuxt-link>
      <nuxt-link class="lk-header__link" to="/lk/stats">Статистика</nuxt-link>
      <div class="user-menu">
        <img class="user-menu__avatar"
             src="https://steamuserimages-a.akamaihd.net/ugc/938337452372130541/EAA1571C522D491CF3EA158BF127F9463B531D2F/?imw=512&amp;imh=384&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
             alt=""
             @click="openMenu">
        <ul class="user-menu__list"
            v-if="menuShown">
          <li class="user-menu__item">Выйти</li>
        </ul>
      </div>
    </Container>
  </header>
    <Nuxt @click="closeMenu"/>
  </div>
</template>

<script>
import Container from '@/components/layout/Container'

export default {
  components: {
    Container
  },
  data() {
    return {
      menuShown: false
    }
  },
  methods: {
    openMenu() {
      this.menuShown = true
    },
    closeMenu() {
      this.menuShown = false
    }
  }
}

</script>
<style lang="scss">
.lk-header {
  background-color: red;

  &__container {
    height: 80px;
    display: flex;
    align-items: center;
    //justify-content: space-between;
  }

  &__logo {
    text-decoration: none;
    color: white;
    font-size: 24px;
    font-weight: 700;
    margin-right: auto;
  }

  &__link {
    text-decoration: none;
    color: white;
    font-weight: 500;
    margin: 0 12px;
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
    margin: 0;
    padding: 0;
  }

  &__item {
    padding: 8px;
    cursor: pointer;
  }
}
</style>
