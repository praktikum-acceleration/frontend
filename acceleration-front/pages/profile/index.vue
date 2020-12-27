<template>
  <div class="lk-root">
    <Container  class="profile">
      <template v-if="user && !editUser" >
      <img :src="user.avatar" class="profile__avatar">
      <h1 class="profile__username">{{ user.first_name }} {{ user.last_name }}</h1>
      <p class="profile__row">{{ user.programm }}, {{ user.wave }}-й поток</p>
      <ul class="reply__row">
        <li class="reply__result">
          <span class="reply__result-accent">Город: </span>{{ user.city }}
        </li>
        <li class="reply__result">
          <span class="reply__result-accent">Возраст: </span>{{ user.age }}
        </li>
      </ul>
      <Btn class="_blue" @btn-click="editUser = true">Редактирвать профиль</Btn>
      </template>
      <form v-if="editUser" enctype="multipart/form-data"
            class="form" action="add_review/"
            @submit.prevent="updateUser">

        <Inp class="form__row"
             label="Имя"
             type="text"
             name="first_name"
             :default-value="user.first_name"
             :value.sync="newReply.first_name"
        />
        <Inp class="form__row"
             label="Фамилия"
             type="text"
             name="last_name"
             :default-value="user.last_name"
             :value.sync="newReply.last_name" />
        <Inp class="form__row"
             label="Пол"
             type="text"
             name="gender"
             :default-value="user.gender"
             :value.sync="newReply.gender" />
        <Dropdown :class="['form__row',{_error: errorDropdown},{_success: selected}] " :title="selected ||'Факультет'">
          <Radio v-for="programm in programms"
                 :value="programm.programm_name"
                 name="programm"
                 @radio-change="setSelected">{{ programm.programm_name }}
          </Radio>
        </Dropdown>
        <Inp class="form__row"
             label="Поток"
             type="number"
             name="wave"
             :default-value="user.wave"
             :value.sync="newReply.wave" />
        <Btn class="form__row _blue" type="submit">Сохранить</Btn>
      </form>
    </Container>
  </div>
</template>
<script>
import Container from '@/components/layout/Container'
import Dropdown from '@/components/ui/Dropdown'
import Inp from '@/components/ui/Inp'
import Btn from '@/components/ui/Btn'

export default {
  layout: 'lk',
  components: {
    Container,
    Dropdown,
    Inp,
    Btn
  },

  data() {
    return {
      user: '',
      editUser: '',
      newReply: {},
      programms: [],
      password: '',
      selectedProgramm: 'Python-разработка',
      errorDropdown: '',
    }
  },

  methods: {
    async getUser() {
      return this.user = await fetch(`${process.env.baseUrl}profile/`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`,
          'Content-Type': 'application/json'
        }
      })

        .then(res => res.json())
        .catch(err => console.log(err))
    },

    async updateUser(e) {

      console.log({...this.newReply})
      this.user = await fetch(`${process.env.baseUrl}profile/`, {
        method: 'PUT',
        headers: {
          'authorization': `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...this.newReply}),
      })
    },

    closeDropDown() {
      this.$store.dispatch('dropDown/closeDropDown')
    },

    setSelected(e) {
      this.selected = e.target.value
      this.selectedProgramm = this.selected
      this.errorDropdown = false
      this.newReply.programm = this.selectedProgramm
      this.closeDropDown()
    },
  },

  beforeMount() {
    this.getUser().then(res=> {
      this.newReply = {...this.user}
    })
  },
  async created() {
    try {
      this.programms = await fetch(`${process.env.baseUrl}get-programm/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
    } catch (e) {
      console.log(e)
    }
  }

}
</script>
<style lang="scss">
.profile {
  width: 400px;
  background-color: #fff;
}
</style>
