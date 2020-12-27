<template>
  <button class="btn"
    :disabled="disabled"
    :class="blockClass"
    :type="type"
  @click="$emit('btn-click')">
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
  height: 56px;
  padding: 0 35px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 56px;
  outline: none;
  border: none;
  border-radius: 4px;

  &._blue {
    background-color: $blue-light;
    color: white;
  }

  &._red {
    background-color: #ef4d4d;
    color: white;
  }
}
</style>
