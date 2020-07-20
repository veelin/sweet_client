<template>
  <div class="stock-name-contain">
    <span>{{ val.contract ? val.contract.symbol:'' }}</span><span> {{ val.longName }}</span> <span> {{ val.contract ? val.contract.exchange :'' }}</span>
  </div>
</template>

<script>

export default {
  name: 'StockName',
  props: {
    val: {
      type: Object,
      default: {
        contract: {},
        longName: ''
      }
    }
  },
  data() {
    return {
    }
  },

  methods: {
  }
}

</script>
<style lang="scss" scoped>
  .stock-name-contain {
    .nbv-value {

    }

    .nbv-unit {
      line-height: 0.3125rem;
      font-size: 0.3125rem;
      color: #409EFF;
    }
  }
</style>
