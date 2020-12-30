<template>
  <div class="reply-list">
      <Reply v-for="(id, index) in Object.keys(offers).reverse()"
             :key="id"
             :reply="offers[id]"
             :id="id"
      />
  </div>
</template>
<script>
import Reply from '@/components/Reply'

export default {
  components: {
    Reply
  },

  methods: {
    editReplyHandler(reply) {
      this.$store.dispatch('popup/openPopup', reply)
    }
  },

  props: {
   offers: {
     type: Object,
     default: ()=>{}
   }
  },
}
</script>
<style lang="scss">
</style>
