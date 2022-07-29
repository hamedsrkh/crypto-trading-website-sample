<template>
  <div class="sell-form">
    <ThInput prefix="Price" suffix="USDT" type="number" v-model="state.price"
             :error-message="errorMessages.price" data-test="sell-order-price-input"/>
    <ThInput prefix="Amount" suffix="BTC" type="number" v-model="state.amount"
             :error-message="errorMessages.amount" data-test="sell-order-amount-input"/>
    <ThButton title="Sell BTC" :full-width="true" color="danger" @click="submit" data-test="sell-order-submit"/>
  </div>
</template>

<script>
import ThInput from "@/components/elements/ThInput";
import ThButton from "@/components/elements/ThButton";
import {useSubmitOrder} from "@/hooks/useSubmitOrder";

export default {
  name: "SellOrderForm",
  components: {ThButton, ThInput},
  setup (props,context) {
    const { v$, state, errorMessages, submit } = useSubmitOrder(props,context)
    return {
      state,
      v$,
      errorMessages,
      submit
    }
  },
  mounted() {
    this.emitter.on("fill-entry-form", order => {
      if (order.side === 'sell'){
        this.state.price = order.price
      }
    });
  }
}
</script>

<style scoped>

</style>