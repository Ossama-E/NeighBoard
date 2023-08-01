<template>
  <div class="profile-page">
    <div class="profile-page">
      <section class="section-shaped my-0"></section>
      <div class="position-relative">
        <!-- shape Hero -->
        <section class="section-shaped my-0">
          <div class="shape shape-style-1 shape-default shape-skew"></div>
          <div class="container shape-container d-flex">
            <div class="col px-0">
              <div class="row">
                <div class="col-lg-6">
                  <h1 class="display-1 text-white">Oops, wrong link!</h1>
                  <h4 class="display-5 text-white">
                    Here Are Some Links To Guide You Back:
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div>
      <section class="section section-lg pt-lg-0 mt--200">
        <div class="container">
          <div class="btn-wrapper">
              <router-link to="/" tag="div" class="inline-div">
                <base-button
                  class="mb-3 mb-sm-0"
                  type="default"
                  icon="ni ni-world"
                >
                  Home
                </base-button>
              </router-link>
              <router-link to="/viewposts" tag="div" class="inline-div">
                <base-button
                  class="mb-3 mb-sm-0"
                  type="white"
                  icon="ni ni-square-pin"
                >
                  Explore Posts
                </base-button>
              </router-link>
              <router-link v-if="!isAuthenticated" to="/login" tag="div" class="inline-div">
                <base-button
                  class="mb-3 mb-sm-0"
                  type="default"
                  icon="ni ni-circle-08"
                >
                  Login
                </base-button>
              </router-link>
              <router-link v-if="!isAuthenticated" to="/register" tag="div" class="inline-div">
                <base-button
                  class="mb-3 mb-sm-0"
                  type="white"
                  icon="ni ni-badge"
                >
                  Sign-Up
                </base-button>
              </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import AddressField from '@/components/personal-components/AddressField.vue';
export default {
  data() {
    return {
      addressData: {
        neighbourhood: null,
        postalCode: null,
        fullAddress: null,
      },
      postsList: [],
    }
  },
  components: {
    AddressField
  },
  computed: {
      isAuthenticated(){
        return this.$store.getters.isAuthenticated
      }
    }
};
</script>
