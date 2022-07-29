<template>
  <div class="order-entry-container">
    <SectionCard>
      <template #title>
        Order Entry
      </template>
      <template #default>
        <div class="container-fluid order-entry-forms">
          <div class="row">
            <div class="col-6">
              <BuyOrderForm data-test="buy-order-form" @submit="submitBuyOrder"/>
            </div>
            <div class="col-6">
              <SellOrderForm data-test="sell-order-form" @submit="submitSellOrder"/>
            </div>
          </div>
        </div>
      </template>
    </SectionCard>
  </div>
</template>

<script>
import SectionCard from "@/components/elements/SectionCard";
import BuyOrderForm from "@/components/orderEntry/BuyOrderForm";
import SellOrderForm from "@/components/orderEntry/SellOrderForm";
import {storeOrder} from "@/api/orders";

export default {
  name: "OrderEntry",
  components: {SellOrderForm, BuyOrderForm, SectionCard},
  methods: {
    async submitSellOrder(data) {
      const res = await storeOrder({...data, side: 'sell'})
      if (res.data.result === 'inserted') this.$emit('newOrder', res.data.order)
    },
    async submitBuyOrder(data) {
      const res = await storeOrder({...data, side: 'buy'})
      if (res.data.result === 'inserted') this.$emit('newOrder', res.data.order)
    }
  }
}
</script>

<style scoped>
.order-entry-forms{
  padding-bottom: 20px;
}
</style>