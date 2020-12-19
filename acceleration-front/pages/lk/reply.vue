<template>
  <div class="lk-root">
    <form enctype="multipart/form-data" class="form" @submit.prevent="sendReply"
          method="post" action="http://0819a8e70ee9.ngrok.io/add_review/">
      <input type="hidden" name="id" value="123">
      <Inp class="form__row"
           label="Количество октликов"
           type="number"
           name="reply"
           :value.sync="reply" />
      <Inp class="form__row"
           label="Количество тестовых"
           type="number"
           name="test_tasks"
           :value.sync="test_tasks" />
      <Inp class="form__row"
           label="Количество собеседований"
           type="number"
           name="replies_from_employer"
           :value.sync="replies_from_employer" />
      <Inp class="form__row"
           label="Количество офферов"
           type="number"
           name="offers"
           :value.sync="offers" />
      <Inp class="form__row"
           label="Ваш комментарий"
           type="text"
           name="comment"
           :value.sync="comment" />
      <Inp class="form__row"
           label="Дата"
           type="date"
           name="review_date"
           :default-value="getToday"
           :value.sync="date" />
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
      reply: '0',
      test_tasks: '0',
      replies_from_employer: '0',
      offers: '0',
      comment: '0',
      date: '0',
      id: '0'
    }
  },
  methods: {
    async sendReply(e) {

      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      // fetch('http://0819a8e70ee9.ngrok.io/add_review/',FormData)
      console.log(formData.get('id'))


      let response = await fetch('http://0819a8e70ee9.ngrok.io/add_review/', {
        method: 'POST',
        body: JSON.stringify({

          author: formData.get('id'),
          review_date: formData.get('review_date') ,
          job_status: formData.get('job_status'),
          reply: formData.get('reply'),
          replies_from_employer: formData.get('replies_from_employer') ,
          test_tasks: formData.get('test_tasks'),
          offers: formData.get('offers'),
          comment: formData.get('comment')

        }),
        headers: {
          authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjEyNDQ1ODY5fQ.APiY2IPwrXQkoQaGXzFgkbH2eI4e3hWdgIiSU_UCoIs',
          'Content-Type': 'application/json'
        }
      })

      let result = await response.json()
      console.log(result)
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
