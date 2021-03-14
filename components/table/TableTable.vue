<template>
  <div>
    <div class="table">
      <div class="table__row">
        <span class="table__heading">Название компании</span>
        <span class="table__heading">Ссылка на вакансию</span>
        <span class="table__heading">Дата контакта</span>
        <span class="table__heading">Ответ рекрутера</span>
        <span class="table__heading">Тестовое задание</span>
        <span class="table__heading">Обратная связь</span>
        <span class="table__heading">Первое собеседование с HR</span>
        <span class="table__heading">Обратная связь</span>
        <span class="table__heading">Техническое собеседование</span>
        <span class="table__heading">Обратная связь</span>
        <span class="table__heading">Финальное собеседование</span>
        <span class="table__heading">Оффер/результат</span>
      </div>
      <TableRow v-for="(id, index) in Object.keys(notes)"
                :key="id"
                :data="notes[id]"
                @changeTable="(form)=>changeTable(form,notes[id])" />

      <TableRow v-for="(row, index) in newRows"
                :key="index"
                :data="row"
                @updateLocal="newRows = []"
        @changeTable="(form)=>changeTable(form,row)" />
    </div>
    <Btn class="table__btn _blue" @btn-click="createRow">Добавить строку</Btn>
  </div>
</template>

<script>
import TableRow from '~/components/table/TableRow';
import Btn from '~/components/ui/Btn';

export default {
  name: 'TableTable',
  components: {Btn, TableRow},

  props: {
    notes: {
      type: Object,
      default: ()=>{}
    }
  },
  data() {
    return {
      newRows: [],
      defaultRow: {
        'vacancy_link': '',
        'first_contact': '',
        'recruter_response': '',
        'test_task': '',
        'feedback': '',
        'first_interview': '',
        'first_interview_feedback': '',
        'technical_interview': '',
        'technical_interview_feedback': '',
        'final_interview': '',
        'result': '',
      },
    };
  },

  methods: {
    changeTable(form, row) {
      const formElems = [...form.elements]
      const body = formElems.reduce((acc, {value,name})=> {
        acc[name] = acc[name] ? acc[name] + value : value || ''
        return acc
      },{})
      console.log(body)
    },

    createRow() {
      this.newRows.push({...this.defaultRow})
    }
  },
};

</script>

<style lang="scss">
$border-color: red;
.table {
  border-left: 1px solid $border-color;
  border-top: 1px solid $border-color;
  background-color: grey;

  &__row {
    display: grid;
    grid-template-columns: 1fr .75fr .65fr .8fr .8fr .8fr 1.1fr .8fr 1fr .8fr 1fr 1fr;
    //padding-bottom: 1px;

    &:focus {
      outline: 1px red;
    }
  }

  &__heading {
    padding: 4px;
    width: 100%;
    word-wrap: break-word;
    background-color: #f6efe2;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    border-right: 1px solid $border-color;
    border-bottom: 2px solid $border-color;
  }

  &__cell {
    box-sizing: border-box;
    padding: 5px;
    max-height: 300px;
    line-height: 15px;
    width: 100%;
    vertical-align: middle;
    word-wrap: break-word;
    resize: none;
    background-color: #f6efe2;
    border: none;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    //border-collapse: collapse;
    &:focus {
      box-shadow:0 0 1px 1px $blue-light inset;
      outline: none;
      outline-offset: -1px;
    }
  }

  &__input {
    box-sizing: border-box;
    padding: 5px;
    max-height: 300px;
    line-height: 15px;
    width: 100%;
    vertical-align: middle;
    word-wrap: break-word;
    resize: none;
    background-color: #f6efe2;
    border: none;
  }

  &__btn {
    margin-top: 24px;
  }
}
</style>
