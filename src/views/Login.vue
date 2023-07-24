<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <BaseSpinner v-if="isLoading" />
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <h2>Login</h2>
              </div>

              <form role="form">
                <base-input
                  :error="!validEmail ? `Please input your email` : null"
                  class="mb-3"
                  placeholder="Email"
                  :valid="validEmail"
                  v-model.trim="loginData.email"
                  addon-left-icon="ni ni-email-83"
                >
                </base-input>
                <base-input
                  :error="!validPassword ? `Please Enter Your Password` : null"
                  type="password"
                  :valid="validPassword"
                  v-model.trim="loginData.password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                >
                </base-input>
                <div class="row mt-3">
                  <div class="col-6">
                    <a href="#" class="text-light">
                      <small></small>
                    </a>
                  </div>
                  <div class="col-6 text-right">
                    <a href="#" class="text-light">
                      <router-link to="/register">
                        <small>Create new account</small>
                      </router-link>
                    </a>
                  </div>
                </div>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="submitForm"
                    >Sign In</base-button
                  >
                </div>
              </form>
            </template>
          </card>
          <div v-if="showAlert">
            <base-alert v-model="showAlert" type="warning" dismissible>
              <strong>Invalid!</strong> Please Fill All Required Fields
            </base-alert>
          </div>
          <base-alert v-if="validLogin" type="success" dismissible>
            <strong>Success!</strong> Account Registered!
          </base-alert>
          <div v-if="error">
            <base-alert v-model="showAlert" type="warning" dismissible>
              <strong>Error</strong> Incorrect username or password
            </base-alert>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import BaseSpinner from './components/BaseSpinner.vue'
export default {
    data() {
        return {
            loginData: {
                name: null,
                email: null,
                password: null,
            },
            showAlert: false,
            isLoading: false,
            error: false,
            validLogin: false,
        }
    },
    components: {
        BaseSpinner
    },
    methods: {
        submitForm() {
        if (this.validEmail && this.validPassword) {
            console.log('proper login', {
                    email: this.loginData.email,
                    password: this.loginData.password,
                });
            this.isLoading = true;
            this.$store
                .dispatch('auth/login', {
                    email: this.loginData.email,
                    password: this.loginData.password,
                })
                .then(() => {
                    this.isLoading = false;
                    this.successLogin()
                })
                .catch((error) => {
                    console.log(error);
                    this.isLoading = false;
                    this.error = true;
                    setTimeout(() => {
                    this.error = false;
                }, 1000);
                });
            } else {
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 1000);
            }
            console.log('getting user id', this.$store.getters)
        },
        successLogin() {
            this.loginData.email = this.loginData.password = ''
            this.validLogin = true
            setTimeout(() => {
                this.validLogin = false;
            }, 3000);

        }
    },
    computed: {
        validEmail(){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            console.log('the regex', emailRegex.test(this.loginData.email));
            return this.loginData.email && emailRegex.test(this.loginData.email);
        },
        validPassword() {
            return this.loginData.password && this.loginData.password.length >= 1
        }
    }
};
</script>
<style></style>
