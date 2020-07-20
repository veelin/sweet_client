<template>
  <div class="dbv-contain">
    <span class="dbv-value">{{ formatValue(val) }}</span>
  </div>
</template>

<script>
const decimalFormat = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
const shortFormat = new Intl.NumberFormat('en-GB', { notation: 'compact' })

export default {
  name: 'Dbv',
  components: {
  },
  props: {
    val: {
      type: Number,
      default: 0.00
    },
    format: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
    }
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
  .dbv-contain {
    .dbv-value {

    }
  }
</style>
