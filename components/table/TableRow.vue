<template>
  <form class="table__row" @submit.prevent="sendData" @change="$emit('changeTable',$event.currentTarget)">
    <TableCell :value="data.company_name" name="company_name" />
    <TableLink :value="data.vacancy_link" name="vacancy_link" />
    <TableDate :value="data.first_contact" name="first_contact" />
    <TableCell :value="data.recruter_response" name="recruter_response" />
    <TableDate :value="data.test_task" name="test_task" />
    <TableCell :value="data.feedback" name="feedback" />
    <TableDate :value="data.first_interview" name="first_interview" />
    <TableCell :value="data.first_interview_feedback" name="first_interview_feedback" />
    <TableDate :value="data.technical_interview" name="technical_interview" />
    <TableCell :value="data.technical_interview_feedback" name="technical_interview_feedback" />
    <TableDate :value="data.final_interview" name="final_interview" />
    <TableCell :value="data.result" name="result" />
    <input v-if="data.id" type="number" hidden :value="data.id" name="id">
    <button>send</button>
  </form>
</template>
<script>
import TableCell from '~/components/table/TableCell';
import TableDate from '~/components/table/TableDate';
import {xhr} from '~/assets/js/rest';
import {getToday} from '~/assets/js/common';
import TableLink from '~/components/table/TableLink';

export default {
  name: 'TableRow',
  components: {TableLink, TableCell, TableDate},
  props: {
    data: {
      type: Object,
    },
  },
  methods: {
    sendData(e) {
      const formData = new FormData(e.target);
      const answer = {};
      for (const [name, value] of formData) {
        if (name !== 'date') {
          answer[name] = answer[name] ? answer[name] + value : value;
        }
      }
      answer.first_contact = answer.first_contact || getToday()

      const method = answer.id ? 'put' : 'post';

      xhr('add_review/', {
        body: {
          ...answer,
        }
      },method).finally(res=> {
        if(!answer.id) this.$emit('updateLocal')
        this.$store.dispatch('table/fetchData')
      });
    },
  },
};
</script>
<style lang="scss">
</style>
