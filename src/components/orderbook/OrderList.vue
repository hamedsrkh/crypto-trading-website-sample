<template>
  <div class="order-list">
    <ul class="order-items" :class="{'d-column-reverse': side === 'sell' }">
      <SingleOrder :key="index" v-for="(order,index) in orders" :order="order" :side="side" :data-test="`single-order-${side}-${index}`" />
    </ul>
  </div>
</template>

<script>
import SingleOrder from "@/components/orderbook/SingleOrder";
export default {
  name: "OrderList",
  components: {SingleOrder},
  props:{
    orders: {
      type: Array,
      default(){
        return []
      }
    },
    side:{
      type: String,
      validator(value) {
        return ['buy', 'sell'].includes(value)
      }
    }
  }
}
</script>

<style scoped>
.order-list {
  height: calc(50% - 20px);
}
  .order-items{
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 5px 10px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    will-change: scroll-position;
  }
  .d-column-reverse{
    flex-direction: column-reverse;
  }

</style>