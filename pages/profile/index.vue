<template>
  <div class="profile" v-if="user">
    <Container >
      <template v-if="!editUser">

        <transition name="fade" appear>
          <div class="profile__info">
        <img :src="user.avatar" class="profile__avatar">
        <h1 class="profile__username">{{ user.first_name }} {{ user.last_name }}</h1>
        <p class="profile__programm">{{ user.programm }}, {{ user.wave }}-й поток</p>
        <ul class="reply__row">
          <li class="reply__result">
            <span class="reply__result-accent">Город: </span>{{ user.city }}
          </li>
          <li class="reply__result">
            <span class="reply__result-accent">Возраст: </span>{{ user.age }}
          </li>
        </ul>
        <Btn class="_blue profile__btn" @btn-click="editUser = true">Редактирвать профиль</Btn>
          </div>
        </transition>

      </template>


      <template v-else >

        <transition name="fade" appear>

      <form enctype="multipart/form-data"
            class="form profile__form" action="add_review/"
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
        <Inp class="form__row"
             label="Город"
             type="text"
             name="city"
             :default-value="user.city"
             :value.sync="newReply.city" />
        <Inp class="form__row"
             label="Возраст"
             type="number"
             name="age"
             :default-value="user.age"
             :value.sync="newReply.age" />
        <Dropdown :class="['form__row',{_error: errorDropdown},{_success: selected}] " :title="selected">
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
        <Btn class="form__row _red" type="button" @btn-click="editUser = false">Отменить редактирование</Btn>
      </form>
        </transition>
      </template>
    </Container>


    <Container>
      <div class="graphs">
        <div class="graphs__tabs">

          <button :class="['graphs__tab', {'_active': byDays === false }]" @click="byDays = false">
            По октликам
          </button>

          <button :class="['graphs__tab', {'_active': byDays === true }]" @click="byDays = true">
            По дням
          </button>
        </div>
        <transition name="fade" appear>
        <div class="graphs__graphs">
          <UserLine v-if="byDays"  :offers="myOffers" />
          <UserPie  v-else :offers="myOffers" />
        </div>
        </transition>
      </div>
    </Container>
  </div>
</template>
<script>
import Container from '@/components/layout/Container'
import Dropdown from '@/components/ui/Dropdown'
import Inp from '@/components/ui/Inp'
import Btn from '@/components/ui/Btn'
import UserLine from '@/components/charts/UserLine'
import UserPie from '@/components/charts/UserPie'

export default {
  layout: 'lk',
  components: {
    UserPie,
    UserLine,
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
      selected: 'Факультет',
      selectedProgramm: 'Python-разработка',
      errorDropdown: '',
      byDays: false,
    }
  },

  methods: {
    getUser() {
      return fetch(`${process.env.baseUrl}profile/`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`,
          'Content-Type': 'application/json'
        }
      })

        .then(res => res.json())
        .then(res=> {
          this.user = res
          this.selected = this.user.programm || this.selectedProgramm
        })
        .catch(err => console.log(err))
    },

    initUser() {
      return this.getUser().then(res => {
        this.newReply = { ...this.user }
      })
    },

    updateUser() {
      fetch(`${process.env.baseUrl}profile/`, {
          method: 'PUT',
          headers: {
            'authorization': `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...this.newReply })
        }).then(res => res.json())
        .then(res=> {
          return this.initUser()
        }).then(res=> {
          this.editUser = false
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
    }
  },

  computed: {
    myOffers() {
      return this.$store.state.offers.myOffers
    }
  },

  beforeMount() {
    this.initUser()
    this.$store.dispatch('offers/fetchOffers', JSON.parse(window.localStorage.getItem('token')))
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
  background-color: #fff;

  &__username {
    margin-bottom: 36px;
  }

  &__programm {
    margin-bottom: 12px;
  }

  &__info {
    background-color: #fff;
    width: fit-content;
    margin: 0 auto;
  }

  &__btn {
    margin: 48px auto 0;
  }

  &__form.form {
    background-color: #fff;
    max-width: 400px;
    margin: 48px auto 0;
    min-width: 400px;
  }
}

.graphs {
  width: 100%;

  &__tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 36px;
  }

  &__tab {
    font-size: 12px;
    font-weight: bold;
    padding: 12px;
    background-color: transparent;
    border: none;
    outline: none;
    margin: 8px;

    &._active {
      border: 2px solid $black;
      border-radius: 4px;
    }
  }
}
</style>
