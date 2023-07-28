import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import ViewPosts from './views/components/ViewPosts.vue';
import TryProduct from './views/components/TryProduct.vue';
import NotFound from '@/views/components/NotFound.vue'
import AlreadyIn from '@/views/components/AlreadyIn.vue'
import store from './store/index.js'

Vue.use(Router);

let router = new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: '/already-logged-in',
      name: 'alreadyLoggedIn',
      components: {
        header: AppHeader,
        default: ViewPosts,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    },
    {
      path: "/viewposts",
      name: "posts",
      components: {
        header: AppHeader,
        default: ViewPosts,
        footer: AppFooter
      }
    },
    {
      path: "/tryproduct",
      name: "try_product",
      components: {
        header: AppHeader,
        default: TryProduct,
        footer: AppFooter
      }
    },
    {
      path: "/alreadyin",
      name: "already_in",
      components: {
        header: AppHeader,
        default: AlreadyIn,
        footer: AppFooter
      }
    },
    {
      path: "*",
      name: "not_found",
      components: {
        header: AppHeader,
        default: NotFound,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && store.getters['isAuthenticated']) {
    next({ name: 'already_in' })
  } else {
    next()
  }
})



export default router