import Vue from 'vue'
import './config/composition-api'
import Vuetify from 'vuetify'
import ECharts from 'vue-echarts'
import router from './config/router.config'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import app from './App'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.component('v-chart', ECharts)

new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify(),
    render: (h) => h(app),
})
