<template>
  <div class="input">
    <label class="input__label">
      <input :class="['input__input',{'_error': onError}]"
             :type="type"
             :name="name"
             :max="max"
             :min="min"
             :placeholder="label"
             :required="required"
             :valueAsDate="valueAsDate"
             v-model="value"
             @change="changeInput"
             @blur="validate($event)">
      <span class="input__label-text" v-html="label"></span>
    </label>
    <span class="input__error-message">{{ errorMessage }}</span>
  </div>
</template>
<script>
import {getToday} from '~/assets/js/common';
import {VALIDATION_CONFIG} from '~/assets/js/CONSTS';

export default {
  data() {
    return {
      value: '',
      onError: '',
      valueAsDate: '',
    }
  },
  props: {
    max: {
      type: Number
    },
    min: {
      type: Number
    },
    required: {
      type: Boolean
    },
    type: {
      type: String
    },
    name: {
      type: String
    },
    label: {
      type: String
    },
    defaultValue: {
      // type: String,
      default: ''
    },

    errorMessage: {
      type: String
    }
  },

  methods: {
    changeInput(e) {
      this.$emit('update:value', e.currentTarget.value)
      // this.validate(e);
    },
    validate(e) {
      const input = e.currentTarget
      this.onError = input.checkValidity()
      this.errorMessage = input.validity ? '' : VALIDATION_CONFIG[input.type][input.validity] ?? ''
      console.log(input.type,'input.validationMessage')

    },
  },

  created() {
    this.value = this.defaultValue
    if(this.type === 'date' && !this.defaultValue) {
      this.value = getToday()
    }
  },
}
</script>
<style lang="scss">
.input {
  font-weight: 400;
  height: 48px;
  width: 100%;
  background-color: inherit;

  &__label {
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    background-color: inherit;
  }

  &__input {
    padding: 12px;
    height: 100%;
    width: 100%;
    outline: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: inherit;

    &:invalid,
    &._error {
      border-color: #ef4d4d;
    }

    &:valid:not(:placeholder-shown):not(:focus) {
      border-color: #81bf81;
    }

    &::placeholder {
      opacity: 0;
    }

    &:focus {
      border-color: skyblue;
    }
  }

  &__label-text {
    position: absolute;
    font-size: 14px;
    top: 50%;
    left: 12px;
    padding: 2px 8px 2px 2px;
    background-color: inherit;
    transform: translateY(-50%);
    transition: all .3s;
    & > sup {

      position: absolute;
      bottom: 5px;
      right: 2px;
      color: #ef4d4d;
    }
  }

  &__input:not(:placeholder-shown) + &__label-text,
  &__input:focus + &__label-text {
    top: 0;
    font-size: 12px;
  }

  &__input:valid:not(:placeholder-shown):not(:focus) + &__label-text {
    color: #81bf81;
  }
}

</style>
