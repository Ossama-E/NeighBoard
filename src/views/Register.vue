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
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div v-if="showAlert">
                        <base-alert v-model="showAlert" type="warning" dismissible>
                            <strong>Invalid!</strong> Please Fill All Required Fields
                        </base-alert>
                    </div>
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-center text-muted mb-4">
                                <h2>Register</h2>
                            </div>
                            
                            <form role="form">
                                <!-- <base-input 
                                            class="mb-3"
                                            placeholder="Name"
                                            addon-left-icon="ni ni-hat-3"
                                            v-model.trim="signupData.name">
                                </base-input> -->
                                <base-input :error="!validEmail ? `Please input a valid email` : null"
                                            class="mb-3"
                                            placeholder="Email"
                                            :valid="validEmail"
                                            v-model.trim="signupData.email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input :error="!validPassword ? `Password must be at least 7 characters` : null"
                                            type="password"
                                            :valid="validPassword"
                                            v-model.trim="signupData.password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <!-- <base-checkbox>
                                    <span>I agree with the
                                        <a href="#">Privacy Policy</a>
                                    </span>
                                </base-checkbox> -->
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="submitForm">Create account</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            signupData: {
                name: null,
                email: null,
                password: null,
            },
            showAlert: false,
        }
    },
    methods: {
        submitForm() {
            if (this.validEmail && this.validPassword) {
                this.$store.dispatch('auth/signup', {
                email: this.signupData.email,
                password: this.signupData.password,
            })}
            else {
                this.showAlert = true
            }
        }
    },
    computed: {
        validEmail(){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            console.log('the regex', emailRegex.test(this.signupData.email));
            return this.signupData.email && emailRegex.test(this.signupData.email);
        },
        validPassword() {
            return this.signupData.password && this.signupData.password.length >= 7
        }
    }
};
</script>
<style>
</style>
