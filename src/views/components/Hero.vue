<template>
    <section class="section-hero section-shaped my-0">
      <div class="shape shape-style-1 shape-primary">
        <span class="span-150"></span>
        <span class="span-50"></span>
        <span class="span-50"></span>
        <span class="span-75"></span>
        <span class="span-100"></span>
        <span class="span-75"></span>
        <span class="span-50"></span>
        <span class="span-100"></span>
        <span class="span-50"></span>
        <span class="span-100"></span>
      </div>
      <div class="container shape-container d-flex align-items-center">
        <div class="col px-0">
          <div class="row justify-content-center align-items-center">
            <div class="col-lg-7 text-center pt-lg">
              <img
                src="img/brand/white.png"
                style="width: 200px"
                class="img-fluid"
              />
              <p class="lead text-white mt-4 mb-5">
                Making Canada Safer, One Neighbourhood at a Time
              </p>
              <div class="btn-wrapper">
                <router-link to="/login" tag="div" class="inline-div">
                  <base-button
                    class="mb-3 mb-sm-0"
                    type="info"
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
  
          <div
            class="row align-items-center justify-content-around stars-and-coded"
          >
                <section class="section section-lg pt-lg-0">
              <tabs fill class="flex-column flex-md-row">
                <card shadow slot-scope="{activeTabIndex}">
                  <tab-pane key="tab1">
                    <template slot="title">
                      <i class="ni ni-tag mr-1"></i>100% Free
                    </template>
  
                    <p class="h5">
                      We don't charge any fees. Crazy right?
                    </p>
                  </tab-pane>
  
                  <tab-pane key="tab2">
                    <template slot="title">
                      <i class="ni ni-square-pin mr-1"></i>Stay Updated
                    </template>
  
                    <p class="h5">
                        In need of some handy tools? Maybe your neighbour has some on sale
                    </p>
                  </tab-pane>
  
                  <tab-pane key="tab3">
                    <template slot="title">
                      <i class="ni ni-notification-70 mr-1"></i>Know When You're In Danger
                    </template>
  
                    <p class="h5 bold">
                        See live reports of any suspicious activites in your neighbourhood
                    </p>
                  </tab-pane>
                </card>
              </tabs>
              <router-link to="/viewposts" tag="div">
                        <base-button
                          type="primary"
                          round
                          block
                          size="lg"
                          class="mt-4"
                        >
                          Explore Posts Now
                        </base-button>
                      </router-link>
            </section>
            
          </div>
        </div>
      </div>
    </section>
  </template>
  <script>
  import Tabs from "@/components/Tabs/Tabs.vue";
  import TabPane from "@/components/Tabs/TabPane.vue";
  export default {
      components:{
          Tabs,
          TabPane,
      }
  };
  </script>
  
  <style>
  .inline-div {
    display: inline-block;
    margin-right: 10px;
  }
  </style>
  