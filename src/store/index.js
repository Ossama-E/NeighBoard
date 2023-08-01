import Vue from 'vue';
import Vuex from 'vuex';
import postsModule from './modules/posts/index.js';
import authModule from './modules/auth/index.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    return {
      userId: 'c2',
    }
  },
  modules: {
    posts: postsModule,
    auth: authModule,
  },
});

export default store;
