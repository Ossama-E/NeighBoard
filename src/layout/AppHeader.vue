<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                <img src="img/brand/white.png" alt="logo">
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
                        <img src="img/brand/blue.png">
                    </a>
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>

            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                
                <router-link to="/" class="nav-link">Home</router-link>
                <router-link to="/register" v-if="!isAuthenticated" class="nav-link">Register</router-link>
                <router-link to="/login" v-if="!isAuthenticated" class="nav-link">Login</router-link>
                <router-link to="/viewposts" v-if="isAuthenticated" class="nav-link">Explore Posts</router-link>
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-collection d-lg-none"></i>
                        <span class="nav-link-inner--text">Examples</span>
                    </a>
                    <router-link to="/landing" class="dropdown-item">Landing</router-link>
                    <router-link to="/profile" class="dropdown-item">Profile</router-link>
                    <router-link to="/login" class="dropdown-item">Login</router-link>
                    <router-link to="/register" class="dropdown-item">Register</router-link>
                </base-dropdown>
            </ul>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://www.linkedin.com/in/ossamaelhelali/" target="_blank" rel="noopener"
                       data-toggle="tooltip" title="Connect with me on LinkedIn">
                        <i class="fa fa-linkedin"></i>
                        <span class="nav-link-inner--text d-lg-none">Twitter</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://github.com/Ossama-E"
                       target="_blank" rel="noopener" data-toggle="tooltip" title="Visit my Github">
                        <i class="fa fa-github"></i>
                        <span class="nav-link-inner--text d-lg-none">Github</span>
                    </a>
                </li>
                 <li class="nav-item d-none d-lg-block ml-lg-4" v-if="!isAuthenticated">
                <router-link to="/tryproduct" class="btn btn-neutral btn-icon">
                <span class="btn-inner--icon">
                    <i class="ni ni-user-run mr-2"></i>
                </span>
                <span class="nav-link-inner--text">Try Product as Guest</span>
                </router-link>
                </li>
                <li class="nav-item" v-if="isAuthenticated">
                    <base-dropdown icon="ni ni-circle-08">
    <base-button slot="title" icon="ni ni-circle-08" type="secondary" class="dropdown-toggle">
    </base-button>
    <router-link to="/profile" class="dropdown-item">Profile</router-link>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item text-warning" @click="logout">Logout</a>
  </base-dropdown>

                </li>
            </ul>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  computed: {
    isAuthenticated() {
        return this.$store.getters['isAuthenticated']
    }
  },
  methods:{
    logout() {
        this.$store.dispatch('logout')
        this.$router.replace('/login')
    }
  }
};
</script>
<style>
</style>
