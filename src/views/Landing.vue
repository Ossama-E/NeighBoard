<template>
    <div>
      <div class="position-relative">
        <!-- shape Hero -->
        <section class="section-shaped my-0">
          <div class="shape shape-style-1 shape-default shape-skew"></div>
          <div class="container shape-container d-flex">
            <div class="col px-0">
              <div class="row">
                <div class="col-lg-6">
                  <h1 class="display-3 text-white">
                    Making Canada Safer
                    <span>One Neighbourhood at a Time</span>
                  </h1>
                  <!-- <p class="lead  text-white">The design system comes with four pre-built pages to help
                                      you get started faster. You can change the text and images and you're good to
                                      go.</p> -->
                  <div class="btn-wrapper" v-if="!isAuthenticated">
                    <router-link to="/login" tag="div" class="inline-div">
                      <base-button
                        class="mb-3 mb-sm-0"
                        type="primary"
                        icon="ni ni-circle-08"
                      >
                        Login
                      </base-button>
                    </router-link>
                    <router-link to="/register" tag="div" class="inline-div">
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
              </div>
            </div>
          </div>
        </section>
        <!-- 1st Hero Variation -->
      </div>
      <section class="section section-lg pt-lg-0 mt--200">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <div class="row row-grid">
                <div class="col-lg-4">
                  <card class="border-0" hover shadow body-classes="py-5">
                    <icon name="ni ni-tag" type="primary" rounded class="mb-4">
                    </icon>
                    <h6 class="text-primary text-uppercase">100% Free</h6>
                    <p class="description mt-3">
                      We don't charge any fees. Crazy right?
                    </p>
                    <!-- <base-button tag="a" href="#" type="primary" class="mt-4">
                                          Learn more
                                      </base-button> -->
                  </card>
                </div>
                <div class="col-lg-4">
                  <card class="border-0" hover shadow body-classes="py-5">
                    <icon
                      name="ni ni-square-pin"
                      type="success"
                      rounded
                      class="mb-4"
                    >
                    </icon>
                    <h6 class="text-success text-uppercase">
                      Explore Garage or Home Sales
                    </h6>
                    <p class="description mt-3">
                      In need of some handy tools? Maybe your neighbour has some
                      on sale
                    </p>
                    <!-- <base-button tag="a" href="#" type="success" class="mt-4">
                                          Learn more
                                      </base-button> -->
                  </card>
                </div>
                <div class="col-lg-4">
                  <card class="border-0" hover shadow body-classes="py-5">
                    <icon
                      name="ni ni-notification-70"
                      type="warning"
                      rounded
                      class="mb-4"
                    >
                    </icon>
                    <h6 class="text-warning text-uppercase">
                      Know When YOU Are In DANGER
                    </h6>
                    <p class="description mt-3">
                      See live reports of any suspicious activites in your
                      neighbourhood
                    </p>
                    <!-- <base-button tag="a" href="#" type="warning" class="mt-4">
                                          Learn more
                                      </base-button> -->
                  </card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddPostModal />
    </div>
    <!-- <card gradient="secondary" shadow body-classes="p-lg-5">
                              <h4 class="mb-1">Want to work with us?</h4>
                              <p class="mt-0">Your project is very important to us.</p>
                              <base-input class="mt-5"
                                          alternative
                                          placeholder="Your name"
                                          addon-left-icon="ni ni-user-run">
                              </base-input>
                              <base-input alternative
                                          placeholder="Email address"
                                          addon-left-icon="ni ni-email-83">
                              </base-input>
                              <base-input class="mb-4">
                                      <textarea class="form-control form-control-alternative" name="name" rows="4"
                                                cols="80" placeholder="Type a message..."></textarea>
                              </base-input>
                              <base-button type="default" round block size="lg">
                                  Send Message
                              </base-button>
                          </card> -->
  </template>
  
  <script>
  import AddPostModal from '../components/AddPostModal.vue';
  export default {
    name: "home",
    components: {
      AddPostModal,
    },
    computed: {
      isAuthenticated() {
          return this.$store.getters['auth/isAuthenticated']
      }
    }
  };
  </script>
  