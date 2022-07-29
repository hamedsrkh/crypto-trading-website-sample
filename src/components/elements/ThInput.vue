<template>
  <div class="th-input__container">
    <div class="th-input__control" :class="classes">
      <div v-if="prefix" class="th-input__prefix">{{ prefix }}</div>
      <input :type="type"
             class="th-input"
             @focus="focused = true"
             @blur="focused = false"
             :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
      >
      <div v-if="suffix" class="th-input__suffix">{{ suffix }}</div>
    </div>
    <span class="th-input__message" v-if="errorMessage">{{errorMessage}}</span>
  </div>
</template>

<script>
export default {
  name: "ThInput",
  props: {
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue:{
      type: [String, Number],
    },
    errorMessage:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      focused: false
    }
  },
  computed: {
    classes() {
      return {
        'th-input--focused': this.focused,
        'th-input--error': this.errorMessage,
      }
    }
  },
}
</script>

<style scoped>
.th-input__container {
  margin: 25px 0;
  min-width: 200px;
  width: 100%;
  border-radius: 4px;
  height: 40px;
  background-color: rgba(230, 232, 234, 0.6);
}

.th-input__control {
  box-sizing: border-box;
  display: inline-flex;
  position: relative;
  -webkit-box-align: center;
  align-items: center;
  line-height: 1.6;
  border: 1px solid rgba(230, 232, 234, 0.1);
  border-radius: 4px;
  width: 100%;
  font-size: 14px;
  height: 100%;
}

.th-input__prefix {
  flex-shrink: 0;
  margin-left: 8px;
  min-width: 48px;
  font-size: 14px;
  color: rgb(132, 142, 156);
}

.th-input__container input {
  color: rgb(30, 35, 41);
  font-size: 14px;
  padding-left: 4px;
  padding-right: 4px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.th-input {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  height: 100%;
  padding: 0px;
  outline: none;
  background-color: inherit;
  opacity: 1;
  border: none !important;
}

.th-input__suffix {
  flex-shrink: 0;
  margin-right: 8px;
  font-size: 14px;
  color: rgb(112, 122, 138);
  margin-left: 8px;
}

.th-input__control:hover {
  border-color: rgb(240, 185, 11);
}

.th-input__control.th-input--focused {
  border-color: rgb(240, 185, 11);
}

.th-input__message{
  color: #C62828;
  font-size: 0.85rem;
  line-height: 22px;
  padding: 0 6px;
}

.th-input__control.th-input--error{
  border-color: #C62828;

}


</style>