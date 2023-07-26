<template>
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
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img v-lazy="'img/theme/team-4-800x800.png'" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                <div class="card-profile-actions py-4 mt-lg-0">
                                    <base-button type="info" size="sm" class="mr-4">Connect</base-button>
                                    <base-button type="default" size="sm" class="float-right">Message</base-button>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <span class="heading">{{postsNumber}}</span>
                                        <span class="description">Posts</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-5">
                            <h3>{{userName}}
                            </h3>
                            <!-- <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>Bucharest, Romania</div> -->
                            <!-- <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer</div>
                            <div><i class="ni education_hat mr-2"></i>University of Computer Science</div> -->
                        </div>
                        <div class="mt-3 py-5 border-top text-center">
                        </div>
                    </div>
                </card>
            </div>
        </section>
        <div  class="container">
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
                <i class="ni location_pin mr-2"></i
                >{{ post.addressData.fullAddress }}
              </div>
              <div class="h6 mt-4">
                <i class="ni business_briefcase-24 mr-2"></i
                >{{ post.description }}
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>
    <div v-if="noPosts">
      <p class="text-center mt-5">You have not posted anything yet</p>
    </div>
    </div>
</template>
<script>
import {getAccount} from '../Requests.js'
export default {
    async mounted(){
        
        const userId = this.$store.getters['userId'];
        const apiURL = process.env.VUE_APP_FIREBASE_API_URL;
        getAccount(apiURL, userId).then(response => { 
            console.log(response)
            const user = Object.keys(response.data)[0];
            this.userName = response.data[user].name;

            this.postsList = response.data.posts;
            console.log('user posts:', response.data.posts);
            console.log('user posts:', this.postsList);
            
        }).catch(err => console.error(err))
    },
    data() {
        return {
            postsList: null,
            userName: null,
        }
    },
    computed: {
        noPosts() {
            if (!this.postsList ) {
                return true
            }
            return false
        },
        postsNumber() {
            if (this.noPosts) {
                return 0
            }
            else {
                return Object.keys(this.postsList).length
            }
        }
    }
};
</script>
<style>
</style>
