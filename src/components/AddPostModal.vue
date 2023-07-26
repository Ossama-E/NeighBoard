<template>
  <div class="text-center">
    <base-button
      v-if="!attemptedPost"
      type="primary"
      text-align="center"
      class="mb-3"
      @click="canAddPost"
    >
      Add Post
    </base-button>
    <router-link to="/register">
      <base-button
        v-if="attemptedPost"
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
            <div class="text-right">
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
          </form>
        </template>
      </card>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import AddressField from '../views/components/AddressField.vue';
import { sendPost } from '../Requests.js'
export default {
  data() {
    return {
      showAlert: false,
      attemptedPost: false,
      componentKey: 0,
      showModal: false,
    };
  },
  created() {
    this.attemptedPost = false
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
        this.attemptedPost = true,
        this.componentKey = Math.random();
        setTimeout(() => {
                    this.showAlert = false;
                }, 2000);
        }
    },
    exitModal() {
      this.modalData.description = this.modalData.title = this.modalData.address = ''
      this.showModal = false;
    },
    addPost() {
      const userId = this.$store.getters['auth/userId'];
      const token =  this.$store.getters['auth/token'];
      sendPost(this.modalData, userId, token).then(this.$emit('new-post')).catch(err => console.log('error in sendPost', err))
      this.exitModal()
      
    }
  },
  computed: {
    isAuthenticated() {
        return this.$store.getters['auth/isAuthenticated']
    },
  },
};
</script>
