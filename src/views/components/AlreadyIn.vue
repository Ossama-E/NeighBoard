<template>
  <div>
    <section class="section-hero section-shaped my-0">
      <div class="shape shape-style-1 shape-primary">
        <span class="span-150"></span>
        <span class="span-50"></span>
        <span class="span-50"></span>
        <span class="span-75"></span>
        <span class="span-100"></span>
        <span class="span-75"></span>
        <span class="span-50"></span>
        <span class="span-100"></span>
        <span class="span-50"></span>
        <span class="span-100"></span>
      </div>
    <div class="container shape-container d-flex align-items-center">
      <div class="col px-0">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-10 text-center pt-lg">
            <h2 class="display-2 text-white mt-4 mb-5">
              You're Already Logged In/ Signed Up
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>

  </div>
</template>
<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
