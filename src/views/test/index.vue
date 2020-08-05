<template>
  <div>
    <el-button @click="testMapWatch()">测试map watch</el-button>
  </div>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'
export default {
  name: 'Dashboard',
  components: {
  },

  data() {
    return {
      daaa: 1,
      ccc: new Map()
    }
  },
  created() {
  },
  beforeDestroy() {
  },
  computed: {
    ...mapState({
      historicalMktDataMap: state => state.historical_mktdata.historicalMktDataMap,
      bbbb: state => state.historical_mktdata.bbbb
    })
  },
  watch: {
    ccc: {
      deep: true,
      handler(newValue, oldValue) {
        console.log(1)
        console.log('update from ' + newValue + ' to ' + oldValue)
      }

    },
    daaa: function() {
      console.log(2)
    }
  },
  methods: {
    testMapWatch: function(event) {
      var date = new Date()
      this.ccc.set(date.getTime + '', date)
      console.log('aa')
      this.daaa = 3
      store.dispatch('historical_mktdata/test', '')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
