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
                <base-input
                  alternative
                  placeholder="The Address You're Concerned About"
                  addon-left-icon="ni ni-map-big"
                ></base-input>
                <base-button type="primary" round block size="lg">
                  Explore posts
                </base-button>
              </div>
              <div class="mt-5 py-5 border-top text-center">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <AddPostModal :modalData="postData" />
                  </div>
                </div>
              </div>
            </div>
          </card>
        </div>
      </section>
    </div>

    <div class="container">
      <div v-for="post in postsList" :key="post.title">
        <card shadow class="posts card-profile mt-5">
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img
                      v-lazy="'img/theme/team-4-800x800.jpg'"
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
              <h3>Title</h3>
              <div class="h6 font-weight-300">
                <i class="ni location_pin mr-2"></i>{{ post.address }}
              </div>
              <div class="h6 mt-4">
                <i class="ni business_briefcase-24 mr-2"></i>{{ post.body }}
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
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
