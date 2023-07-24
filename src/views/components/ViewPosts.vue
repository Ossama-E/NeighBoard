<template>
  <div class="profile-page">
    
    <section class="section-shaped my-0">
    </section>
    <div class="position-relative">
            <!-- shape Hero -->
            <section class="section-shaped my-0">
                <div class="shape shape-style-1 shape-default shape-skew">
                </div>
                <div class="container shape-container d-flex">
                    <div class="col px-0">
                        <div class="row">
                            <div class="col-lg-6">
                                <h1 class="display-3  text-white">You're Now Browsing --posttype-- in --useraddress--
                                </h1>
                                </div>
                                </div>
                                </div>
                                </div>
                              </section>
                                </div>
                                <AddPostModal :modalData="postData"/>
      <div class="container">
        <div v-for="post in postsList" :key="post.title">
        <card shadow class="posts card-profile mt-5">
          <!-- Card content -->
          <div class="px-4">
                      <div class="row justify-content-center">
                          <div class="col-lg-3 order-lg-2">
                              <div class="card-profile-image">
                                  <a href="#">
                                      <img v-lazy="'img/theme/team-4-800x800.jpg'" class="rounded-circle">
                                  </a>
                              </div>
                          </div>
                          <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                              <div class="card-profile-actions py-4 mt-lg-0">
                                  <base-button type="info" size="sm" class="mr-4">Connect</base-button>
                                  <base-button type="default" size="sm" class="float-right">Message</base-button>
                              </div>
                          </div>
                      </div>
                      <div class="text-center mt-5">
                          <icon name="ni ni-square-pin" type="success" rounded class="mb-4"></icon>
                          <h3>Title</h3>
                          <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>{{ post.address }}</div>
                          <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>{{ post.body }}</div>
                      </div>
              </div>
        </card>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex';
import AddPostModal from '@/components/AddPostModal.vue';
export default {
  created() {
    console.log('created')
    console.log('the getter', this.$store.getters['posts/posts']);
  },
  props: {
    type: {
      type: String,
      default: () => 'primary'
    },
    title: {
      type: String,
      default: () => ''
    },
    body: {
      type: String, 
      default: () => ''
    },
    posts: {
      type: Array,
      default: () => [{ 
        title: 'warning test',
        type: 'warning',
        body: 'oh my god, something scary',
        address:"1289 some road, BC"
      },]
    }
  },
  methods: {
    getTextClass(type) {
      if (type === 'warning') {
        return 'text-warning text-uppercase';
      } else {
        return 'text-primary text-uppercase';
      }
    },
  },
  components: {
    AddPostModal,
  },
  data() {
    return {
      postData: {
        showModal: false,
        
      },
    }
  }, 
  computed: {
    postsList() {
      return this.$store.getters.posts
    }
  }
}
</script>

