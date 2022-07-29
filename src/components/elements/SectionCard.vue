<template>
  <div class="card">
    <div class="card-title">
      <span><slot name="title"/></span>
      <span><slot name="option"/></span>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionCard"
}
</script>

<style scoped>
.card {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: block;
  max-width: 100%;
}
.card-title{
  font-weight: bold;
  border-bottom: 1px solid #e3e3e3;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.card-body{
  position: relative;
}
</style>

