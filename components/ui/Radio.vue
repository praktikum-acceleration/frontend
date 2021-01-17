<template>
    <label class="radio" v-if="visible">
      <input
        type="radio"
        class="radio__button visually-hidden"
        :value="value"
        @change="$emit('radio-change', $event)"
        :name="name"
      />
      <p class="radio__text"><slot>Label</slot></p>
    </label>
</template>

<script>
export default {
  props: {
    checked: Boolean,
    name: String,
    value: String,
    visible: {
      default: true,
    },
  },
}
</script>

<style lang="scss">
.radio {
  display: block;
  &__text {
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 2px;
  }
  &__button:checked ~ &__text {
    background: $blue-light;
    color: $active-color;
  }
  :hover {
    background-color: $blue-light;
    color: $active-color;
    opacity: 0.7;
    border-radius: 2px;
  }
}
</style>
