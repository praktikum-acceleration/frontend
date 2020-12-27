<template>
  <div class="textarea">
    <label class="textarea__label">
      <textarea :class="['textarea__textarea',{'_error': onError}]"
             :type="type"
             :name="name"
             :max="max"
             :min="min"
             :placeholder="label"
             :required="required"
             :value="defaultValue"
             v-model="value"
                @change="changeInput"></textarea>
      <span class="textarea__label-text">{{ label }}</span>
    </label>
    <span class="textarea__error-message">{{ errorMessage }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
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

    onError: {
      type: Boolean
    },
    errorMessage: {
      type: String
    }
  },

  created() {
    this.value = this.defaultValue
  },

  methods: {
    changeInput(e) {
      this.$emit('update:value', e.currentTarget.value)
    }
  }
}
</script>
<style lang="scss">
.textarea {
  font-weight: 400;
  min-height: 112px;
  width: 100%;
  background-color: inherit;

  &__label {
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    background-color: inherit;
  }

  &__textarea {
    padding: 12px;
    height: 112px;
    width: 100%;
    outline: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
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
    top: 26px;
    left: 12px;
    padding: 2px;
    background-color: inherit;
    transform: translateY(-50%);
    transition: all .3s;
  }

  &__textarea:not(:placeholder-shown) + &__label-text,
  &__textarea:focus + &__label-text {
    top: 0;
    font-size: 12px;
  }

  &__textarea:valid:not(:placeholder-shown):not(:focus) + &__label-text{
    color: #81bf81;
  }
}

</style>
