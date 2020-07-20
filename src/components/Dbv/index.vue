<template>
  <div class="nbv-contain">
    <span class="nbv-value">{{formatValue(val.value)}}</span> <span class="nbv-unit">{{val.unit}}</span>
  </div>
</template>

<script>
const decimalFormat = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2, minimumIntegerDigits: 2 })
const shortFormat = new Intl.NumberFormat('en-GB', { notation: 'compact' })

export default {
  name: 'Nbv',
  props: {
    val: {
      type: Object,
      default: {
        value: 0.0,
        unit: 'Base'
      }
    },
    format: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      value: this.val.value,
      unit: this.val.unit
    }
  },
  components: {
  },
  methods: {
    formatValue(num) {
      if (num) {
        if (this.format === 'short') {
          return shortFormat.format(num)
        }
        return decimalFormat.format(num)
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .nbv-contain {
    .nbv-value {

    }

    .nbv-unit {
      line-height: 0.3125rem;
      font-size: 0.3125rem;
      color: #409EFF;
    }
  }
</style>
