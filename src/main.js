import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import Argon from './plugins/argon-kit';
import './registerServiceWorker';
import store from './store/index.js'
Vue.use(Vuex);  // Vuex is used here


Vue.config.productionTip = false;
Vue.use(Argon);
new Vue({
  router,
  store, 
  render: h => h(App)
}).$mount("#app");

