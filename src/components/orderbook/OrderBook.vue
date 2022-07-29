<template>
  <div class="order-book-container">
    <SectionCard>
      <template #title>
        Order Book
      </template>
      <template #option>
        <select id="order-book-aggregator" v-model="aggregator">
          <option value="">None</option>
          <option v-for="(agg,index) in aggregators" :key="index" :value="agg">{{ agg }}</option>
        </select>
      </template>
      <div class="order-book-wrapper">
        <order-book-head/>
        <div class="order-book-content">
          <order-list :orders="sellOrders" side="sell" data-test="sell-order-list"/>
          <div class="order-book-market-price" data-test="market-price">≈ {{ marketPrice }}</div>
          <order-list :orders="buyOrders" side="buy" data-test="buy-order-list"/>
        </div>
      </div>
    </SectionCard>
  </div>
</template>

<script>
import SectionCard from "@/components/elements/SectionCard";
import OrderList from "@/components/orderbook/OrderList";
import {AggregateOrders} from "@/utils/functions";
import OrderBookHead from "@/components/orderbook/OrderBookHead";

export default {
  name: "OrderBook",
  components: {OrderBookHead, OrderList, SectionCard},
  props: {
    orders: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      aggregator: 10,
      aggregators: [1, 5, 10, 100, 200]
    }
  },
  computed: {
    marketPrice() {
      return ((Number(this.sortedOrders.buy[0].price) + Number(this.sortedOrders.sell[0].price)) / 2).toFixed(2)
    },
    buyOrders() {
      return AggregateOrders(this.sortedOrders.buy, this.aggregator)
    },
    sellOrders() {
      return AggregateOrders(this.sortedOrders.sell, this.aggregator)
    },
    sortedOrders() {
      return {
        buy: this.orders.filter(order => order.side === 'buy').sort((a, b) => {
          return b.price - a.price;
        }),
        sell: this.orders.filter(order => order.side === 'sell').sort((a, b) => {
          return a.price - b.price;
        })
      }
    }
  },
}
</script>

<style scoped>
.order-book-container {
  height: 100%;
}

.order-book-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 0;
}

.order-book-content {
  height: calc(100vh - 150px);
}

.order-book-market-price {
  height: 40px;
  border-top: 1px solid rgba(1, 8, 30, .04);
  border-bottom: 1px solid rgba(1, 8, 30, .04);
  padding: 0 15px;
  display: flex;
  font-size: 20px;
  font-style: italic;
  color: rgba(1, 8, 30, .38);
  align-items: center;
}
</style>