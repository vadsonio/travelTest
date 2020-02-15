import Vue from 'vue'
import App from './App.vue'

import "normalize.css"

// vuex global store
import store from './store/index.js';

// directives
import './directives/directives';

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
