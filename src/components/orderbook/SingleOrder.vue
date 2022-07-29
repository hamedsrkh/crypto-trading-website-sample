<template>
  <li class="order-item" @click="sendDataToForm(order)" >
    <div :class="{ 'text-red': side === 'sell', 'text-green': side === 'buy' }">{{(order.price % 1 !== 0) ? order.price.toFixed(2) : order.price}}</div>
    <div>{{parseFloat(order.amount).toFixed(2)}}</div>
    <div>{{parseFloat(order.total).toFixed(2)}}</div>
  </li>
</template>

<script>
export default {
  name: "SingleOrder",
  props:{
    order: {
      type: Object,
      required: true
    },
    side:{
      type: String,
      validator(value) {
        return ['buy', 'sell'].includes(value)
      }
    }
  },
  methods:{
    sendDataToForm(order){
      this.emitter.emit('fill-entry-form', {
        side: this.side, price: order.price
      })
    }
  }
}
</script>

<style scoped>
.order-item{
  display: flex;
  justify-content: flex-start;
  padding: 7px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 5px;
}
.order-item:hover{
  background: rgba(1,8,30,.04);
}
.order-item > div{
  flex: 1;
}
.text-red{
  color: rgb(207, 48, 74);
}
.text-green{
  color: rgb(3, 166, 109);
}
</style>