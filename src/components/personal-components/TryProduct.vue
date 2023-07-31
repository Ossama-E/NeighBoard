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
          <tabs @tab-change="changeList">
  <tab-pane title="All Posts" @click="changeList('All Posts')"></tab-pane>
  <tab-pane title="Activity" @click="changeList('Activity')"></tab-pane>
  <tab-pane title="Report" @click="changeList('Report')"></tab-pane>
</tabs>

        </div>
      </section>
      <div class="container">
      <div v-for="post in filteredList" :key="post.title">
        <post-template :post="post"/>
      </div>
    </div>
    </div>

  </div>
</template>

<script>
import AddPostModal from '@/components/personal-components/AddPostModal.vue';
import AddressField from '@/components/personal-components/AddressField.vue';
import PostTemplate from './PostTemplate.vue';
import { getPostsByNeighbourhood, getPostsByCity } from '../../Requests.js';
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";

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
      filteredList: [],
    }
  },
  methods: {
    explorePosts() {
      if ( this.searchAddressData.noNeighbourhood) {
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
    changeList(type) {
    this.listType = type;
    if (type == 'All Posts') {
      this.filteredList = this.postsList;
      return;
    }
    let postsArray = Object.values(this.postsList);
    this.filteredList = postsArray.filter(post => post.postType == type);
  },
  },
  components: {
    AddPostModal,
    AddressField,
    PostTemplate,
    Tabs,
    TabPane
  },
}
</script>
