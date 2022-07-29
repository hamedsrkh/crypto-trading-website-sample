<template>
  <div class="trading-view-container">
    <SectionCard>
      <template #title>
        Trading view
      </template>
      <template #default>
        <Chart :options='{
        height: "550px",
        width: "100%",
        symbol: "BINANCE:BTCUSDT",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        allow_symbol_change: true,
        }'/>
      </template>
    </SectionCard>
  </div>
</template>

<script>
import SectionCard from "@/components/elements/SectionCard";
import {Chart} from 'vue-tradingview-widgets';

export default {
  name: "TradingView",
  components: {SectionCard, Chart}
}
</script>

<style scoped>
#tradingview-chart{
  min-height: 50vh;
}
.trading-view-container {
  margin-bottom: 20px;
}
</style>



