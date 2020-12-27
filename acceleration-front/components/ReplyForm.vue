<template>
  <form enctype="multipart/form-data"
        class="form" action="add_review/"
        @submit.prevent="sendReply">

    <input type="hidden" name="id" :value="id">
    <Inp class="form__row"
         label="Количество октликов<sup>*</sup>"
         type="number"
         name="reply"
         :default-value="reply.reply"
         :value.sync="newReply.reply"
    />
    <Inp class="form__row"
         label="Количество тестовых<sup>*</sup>"
         type="number"
         name="test_tasks"
         :default-value="reply.test_tasks"
         :value.sync="newReply.test_tasks" />
    <Inp class="form__row"
         label="Количество собеседований<sup>*</sup>"
         type="number"
         name="replies_from_employer"
         :default-value="reply.replies_from_employer"
         :value.sync="newReply.replies_from_employer" />
    <Inp class="form__row"
         label="Количество офферов<sup>*</sup>"
         type="number"
         name="offers"
         :default-value="reply.offers"
         :value.sync="newReply.offers" />
    <TextAr class="form__row"
            label="Ваш комментарий"
            type="text"
            name="comment"
            :default-value="reply.comment"
            :value.sync="newReply.comment" />
    <Inp class="form__row"
         label="Дата<sup>*</sup>"
         type="date"
         name="review_date"
         :default-value="reply.review_date"
         :value.sync="newReply.review_date" />
    <label class="form__checkbox">
      <input type="checkbox" name="job_status" :checked="reply.job_status === 'True'"> Принял оффер
    </label>
    <p class="form__error" v-if="error">{{ error }}</p>
    <Btn class="form__row _blue" type="submit">{{ title }}</Btn>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'ReplyForm',
  props: {
    reply: {
      type: Object,
      default() {
        return {}
      }
    },
    id: {
      type: [String,Number],
      default: 1
    },
    title: {
      type: String,
      default: 'Отправить'
    },
    method: {
      type: String,
      default: 'POST'
    }
  },

  data() {
    return {
      error: '',
      newReply: {
      }
    }
  },

  methods: {
    sendReply(e) {
      const formData = new FormData(e.currentTarget)

      console.log(!!formData.get('job_status'))
      fetch(`${process.env.baseUrl}add_review/`, {
        method: this.method,
        body: JSON.stringify({
          id: formData.get('id'),
          review_date: formData.get('review_date'),
          job_status: formData.get('job_status') ? '1': '',
          reply: formData.get('reply'),
          replies_from_employer: formData.get('replies_from_employer'),
          test_tasks: formData.get('test_tasks'),
          offers: formData.get('offers'),
          comment: formData.get('comment')
        }),
        headers: {
          'authorization': `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (!res.ok) {
          Promise.reject(res)
        }
        return res.json()
      }).then(res => {
        this.$store.dispatch('offers/fetchOffers',JSON.parse(window.localStorage.getItem('token')))
        this.$emit('success')
      }).catch(res => {
        return res.json()
      }).then(res => {
        this.error = res
        console.error(this.error)
      })
    }
  }
}


</script>
<style lang="scss">

.fade-enter-active {
  transition: all .3s ease;
}

.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  display: none;
}

.fade-enter, .fade-leave-to
{
  opacity: 0;
}
</style>
