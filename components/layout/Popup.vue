<template>
  <transition name="fade">
  <div class="popup" v-if="popupOpened">
    <div class="popup__content">
      <button class="popup__close"
              @click="closePopup">
      </button>
      <p v-if="title" class="popup__title">{{ title }}</p>
      <p v-if="subtitle" class="popup__text">{{ subtitle }}</p>
      <slot>

      </slot>
    </div>
  </div>
  </transition>
</template>
<script>
export default {
  name: 'Popup',
  data() {
    return {
      // popupOpened: false,
    }
  },
  methods: {
    closePopup() {
      this.$store.dispatch('popup/closePopup')
    },
  },
  computed: {
    title() {
      return this.$store.state.popup.title
    },
    subtitle() {
      return this.$store.state.popup.subtitle
    },
    popupOpened() {
      return this.$store.state.popup.visible
    }
  }
}
</script>
<style lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(5, 5, 5, .3);
  z-index: 10;

  &__title {
    margin-bottom: 24px;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.4;
  }

  &__text {
    margin-bottom: 24px;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4;
  }

  &__content {
    position: relative;
    padding: 40px;
    background-color: #fff;
    width: 420px;
    border-radius: 8px;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 22px;
    height: 22px;
    cursor: pointer;
    z-index: 3;
    border: none;
    background-color: transparent;
  }

  &__close:after, &__close:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 30px;
    height: 2px;
    background-color: #d7d9db;
  }

  &__close:before {
    transform: translate(-50%,-50%) rotate(-45deg);
  }

  &__close:after {
    transform: translate(-50%,-50%) rotate(45deg);
  }
}
</style>
