<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import 'vue2-datepicker/locale/ru';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      date: null,
      time: '',
      lang: {
        yearFormat: 'YYYY',
        monthFormat: 'MMM',
        monthBeforeYear: true,
      },
    };
  },
  props: {
    name: {
      type: String,
    },
    value: {
      type: String,
    },
  },

  computed: {
    parsedValue() {
      const date = this.date
      if(!date) return this.value
      const month = date.getMonth() + 1
      return `${this.date.getFullYear()}-${this.date > 9 ? month : '0'+ month}-${date.getDate()}`
    },
  },

  beforeMount() {
    if(this.value) {
      const dateUnparsed = this.value.split('-');
      this.date = new Date(dateUnparsed[0], dateUnparsed[1] - 1, dateUnparsed[2]);
    }
  },
};
</script>

<template>
  <div class="table__cell">
    <date-picker v-model="date" type="date" :lang="lang" format="DD.MM.YYYY" :value="date" placeholder="Дата"></date-picker>
    <!--    <date-picker v-model="time" type="time" :inputAttr="{'name':name}" :lang="lang" format="до HH:mm" placeholder="Время"></date-picker>-->
    <input type="text" hidden :name="name" :value="parsedValue">
  </div>
</template>

<style>
.mx-datepicker {
  width: 100%;
  height: 30px;
}

.mx-input {
  height: 30px;
  padding: 2px;
  border: none;
  background-color: #f6efe2;
  font-size: 12px;
  box-shadow: none;
}

.mx-input::placeholder {
  opacity: .3;
}

.mx-icon-calendar {
  display: none;
}

.mx-icon-clear {
  top: 2px;
  right: 2px;
  transform: translateY(0);
}

</style>
