<template>
  <div>
    <h1>Добро пожаловать {{ user.name }}</h1>
  </div>
</template>
<script>
import { mapState } from 'vuex';
  export default {
    middleware:['lk'],
    layout: 'lk',
    computed: mapState([
      'user'
    ])
  };
</script>
<style lang="scss" module>

</style>
