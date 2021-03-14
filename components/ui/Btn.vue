<template>
  <button class="btn"
    :disabled="disabled"
    :class="blockClass"
    :type="type"
    @click="$emit('btn-click')"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    blockClass: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    }
  }
}
</script>
<style lang="scss">
.btn {
  display: block;
  height: 48px;
  padding: 0 35px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 48px;
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &._blue {
    background-color: $blue-light;
    color: white;
  }

  &._red {
    background-color: #ef4d4d;
    color: white;
  }

  &:disabled {
    opacity: .7;
    cursor: not-allowed;
  }
}
</style>
