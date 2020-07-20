<template>

  <div class="client-container">
    <el-row type="flex" justify="space-around">
      <el-col :span="24">
        连接状态：{{ getConnStat(sunClient.conn.readyState) }}
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12">
        <el-button type="primary" round @click="initIb">初始化IB</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" round @click="subAccount">订阅账户</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import {
  mapState
} from 'vuex'

export default {

  name: 'Dashboard',
  created() {
  },
  computed: {
    ...mapState({
      sunClient: state => state.client.sunClient
    })
  },
  methods: {
    initIb() {
      console.log(111)
      const sendMessage = {
        action: 'initIb'
      }
      this.sunClient.send(JSON.stringify(sendMessage))
    },
    subAccount() {
      const sendMessage = {
        action: 'accountSubscription'
      }
      this.sunClient.send(JSON.stringify(sendMessage))
    },
    getConnStat(status) {
      // 0 - 表示连接尚未建立。
      // 1 - 表示连接已建立，可以进行通信。
      // 2 - 表示连接正在进行关闭。
      // 3 - 表示连接已经关闭或者连接不能打开。
      if (status === 0) {
        return '连接尚未建立'
      } else if (status === 1) {
        return '连接已建立'
      } else if (status === 2) {
        return '连接正在进行关闭'
      } else if (status === 3) {
        return '连接已经关闭或者连接不能打开'
      }
      return '未连接'
    }
  }

}
</script>

<style lang="scss" scoped>
  .client {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
