<template>
  <main class="main container">
    <div class="row">
      <div class="col-4">
        <section class="order-book">
          <OrderBook v-if="orders.length" :orders="orders"/>
        </section>
      </div>
      <div class="col-8">
        <section class="order-content">
          <TradingView/>
          <OrderEntry @newOrder="addNewOrder"/>
        </section>
      </div>
    </div>
  </main>
</template>

<script>

import OrderBook from "@/components/orderbook/OrderBook";
import OrderEntry from "@/components/orderEntry/OrderEntry";
import TradingView from "@/components/TradingView";
import {getOrders} from "@/api/orders";

export default {
  name: 'App',
  components: {TradingView, OrderEntry, OrderBook},
  data() {
    return {
      connection: null,
      orders: []
    }
  },
  methods: {
    insertOrders(newOrders) {
      this.orders = [...this.orders, ...newOrders]
    },
    deleteOrders(deletedOrders) {
      this.orders = this.orders.filter(order => !deletedOrders.includes(order.id))
    },
    addNewOrder(order){
      this.orders = [...this.orders, order]
    },
    startWebsocket(){
      this.connection = new WebSocket("ws://localhost:8080")

      this.connection.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.existing) this.orders = data.existing
        if (data.delete) this.deleteOrders(data.delete)
        if (data.insert) this.insertOrders(data.insert)
      }

      this.connection.onopen = () => {
        console.log("Successfully connected to the echo websocket server...")
      }
    }
  },
  async created() {
    const result = await getOrders()
    this.orders = result.data
  },
}
</script>

<style scoped>
.main {
  height: 100%;
  padding-top: 20px;
}

.order-content {
  height: 100%;
}
</style>
