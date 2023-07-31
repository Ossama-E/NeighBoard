<template>
  <card shadow class="posts card-profile mt-5">
    <div class="px-4">
      <div class="row justify-content-center">
        <div class="col-lg-3 order-lg-2">
          <div class="card-profile-image">
            <a href="#">
              <img v-lazy="'img/theme/team-4-800x800.png'" class="rounded-circle" />
            </a>
          </div>
        </div>
        <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
        </div>
      </div>
      <div class="text-center mt-5">
        <icon :name="postAttributes.iconType" :type="postAttributes.type" rounded class="mb-4"></icon>
        <h3 :class="postAttributes.textClass"> <strong>{{ post.title }}</strong></h3>
        <div class="h6 font-weight-300">
          <i class="ni location_pin mr-2"></i>{{ post.addressData.fullAddress }}
        </div>
        <div class="h6 mt-4">
          <i class="ni business_briefcase-24 mr-2"></i>{{ post.description }}
        </div>
      </div>
    </div>
  </card>
</template>

<script>
export default {
  props: {
    post: { type: Object },
    showButtons: {type: Boolean, default: false},
    fromProfile: {type: Boolean, default: false},
  },
  computed: {
    postAttributes() {
      const attributes = {
        'Activity': {
          iconType: 'ni ni-square-pin',
          type: 'success',
          textClass: 'text-success'
        },
        'default': {
          iconType: 'ni ni-notification-70 danger',
          type: 'warning',
          textClass: 'text-danger'
        }
      };
      return attributes[this.post.postType] || attributes.default;
    },
    isAuthenticated() {
        return this.$store.getters['isAuthenticated']
    },
  },
  methods: {
    editItem(item) {
      console.log('this is the item', item)
    }
  }
};
</script>
