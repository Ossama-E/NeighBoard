<template>
  <div class="profile-page">
    <div class="profile-page">
      <section class="section-profile-cover section-shaped my-0">
        <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
      <section class="section section-skew">
        <div class="container">
          <card shadow class="card-profile mt--300" no-body>
            <div class="px-4">
              <div class="text-center mt-5">
                <h5>Please enter the address you'd like to check out</h5>
                <address-field
                  :address-data="searchAddressData"
                  @input-cleared="resetSearchAddressData"
                />
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
            <tab-pane
              title="All Posts"
              @click="changeList('All Posts')"
            ></tab-pane>
            <tab-pane
              title="Activity"
              @click="changeList('Activity')"
            ></tab-pane>
            <tab-pane title="Report" @click="changeList('Report')"></tab-pane>
          </tabs>
        </div>
      </section>
    </div>
    <div v-if="showList" class="container">
      <div v-for="post in filteredList" :key="post.title">
        <post-template :post="post" />
      </div>
    </div>
    <div v-if="!showList">
      <p class="text-center mt-5">
        There are no posts to display for this region.
      </p>
    </div>
  </div>
</template>

<script>
import AddPostModal from '@/components/personal-components/AddPostModal.vue';
import AddressField from '@/components/personal-components/AddressField.vue';
import PostTemplate from './PostTemplate.vue';
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import { getPostsByNeighbourhood, getPostsByCity } from '../../Requests.js';

export default {
  data() {
    return {
      postsList: [],
      postData: {
        addressData: {},
        postType: 'Activity',
      },
      searchAddressData: {
        city: '',
        neighbourhood: '',
        noNeighbourhood: false,
        fullAddress: '',
      },
      showList: true,
      showAlert: false,
      listType: 'All Posts',
      filteredList : [],
    }
  },
  methods: {
    explorePosts() {
  if (this.searchAddressData.noNeighbourhood) {
    this.showAlert = true;
    this.fetchPosts(getPostsByCity, this.searchAddressData.city);
  } else {
    this.showAlert = false;
    this.fetchPosts(getPostsByNeighbourhood, this.searchAddressData.neighbourhood);
  }
},
    fetchPosts(fetchMethod, param) {
  fetchMethod(param)
    .then(res => {
      if (res.data) {
        console.log('from fetching ', res.data.name)
        this.postsList = res.data.posts;
        this.showList = true;
      } else {
        this.showList = false;
        this.postsList = [];
      }
      this.changeList(this.listType);
    })
    .catch(err => {
      this.showList = false;
      this.errorMessage = `Failed to fetch posts. Please try again.`;
    });
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

    resetSearchAddressData() {
    this.searchAddressData.city = '';
    this.searchAddressData.neighbourhood = '';
    this.searchAddressData.noNeighbourhood = false;
    this.searchAddressData.fullAddress = '';
  },
  },
  components: {
    AddPostModal,
    AddressField,
    PostTemplate,
    Tabs,
    TabPane
  },
  watch: {
  'searchAddressData': {
    handler: function(val, oldVal) {
      if (val.fullAddress.trim() === '') {
        this.resetSearchAddressData();
      }
    },
    deep: true
  }
},
}
</script>
