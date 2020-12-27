<template>
  <div class="popup">
    <div class="popup__content">
      <button class="popup__close"
              @click="closePopup">
      </button>
      <slot>

      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Popup',
  methods: {
    closePopup() {
      // this.$store.commit('popup/closePopup')
    },

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
  background-color: rgba(5, 5, 5, .3);
  z-index: 10;
}
</style>
