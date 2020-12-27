<template>

  <div :class="['reply', {'_success':reply.job_status == 'True'}]">
      <template v-if="replyEditing">
        <transition name="fade" appear>
        <ReplyForm
          :reply="reply"
          :key="1"
          :id="id"
          class="reply__form"
          title="Редактировать"
          method="PUT"
          @success="replyEditing = false">
          <button @click="replyEditing = false" class="btn form__row _red">Отменить редактирование</button>
        </ReplyForm>

        </transition>
      </template>

      <template v-else>
        <transition name="fade" appear>
          <div class="reply__content">
        <h3 class="reply__title">{{ reply.author }}</h3>
        <p class="reply__date">{{ reply.programm }} {{ reply.wave }}</p>
        <p class="reply__date">{{ getDate }}</p>
        <ul class="reply__row">
          <li class="reply__result">
            <span class="reply__result-accent">Откликов: </span>{{ reply.reply }}
          </li>
          <li class="reply__result">
            <span class="reply__result-accent">Тестовых: </span>{{ reply.test_tasks }}
          </li>
          <li class="reply__result">
            <span class="reply__result-accent">Собеседований: </span>{{
              reply.replies_from_employer
            }}
          </li>
          <li class="reply__result">
            <span class="reply__result-accent">Офферов: </span>{{ reply.offers }}
          </li>
          <li v-if="reply.comment" class="reply__result">
            <span class="reply__result-accent">Комментарий: </span>
            <p v-if="reply.comment" class="reply__comment">
              {{ reply.comment }}
            </p>
          </li>
        </ul>
            <template v-if="reply.editable ==='True' ">
        <button
          class="reply__edit"
          @click="editReply">
        </button>
        <button
          class="reply__delete"
          @click="deleteReply">
        </button>
            </template>
          </div>
        </transition>
      </template>

  </div>
</template>
<script>
import ReplyForm from '@/components/ReplyForm'


export default {
  name: 'Reply',
  components: {
    ReplyForm
  },

  props: {
    reply: {
      type: Object,
      default() {
        return {}
      }
    },
    id: {
      default: '1'
    }
  },

  data() {
    return {
      replyEditing: false
    }
  },

  computed: {
    getDate() {
      return this.reply.review_date
    }
  },

  methods: {
    editReply() {
      this.replyEditing = true
    },

    deleteReply(e) {
      // e.currentTarget.closest('.reply').remove()
      fetch(`${process.env.baseUrl}add_review/`, {
        method: 'DELETE',
        body: JSON.stringify({
          id: this.id
        }),
        headers: {
          'authorization': `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`,
          'Content-Type': 'application/json'
        }
      })
    }
  }
}
</script>
<style lang="scss">
.reply {
  position: relative;
  width: 600px;
  margin: 24px auto;
  border: 1px solid #c3c0c0;
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;

  &__transirion {
    background-color: inherit;
  }

  &__title {
    margin-bottom: 12px;
  }

  &__date {
    color: #6e6b6b;
    font-size: 12px;
  }

  &__result {
    list-style: none;
    font-weight: 500;
    margin: 6px 0;
  }

  &__result-accent {
    font-weight: 400;
  }

  &__edit {
    cursor: pointer;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 20px;
    right: 20px;
    border: none;
    background-color: transparent;
    outline: none;
    background-size: contain;
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' %3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg enable-background='new 0 0 64 64' height='64px' id='Layer_1' version='1.1' viewBox='0 0 64 64' width='64px' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg%3E%3Cpath d='M55.736,13.636l-4.368-4.362c-0.451-0.451-1.044-0.677-1.636-0.677c-0.592,0-1.184,0.225-1.635,0.676l-3.494,3.484 l7.639,7.626l3.494-3.483C56.639,15.998,56.639,14.535,55.736,13.636z'/%3E%3Cpolygon points='21.922,35.396 29.562,43.023 50.607,22.017 42.967,14.39 '/%3E%3Cpolygon points='20.273,37.028 18.642,46.28 27.913,44.654 '/%3E%3Cpath d='M41.393,50.403H12.587V21.597h20.329l5.01-5H10.82c-1.779,0-3.234,1.455-3.234,3.234v32.339 c0,1.779,1.455,3.234,3.234,3.234h32.339c1.779,0,3.234-1.455,3.234-3.234V29.049l-5,4.991V50.403z'/%3E%3C/g%3E%3C/svg%3E");
  }

  &__comment {
    margin-top: 12px;
  }

  &__delete {
    cursor: pointer;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 20px;
    right: 50px;
    border: none;
    border-radius: 5px;
    background-color: #ef4d4d;
    outline: none;
    background-size: 20px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' %3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg height='100%25' stroke='%23fff' fill='%23fff' stroke-width='0' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;' version='1.1' viewBox='0 0 24 24' width='100%25' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:serif='http://www.serif.com/' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Icon'%3E%3Cpath d='M4.251,9.031c-0,0 0.194,4.655 0.34,8.167c0.106,2.544 2.199,4.552 4.746,4.552c1.68,-0 3.646,-0 5.326,-0c2.547,0 4.64,-2.008 4.746,-4.552c0.146,-3.512 0.34,-8.167 0.34,-8.167c0.018,-0.413 -0.304,-0.763 -0.718,-0.78c-0.413,-0.018 -0.763,0.304 -0.78,0.718c-0,-0 -0.194,4.655 -0.341,8.166c-0.072,1.741 -1.505,3.115 -3.247,3.115c-1.68,-0 -3.646,-0 -5.326,-0c-1.742,0 -3.175,-1.374 -3.247,-3.115c-0.147,-3.511 -0.341,-8.166 -0.341,-8.166c-0.017,-0.414 -0.367,-0.736 -0.78,-0.718c-0.414,0.017 -0.736,0.367 -0.718,0.78Z'/%3E%3Cpath d='M7.459,5.25l0.374,-1.12c0.374,-1.123 1.425,-1.88 2.609,-1.88c0.944,-0 2.172,-0 3.116,-0c1.184,-0 2.235,0.757 2.609,1.88l0.374,1.12l3.459,-0c0.414,-0 0.75,0.336 0.75,0.75c0,0.414 -0.336,0.75 -0.75,0.75l-16,-0c-0.414,-0 -0.75,-0.336 -0.75,-0.75c0,-0.414 0.336,-0.75 0.75,-0.75l3.459,-0Zm7.5,-0l-0.215,-0.645c-0.17,-0.511 -0.647,-0.855 -1.186,-0.855c-0.944,-0 -2.172,-0 -3.116,-0c-0.539,-0 -1.016,0.344 -1.186,0.855l-0.215,0.645l5.918,-0Z'/%3E%3Cpath d='M9.25,11l0,5c0,0.414 0.336,0.75 0.75,0.75c0.414,-0 0.75,-0.336 0.75,-0.75l0,-5c0,-0.414 -0.336,-0.75 -0.75,-0.75c-0.414,-0 -0.75,0.336 -0.75,0.75Z'/%3E%3Cpath d='M13.25,11l0,5c-0,0.414 0.336,0.75 0.75,0.75c0.414,0 0.75,-0.336 0.75,-0.75l0,-5c-0,-0.414 -0.336,-0.75 -0.75,-0.75c-0.414,0 -0.75,0.336 -0.75,0.75Z'/%3E%3C/g%3E%3C/svg%3E%0A");
  }

  &._success {
    border-color: #81bf81;
    background-color: #f2f9f2;
  }
}
</style>
