<template>
  <div class="order-book-head">
    <div class="order-book-head-item">Price(USDT)</div>
    <div class="order-book-head-item">Amount(BTC)</div>
    <div class="order-book-head-item">Total(BTC)</div>
  </div>
</template>

<script>
export default {
  name: "OrderBookHead"
}
</script>

<style scoped>
.order-book-head {
  display: flex;
  align-items: center;
  padding: 0 10px 10px;
}

.order-book-head .order-book-head-item {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0;
  font-size: 12px;
  color: rgb(112, 122, 138);
}
</style>