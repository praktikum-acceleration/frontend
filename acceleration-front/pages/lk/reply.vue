<template>
  <div class="page">
      <form enctype="multipart/form-data" class="form" @submit.prevent="sendReply">
        <input type="hidden" name="id" value="123">
        <Inp class="form__row"
             label="Количество октликов"
             type="number"
             name="reply"
             :value.sync="reply"/>
        <Inp class="form__row"
             label="Количество тестовых"
             type="number"
             name="test_tasks"
             :value.sync="test_tasks"/>
        <Inp class="form__row"
             label="Количество собеседований"
             type="number"
             :value.sync="replies_from_employer"/>
        <Inp class="form__row"
             label="Количество офферов"
             type="number"
             :value.sync="offers"/>
        <Inp class="form__row"
             label="Ваш комментарий"
             type="text"
             :value.sync="comment"/>
        <Inp class="form__row" label="Дата" type="date" :default-value="getToday" :value.sync="date"/>
        <Btn class="form__row _blue" type="submit">Войти</Btn>
    </form>
  </div>
</template>
<script>
import Inp from '@/components/ui/Inp'
import Btn from '@/components/ui/Btn'

import '@/assets/css/form.scss'
export default {
  layout: 'lk',
  components: {
    Inp,
    Btn
  },
  data() {
    return {
      reply: '',
      test_tasks: '',
      replies_from_employer: '',
      offers: '',
      comment: '',
      date: '',
      id: ''
    }
  },
  methods: {
    sendReply(e) {
      const formData = new FormData(e.currentTarget)
      console.log(formData.get('id'))
    }
  },
  computed: {
    getToday() {
      const today = new Date()
      return `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`
    }
  },
  mounted() {

    console.log(new Date())
  }
}
</script>
<style>

</style>
