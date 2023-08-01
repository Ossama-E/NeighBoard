<template>
    <div id="app">
        <router-view name="header"></router-view>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
  created(){
    this.$store.dispatch('tryLogin')
  },
  components: {
    FadeTransition
  },
  computed: {
    sessionTimedOut() {
      return this.$store.getters.sessionTimedOut
    },
  },
  watch: {
    sessionTimedOut(currValue, oldValue) {
      if (currValue && currValue != oldValue) {
        this.$router.replace('/login')
      }
    }
  }
};
</script>
