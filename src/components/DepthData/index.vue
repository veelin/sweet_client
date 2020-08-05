<template>
  <div>
    <el-table
      :data="bidTableData"
      style="width: 100%"
      :default-sort="{prop: 'position', order:'descending'}"
      :row-style="{height: '15px'}"
      :cell-style="{padding: '2px'}"
    >
      <el-table-column
        prop="position"
        label="位置"
        width="50"
      />
      <el-table-column
        prop="lessTotalSize"
        label="数量"
        width="80"
      />
      <el-table-column
        prop="price"
        label="价格"
        width="80"
        class-name="red"
      />
      <el-table-column
        prop="size"
        label="数量"
        width="80"
      />
      <el-table-column
        prop="fstSize"
        label="1s"
        width="80"
      />
      <el-table-column
        prop="secSize"
        label="5s"
        width="80"
      />
      <el-table-column
        prop="trdSize"
        label="30s"
        width="80"
      />
    </el-table>
    <el-table
      :data="askTableData"
      style="width: 100%"
      :row-style="{height: '15px'}"
      :cell-style="{padding: '2px'}"
    >
      <el-table-column
        prop="position"
        width="50"
      />
      <el-table-column
        prop="lessTotalSize"
        label="数量"
        width="80"
      />
      <el-table-column
        prop="price"
        width="80"
        class-name="green"
      />
      <el-table-column
        prop="size"
        width="80"
      />
      <el-table-column
        prop="fstSize"
        width="80"
      />
      <el-table-column
        prop="secSize"
        width="80"
      />
      <el-table-column
        prop="trdSize"
        width="80"
      />
    </el-table>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import store from '@/store'

import { EventEnum } from '@/core/channel/event/EventEnum'

import { PageCancelSubscribeCommand } from '@/core/channel/dto/page/subscribe/command/PageCancelSubscribeCommand'
import { PageSubscribeCommand } from '@/core/channel/dto/page/subscribe/command/PageSubscribeCommand'
import { DepthDataCommand } from '@/core/channel/dto/mktdata/command/DepthDataCommand'

const subscribeEvent = [EventEnum.depthData, EventEnum.updateDepthData]
var subscribeEventSet = new Set()

export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      askTableData: [],
      bidTableData: []
    }
  },
  computed: {
    ...mapState({
      sunClient: state => state.client.sunClient,
      depthDataMap: state => state.depth_data.depthDataMap,
      updateDepthDataMap: state => state.depth_data.updateDepthDataMap,
      initTrack: state => state.depth_data.initTrack,
      updateTrack: state => state.depth_data.updateTrack
    })
  },
  watch: {
    initTrack(newValue, oldValue) {
      const datas = this.depthDataMap.get(this.conId)
      for (const depth of datas.values()) {
        if (depth.side === 0) {
          this.askTableData.push(depth)
        } else {
          this.bidTableData.push(depth)
        }
      }
    },
    updateTrack(newValue, oldValue) {
      console.log(this.updateDepthDataMap.get(this.conId).size)
      for (const entry of this.updateDepthDataMap.get(this.conId).entries()) {
        let optArr = null
        const entryPosition = entry[0]
        const data = entry[1]

        if (data.side === 0) {
          optArr = this.askTableData
        } else {
          optArr = this.bidTableData
        }
        let has = false
        for (const e of optArr) {
          if (e.position === entryPosition) {
            e.size = data.size
            e.price = data.price
            e.fstSize = data.fstSize
            e.secSize = data.secSize
            e.trdSize = data.trdSize
            e.lessTotalSize = data.lessTotalSize
            has = true
          }
        }
        if (!has) {
          optArr.push(data)
        }
        for (const rowData of optArr) {
          if (rowData.position > entryPosition) {
            let sumSize = 0
            for (const secRowData of optArr) {
              if (secRowData.position <= rowData.position) {
                sumSize = sumSize + secRowData.size
              }
            }
            rowData.lessTotalSize = sumSize
          }
        }
        this.updateDepthDataMap.get(this.conId).delete(entryPosition)
      }
    }
  },
  created() {
    this.conId = this.$route.query.conId
    const sendMessage = new PageSubscribeCommand()
    subscribeEvent.forEach((e) => subscribeEventSet.add({ 'action': e, 'primerId': this.conId }))
    sendMessage.actions = Array.from(subscribeEventSet)
    this.sunClient.send(JSON.stringify(sendMessage))

    const depthDataCommand = new DepthDataCommand()
    depthDataCommand.conId = this.conId
    this.sunClient.send(JSON.stringify(depthDataCommand))
  },
  mounted() {
  },
  beforeDestroy() {
    const sendMessage = new PageCancelSubscribeCommand()
    sendMessage.actions = Array.from(subscribeEventSet)
    this.sunClient.send(JSON.stringify(sendMessage))
  },
  methods: {
    //     cellCalss: (row, column, rowIndex, columnIndex) => {
    //         if (column.property = 'price') {

    //         }
    //       console.log(row)
    //       console.log(column)

    //       console.log(rowIndex)
    //       console.log(columnIndex)
    //     }
  }
}
</script>

<style>
.highcharts-container {
  width: 600px;
  height: 400px;
  border: 1px solid #ddd;
  margin: auto;
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>
