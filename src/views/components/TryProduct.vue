<template>
  <div>
    <input
      ref="autocompleteInput"
      v-model="address"
      placeholder="Enter a location"
      @input="onInput"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  data() {
    return {
      address: "",
      autocomplete: null,
    };
  },
  setup() {
    const autocompleteInput = ref(null);

    onMounted(() => {
      new google.maps.places.Autocomplete(autocompleteInput.value, {
        types: ["geocode"],
      }).addListener("place_changed", () => {
        const place = this.autocomplete.getPlace();
        if (place.geometry) {
          this.address = place.formatted_address;
          this.$emit("place-changed", place);
        }
      });
    });

    return {
      address,
      autocompleteInput,
    };
  },
  methods: {
    onInput() {
      this.$emit("input", this.address);
    },
  },
};
</script>
