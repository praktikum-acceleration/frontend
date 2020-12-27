<template>
  <div class="dropdown" @click.stop="toggleList">
    <button type="button" class="dropdown__button">
      <p>
        {{ title }}
      </p>
      <Arrow
        color="#5B5E77"
        :class="['dropdown__arrow', { dropdown__arrow_opened: listOpened }]"
      />
    </button>
    <div :class="['dropdown__list', { dropdown__list_opened: listOpened }]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Arrow from '@/components/ui/Arrow'

export default {
  props: {
    title: String
  },
  components: {
    Arrow
  },

  computed: {
    listOpened() {
      return this.$store.state.dropDown.dropDownOpened
    }
  },
  methods: {

    toggleList: function() {
      if (this.listOpened) {
        this.$store.dispatch('dropDown/closeDropDown')
      } else {
        this.$store.dispatch('dropDown/openDropDown')
      }
    }
  }
}
</script>

<style lang="scss">
.dropdown {
  color: $black;
  position: relative;
  height: 100%;

  &__list {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    width: max-content;
    min-width: 100%;
    display: none;
    list-style: none;
    overflow-x: auto;
    position: absolute;
    top: 100%;
    background: #ffffff;
    max-height: 240px;
    padding: 16px;
    z-index: 2;

    &_opened {
      display: block;
    }
  }

  &__button {
    height: 56px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 4px 12px;
    background-color: transparent;
    border: 1px solid #d5dae0;
    outline: none;
    border-radius: 2px;
    vertical-align: baseline;
  }

  &__arrow {
    margin-left: auto;
    transition: 0.1s ease;

    &_opened {
      transform: rotate(180deg);
    }
  }

  &._error > .dropdown__button {
    border-color: #ef4d4d;
  }

  &._success > .dropdown__button {
    border-color: #81bf81;
  }
}
</style>
