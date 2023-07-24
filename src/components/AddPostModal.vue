<template>
  <div class="text-center">
    <base-button  type="primary" text-align="center" class=" mb-3" @click="canAddPost">
        Add Post
    </base-button>
    <base-alert v-if="showAlert" type="warning">
        <strong>Warning!</strong> You need to be logged in and create an account
    </base-alert>
    <modal :show.sync="modalData.showModal"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-lg">
        <card type="secondary" shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0">
              <div class="text-muted text-center mb-3">
                  <h3>Add a Post</h3>
              </div>
            <template>
                <form role="form">
                    <base-input
                                alternative
                                v-model="modalData.title"
                                class="mb-3"
                                placeholder="Title"
                                addon-left-icon="ni ni-bold">
                    </base-input>
                    <base-input alternative
                                v-model="modalData.address"
                                type="address"
                                placeholder="Address"
                                addon-left-icon="ni ni-map-big">
                    </base-input>
                    <form addon-left-icon="ni ni-map-big">
                      
                      <textarea  v-model="modalData.description" class="form-control form-control-alternative" rows="3" placeholder="Description"></textarea>
                    </form>
                    <div class="text-right">
                      <base-button outline type="primary" class="my-4" @click="exitModal">Back</base-button>
                      <base-button type="primary" class="my-4" @click="addPost">Post</base-button>
                    </div>
                </form>
            </template>
        </card>
    </modal>
  </div>
</template>

<script>


import axios from 'axios'
import Modal from "@/components/Modal.vue";
export default {
  data() {
    return {
      showAlert: false,
    };
  },
  props: {
    modalData: {
      type: Object,
      default: () => {
          return {
            showModal: false,
          }
        },
      },
  },
  components :{
    Modal
  },
  methods: {
    canAddPost() {
      if (this.isAuthenticated) this.modalData.showModal = true 
      else {
        this.showAlert = true
        setTimeout(() => {
                    this.showAlert = false;
                }, 1000);
        }
    },
    exitModal() {
      this.modalData.description = this.modalData.title = this.modalData.address = ''
      this.modalData.showModal = false;
    },
    addPost() {
      console.log('got a post request with this post', this.modalData)
      const apiURL = process.env.VUE_APP_FIREBASE_API_URL;
      const userId = this.$store.getters['auth/userId']
      const token =  this.$store.getters['auth/token']
      axios.post(`${apiURL}/testdata/${userId}.json?auth=` + token, this.modalData).then(res => console.log(res)).catch(err => console.log(err))
      // axios.get(`${apiURL}/testdata.json`).then(res => console.log('reults', res)).catch(err => console.log('error ', err))
    }
  },
  computed: {
    isAuthenticated() {
        return this.$store.getters['auth/isAuthenticated']
    }
  },
};</script>