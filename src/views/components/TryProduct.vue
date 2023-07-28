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
      <section class="section section-skew">
        <div class="container">
          <card shadow class="card-profile mt--300" no-body>
            <div class="px-4">
              <div class="text-center mt-5">
                <h5>Please enter the address you'd like to check out</h5>
                <address-field :address-data="searchAddressData" />
                <base-button
                  type="primary"
                  round
                  block
                  size="lg"
                  @click="explorePosts"
                >
                  Explore posts
                </base-button>
                <div v-if="showAlert">
                  <base-alert
                    v-model="showAlert"
                    type="default"
                    dismissible
                    class="mt-4"
                  >
                    <strong>Oops</strong> We could not locate a neighbourhood
                    for the address you sent, so we're providing you with posts
                    in {{ searchAddressData.city }}
                  </base-alert>
                </div>
              </div>
              <div class="mt-5 py-5 border-top text-center">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <AddPostModal
                      @new-post="explorePosts"
                      :modalData="postData"
                    />
                  </div>
                </div>
              </div>
            </div>
          </card>
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
import AddPostModal from '@/components/AddPostModal.vue';
import AddressField from './AddressField.vue';
import NewAddressField from './NewAddressField.vue';
import { getPostsByNeighbourhood, getPostsByCity } from '../../Requests.js';

export default {
  data() {
    return {
      postsList: [],
      postData: {
        showModal: false,
        addressData: {},
      },
      searchAddressData: {},
      showList: true,
      showAlert: false,
    }
  },
  methods: {
    explorePosts() {
      if ( this.searchAddressData.noNeighbourhood) {
        console.log('searching by city', this.searchAddressData.city)
        this.showAlert = true
        getPostsByCity(this.searchAddressData.city)
          .then(res => {
            if (res.data) {
              this.postsList = res.data.posts;
              this.showList = true;
            } else {
              this.showList = false;
              this.postsList = [];
            }
          })
          .catch(err => {
            this.showList = false;
            this.errorMessage = 'Failed to fetch posts by city. Please try again.';
          });
      } else {
        console.log('searching by neighbourhod', this.searchAddressData.neighbourhood)
        this.showAlert = false
        getPostsByNeighbourhood(this.searchAddressData.neighbourhood)
          .then(res => {
            if (res.data) {
              this.postsList = res.data.posts;
              this.showList = true;
            } else {
              this.showList = false;
              this.postsList = [];
            }
          })
          .catch(err => {
            this.showList = false;
            this.errorMessage = 'Failed to fetch posts by neighbourhood. Please try again.';
          });
      }
    },
  },
  components: {
    AddPostModal,
    AddressField,
    NewAddressField
  },
}
</script>
