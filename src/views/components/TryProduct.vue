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
                  <h1 class="display-3 text-white">
                    You get to try our product!
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div>
      <section class="section section-lg pt-lg-0 section-contact-us">
        <div class="container">
          <div class="row justify-content-center mt--300">
            <div class="col-lg-8">
              <div>
                <card gradient="secondary" shadow body-classes="p-lg-5">
                  <h4 class="mb-1">Lucky you, you get to try our product :)</h4>
                  <p class="mt-0">Your feedback is very important to us.</p>
                  <base-input
                    class="mt-5"
                    placeholder="Your name (optional)"
                    addon-left-icon="ni ni-user-run"
                  ></base-input>
                  <AddressField :address-data="addressData" />
                  <base-button
                    type="primary"
                    @click="explorePosts"
                    round
                    block
                    size="lg"
                  >
                    Explore Posts
                  </base-button>
                </card>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="container">
      <div v-for="post in postsList" :key="post.title">
        <card shadow class="posts card-profile mt-5">
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img
                      v-lazy="'img/theme/team-4-800x800.png'"
                      class="rounded-circle"
                    />
                  </a>
                </div>
              </div>
              <div
                class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
              >
                <div class="card-profile-actions py-4 mt-lg-0">
                  <base-button type="info" size="sm" class="mr-4"
                    >Connect</base-button
                  >
                  <base-button type="default" size="sm" class="float-right"
                    >Message</base-button
                  >
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <icon
                name="ni ni-square-pin"
                type="success"
                rounded
                class="mb-4"
              ></icon>
              <h3>{{post.title}}</h3>
              <div class="h6 font-weight-300">
                <i class="ni location_pin mr-2"></i>{{ post.addressData.fullAddress }}
              </div>
              <div class="h6 mt-4">
                <i class="ni business_briefcase-24 mr-2"></i>{{ post.description }}
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>
    </div>

  </div>
</template>

<script>
import AddressField from './AddressField.vue';
import { getPostsByNeighbourhood } from '../../Requests.js'
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
  props: {},
  methods: {
    explorePosts() {
      // const userId = this.$store.getters['auth/userId'];
      // const token =  this.$store.getters['auth/token'];
      getPostsByNeighbourhood(this.addressData.neighbourhood)
      .then(res => {console.log('posts from searching for this neighbhood, ', res.data.posts)
    this.postsList = res.data.posts})
      .catch(err => console.log(err))
    }
  },
};
</script>
