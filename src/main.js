import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import Argon from './plugins/argon-kit';
import './registerServiceWorker';

Vue.use(Vuex);  // Vuex is used here

const store = new Vuex.Store({
  state: {
    currUser: 'ossama',  // Assuming currUser is an object, if not, set your default value
  },
});

Vue.config.productionTip = false;
Vue.use(Argon);
new Vue({
  router,
  store,  // Vuex store is added to the Vue instance here
  render: h => h(App)
}).$mount("#app");
