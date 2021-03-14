<template>
  <textarea :name="name" class="table__cell" :value="value">

  </textarea>
</template>
<script>
  export default {
      name: 'TableCell',
    props: {
        name: {
          type: String,
        },

      value: {
        type: String,
      }
    }
  };
</script>
<style lang="scss" >

</style>
