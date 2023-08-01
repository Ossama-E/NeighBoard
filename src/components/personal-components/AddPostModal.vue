<template>
  <div class="text-center">
    <base-button
      v-if="!attemptedToPost"
      type="primary"
      text-align="center"
      class="mb-3"
      @click="canAddPost"
    >
      Add Post
    </base-button>
    <router-link to="/register">
      <base-button
        v-if="attemptedToPost"
        type="primary"
        text-align="center"
        class="mb-3"
        @click="canAddPost"
      >
        Create an account
      </base-button>
    </router-link>
    <base-alert v-if="showAlert" type="warning">
      <strong>Warning!</strong> You need to have an account to be able to post
    </base-alert>
    <modal
      :show.sync="showModal"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-lg"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <div class="text-muted text-center mb-3">
          <h3>Add a Post</h3>
        </div>
        <template>
          <form role="form">
            <base-input
              alternative
              v-model.trim="modalData.title"
              class="mb-3"
              placeholder="Title"
              addon-left-icon="ni ni-bold"
            >
            </base-input>
            <AddressField
              :key="componentKey"
              :address-data="modalData.addressData"
            />

            <form addon-left-icon="ni ni-map-big">
              <textarea
                v-model.trim="modalData.description"
                class="form-control form-control-alternative"
                rows="3"
                placeholder="Description"
              ></textarea>
            </form>
            <div class="last-level">
              <div class="form-check-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="Report"
                    value="Report"
                    v-model="modalData.postType"
                  />
                  <label class="form-check-label" for="Report">Report</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="Activity"
                    value="Activity"
                    v-model="modalData.postType"
                  />
                  <label class="form-check-label" for="Activity">Activity</label>
                </div>
              </div>
              <div>
                <base-button
                  outline
                  type="primary"
                  class="my-4"
                  @click="exitModal"
                >Back</base-button
                >
                <base-button type="primary" class="my-4" @click="addPost"
                >Post</base-button
                >
              </div>
            </div>
          </form>
        </template>
      </card>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import AddressField from '@/components/personal-components/AddressField.vue';
import { sendPost } from '../../Requests.js'
export default {
  data() {
    return {
      showAlert: false,
      attemptedToPost: false,
      componentKey: 0,
      showModal: false,
    };
  },
  created() {
    this.attemptedToPost = false
  },
  props: {
    modalData: {
      type: Object,
      default: () => {
          return {}
        },
      },
  },
  components :{
    Modal,
    AddressField,
  },
  methods: {
    canAddPost() {
      if (this.isAuthenticated) this.showModal = true
      else {
        this.showAlert = true
        this.attemptedToPost = true,
        this.componentKey = Math.random();
        setTimeout(() => {
                    this.showAlert = false;
                }, 2000);
        }
    },
    exitModal() {
      this.modalData.description = this.modalData.title = null
      this.modalData.postType = 'Activity'
      this.showModal = false;
    },
    addPost() {
      const userId = this.$store.getters['userId'];
      const token =  this.$store.getters['token'];
      sendPost(this.modalData, userId, token)
      .then(() => {this.$emit('new-post')
      this.exitModal()})
      .catch(err => console.log('error in sendPost', err)).then()

    }
  },
  computed: {
    isAuthenticated() {
        return this.$store.getters['isAuthenticated']
    },
  },
};
</script>

<style scoped>
.last-level {
  display: flex;
  align-items: center; /* Vertically align the items */
  justify-content: space-between; /* Distribute items across the line */
}

.form-check-group {
  display: flex; /* Place the radio buttons on the same line */
  margin-right: 10px; /* Some spacing between the radios and buttons */
}

.form-check-group .form-check {
  margin-right: 10px; /* Some spacing between the radio buttons */
}
</style>

