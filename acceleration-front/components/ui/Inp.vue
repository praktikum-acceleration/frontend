<template>
  <div class="input">
    <label class="input__label">
      <input class="input__input"
             :type="type"
             :name="name"
             :max="max"
             :min="min"
             :placeholder="label"
             :required="required"
             :value="defaultValue"
             v-model="value"
             @change="$emit('update:value', value)">
      <span class="input__label-text">{{ label }}</span>
    </label>
    <span class="input__error-message">{{ errorMessage }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      errorMessage: '',
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
      default:'',
    },

  }
}
</script>
<style lang="scss">
.input {
  font-weight: 400;
  height: 56px;
  width: 100%;
  background-color: #fff;

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

    &:invalid {
      border-color: orangered;
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
    padding: 2px;
    background-color: inherit;
    transform: translateY(-50%);
    transition: all .3s;
  }

  &__input:not(:placeholder-shown) + &__label-text,
  &__input:focus + &__label-text {
    top: 0;
    font-size: 12px;
  }

  &__input:valid:not(:placeholder-shown):not(:focus) + &__label-text{
    color: #81bf81;
  }
}

</style>
