<template>
  <div class="table__cell">
    <input :name="name" class="table__input" type="url" :value="value" @blur="validateLink">
<!--    <a v-if="link" :href="link">link</a>-->
  </div>
</template>
<script>
export default {
  name: 'TableLink',
  data() {
    return {};
  },
  props: {
    name: {
      type: String,
    },

    value: {
      type: String,
    },
  },
  methods: {
    validateLink(e) {

    },
  },
};
</script>
<style lang="scss">

</style>
