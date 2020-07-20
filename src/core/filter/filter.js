import Vue from 'vue'

const decimalFormat = new Intl.NumberFormat()
Vue.filter('commaCurrency', function(num) {
  if (num) {
    return decimalFormat.format(num)
  }
})

Vue.filter('formatTwoDecimal')

const commaCurrency = Vue.filter('commaCurrency')

export default {
  commaCurrency
}
