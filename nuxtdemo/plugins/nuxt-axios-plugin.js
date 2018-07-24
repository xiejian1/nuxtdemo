import Vue from 'vue'

import axios from 'axios'

Vue.prototype.$http = axios
Vue.use(axios)  