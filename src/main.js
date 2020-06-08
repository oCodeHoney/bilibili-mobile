import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from '../http'

import Vant from 'vant';
import 'vant/lib/index.css';
import { Toast } from 'vant';

import '@/assets/style.css'

Vue.prototype.$http = http
Vue.prototype.$msg = Toast

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')