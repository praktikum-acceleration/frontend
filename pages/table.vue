<template>
  <div class="lk-root table-page">
    <Container>
      <div class="table-page__wrapper">
        <h1 class="title table-page__title">Дневник акселерации</h1>
        <Btn class="table-page__btn _blue"
             @btn-click="$store.dispatch('popup/openReplyFormPopup',{
               title:'Успех за неделю'
             })">
          Успех за неделю
        </Btn>
        <Btn class="table-page__btn _red" :disabled="needHelp" @btn-click="askHelp">
          Мне нужна
          помощь
        </Btn>
      </div>
      <TableTable v-if="notes" :notes="notes" @changeTable="changeTableHandler" />
    </Container>
  </div>
</template>
<script>
import Container from '@/components/layout/Container';
import ReplyList from '@/components/ReplyList';
import TableTable from '~/components/table/TableTable';
import Btn from '~/components/ui/Btn';

export default {
  layout: 'lk',
  components: {
    Container,
    ReplyList,
    TableTable,
    Btn
  },

  methods: {
    changeTableHandler(form) {
      console.log(form);
    },
    askHelp() {
      this.$store.dispatch('help/askHelp')
        .then(res=> {
          this.$store.dispatch('popup/openTextPopup',{
            title: 'Заявка отправлена',
            subtitle: 'Заявка отправлена менеджеру программы акселерации. Жди ответ в Slack'
          })
        }).catch(res=> {
        this.$store.dispatch('popup/openTextPopup',{
          title: `Ошибка ${res.status}`,
          subtitle: 'Что-то пошло не так. Попробуй еще раз'
        })
      })
    },
  },

  beforeMount() {
    this.$store.dispatch('table/fetchData');
    this.$store.dispatch('help/getNeedHelp');
  },




  computed: {
    notes() {
      const {notes} = this.$store.state.table;
      return notes;
    },
    needHelp() {
      const {needHelp} = this.$store.state.help;
      return needHelp;
    },
  },
};
</script>
<style lang="scss">
.table-page {
  &__title {
    margin: 0;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }

  &__btn:first-of-type {
    margin-left: auto;
    margin-right: 16px;
  }

}
</style>
