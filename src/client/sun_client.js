import store from '@/store'

// readyState
// 0 - 表示连接尚未建立。
// 1 - 表示连接已建立，可以进行通信。
// 2 - 表示连接正在进行关闭。
// 3 - 表示连接已经关闭或者连接不能打开。
export class SunClient {
  constructor(url, heartChecknterval) {
    this.url = url
    this.heartChecknterval = heartChecknterval
  }

  connect(callback) {
    return new Promise((resolve, reject) => {
      if (this.connected) {
        return
      }
      this.connectCallback = callback
      this.conn = new WebSocket(this.url)

      this.conn.onopen = () => {
        this.connected = true
        this.onOpen()
        resolve(this.connected)
      }

      this.conn.onclose = (e) => {
        this.connected = false
        this.onClose(e)
      }

      this.conn.onerror = (event) => {
        this.onError(event)
        reject(event)
      }

      this.conn.onmessage = (event) => {
        this.onMessage(event.data)
      }
    })
  }

  heartCheckUtil = {
    start: () => {
      this.heartCheckObj = setInterval(() => {
        if (this.conn && this.conn.readStat === 1) {
          this.conn.send('')
        }
      }, this.heartChecknterval)
    },
    reset: () => {
      clearInterval(this.heartCheckObj)
      this.heartCheckUtil.start()
    },

    stop: () => {
      if (this.heartCheckObj) {
        clearInterval(this.heartCheckObj)
      }
    }
  }

  reconnectUtil = {
    start: () => {
      this.reconnectObj = setTimeout(() => {
        if (this.conn.readyState === 3) {
          this.reconnectStarting = true
          this.connect(() => { console.log('reconnect succuss!') })
        }
      }, 5000)
    },

    stop: () => {
      this.reconnectStarting = false
      if (this.reconnectObj) {
        clearTimeout(this.reconnectObj)
        this.reconnectObj = null
      }
    }
  }

  onOpen() {
    if (this.connectCallback != null) {
      this.connectCallback(this)
    }
    const reconnectStarting = this.reconnectStarting
    this.reconnectUtil.stop()
    if (reconnectStarting && this.handleReconnectSuccessed) {
      this.handleReconnectSuccessed()
    }
    if (this.handleUserOnline) {
      this.handleUserOnline()
    }
    this.heartCheckUtil.start()
  }

  onClose(e) {
    console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
    console.log(e)
    console.log('ws closed')
    this.heartCheckUtil.stop()
    this.reconnectUtil.start()
    if (this.handleConnectionClosed) {
      this.handleConnectionClosed()
    }
  }
  onError(error) {
    console.error(error)
  }

  onMessage(message) {
    // console.log(message)
    if (message !== '') {
      this.handleMessage(JSON.parse(message))
    }
    // this.heartCheckUtil.reset()
  }

  send(message) {
    if (this.connected) {
      this.conn.send(message)
      // this.heartCheckUtil.reset()
    }
  }

  handleMessage(message) {
    // console.log(message)
    switch (message.action) {
      case 'accountData':
        store.dispatch('account/updateAccountDTO', message)
        break
      case 'positionData':
        store.dispatch('account/updatePortfolio', message)
        break
      case 'accountPnlData':
        store.dispatch('account/updateAccountPnl', message)
        break
      case 'singlePnlData':
        store.dispatch('account/updateSinglePnl', message)
        break
      case 'contractDetailData':
        store.dispatch('contract/contractDetail', message)
        break
      case 'topMktData':
        store.dispatch('top_mktdata/topMktDataDetail', message)
        break
      case 'historicalMktData':
        store.dispatch('historical_mktdata/historicalMktData', message)
        break
      case 'incrementalHistoricalMktData':
        store.dispatch('historical_mktdata/incrementalHistoricalMktData', message)
        break
      case 'tickMktData':
        store.dispatch('top_mktdata/tickMktData', message)
        break
      case 'incrementalTickMktData':
        store.dispatch('top_mktdata/incrementalTickMktData', message)
        break
      case 'depthData':
        store.dispatch('depth_data/depthData', message)
        break
      case 'updateDepthData':
        store.dispatch('depth_data/updateDepthData', message)
        break
    }
  }
}
