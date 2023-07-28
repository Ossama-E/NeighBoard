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
                <h2>Register</h2>
              </div>

              <form role="form">
                <base-input
                  :error="nameError"
                  :valid="validName"
                  class="mb-3"
                  placeholder="Name"
                  addon-left-icon="ni ni-hat-3"
                  v-model.trim="signupData.name"
                  @blur="validateName"
                >
                </base-input>

                <base-input
                  :error="emailError"
                  class="mb-3"
                  placeholder="Email"
                  :valid="validEmail"
                  v-model.trim="signupData.email"
                  addon-left-icon="ni ni-email-83"
                  @blur="validateEmail"
                >
                </base-input>
                <base-input
                  :error="passwordError"
                  type="password"
                  :valid="validPassword"
                  v-model.trim="signupData.password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  @blur="validatePassword"
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
                      <router-link to="/login">
                        <small>Login Instead</small>
                      </router-link>
                    </a>
                  </div>
                </div>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="submitForm"
                    >Create account</base-button
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
          <base-alert v-if="validSignup" type="success" dismissible>
            <strong>Success!</strong> Account Registered!
          </base-alert>
          <div v-if="error">
            <base-alert v-model="showAlert" type="warning" dismissible>
              <strong>Error</strong> Error Signing Up, Try Again Later
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
            signupData: {
                name: null,
                email: null,
                password: null,
            },
            showAlert: false,
            isLoading: false,
            error: false,
            validSignup: false,
        }
    },
    components: {
        BaseSpinner
    },
    methods: {
        submitForm() {
        if (this.validEmail && this.validPassword && this.validName) {
            this.isLoading = true;
            this.$store
                .dispatch('signup', {
                  name: this.signupData.name,
                    email: this.signupData.email,
                    password: this.signupData.password,
                })
                .then(() => {

                    this.isLoading = false;
                    this.login()
                })
                .catch((error) => {
                    this.isLoading = false;
                    this.error = true;
                });
            } else {
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 1000);

            }
        },
        login() {
        if (this.validEmail && this.validPassword) {
            this.isLoading = true;
            this.$store
                .dispatch('login', {
                    email: this.signupData.email,
                    password: this.signupData.password,
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
        },
        successLogin() {
            this.signupData.email = this.signupData.password = this.signupData.name = ''
            this.validSignup = true
            this.$router.replace('/')
            setTimeout(() => {
                this.validSignup = false;
            }, 3000);

        },
        validateName() {
      this.nameError = !this.validName ? 'Please input your name' : null;
    },
    validateEmail() {
      this.emailError = !this.validEmail ? 'Please input a valid email' : null;
    },
    validatePassword() {
      this.passwordError = !this.validPassword ? 'Password must be at least 7 characters' : null;
    },


    },
    computed: {
        validEmail(){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return this.signupData.email && emailRegex.test(this.signupData.email);
        },
        validPassword() {
            return this.signupData.password && this.signupData.password.length >= 7
        },
        validName() {
          return this.signupData.name && this.signupData.name.length > 0
        }
    }
};
</script>
<style></style>
