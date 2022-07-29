<template>
<button class="th-button" :class="classes" :type="type">{{title}}</button>
</template>

<script>
export default {
  name: "ThButton",
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'button'
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'danger', 'success'].includes(value)
      }
    },
  },
  computed:{
    classes(){
      return {
        'th-btn--full-with': this.fullWidth,
        'th-btn--danger': this.color === 'danger',
        'th-btn--success': this.color === 'success',
        'th-btn--primary': this.color === 'primary',
      }
    }
  }
}
</script>

<style scoped>
.th-button{
  color: rgb(255, 255, 255);
  height: 32px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 500;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
}

.th-button:hover{
  opacity: 0.9;
}

.th-btn--full-with{
  display: block;
  width: 100%;
}

.th-btn--danger{
  background-color: rgb(207, 48, 74);
}
.th-btn--success{
  background-color: rgb(3, 166, 109);

}
.th-btn--primary{
  background-color: #2196f3
}

</style>