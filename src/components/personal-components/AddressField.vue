<template>
  <div>
    <base-input
      addon-left-icon="ni ni-map-big"
      type="text"
      ref="streetRef"
      v-model="userInput"
      placeholder="The Address You're Concerned About"
      class="block mt-1 w-full text-sm placeholder-gray-400 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    ></base-input>
  </div>
</template>

<script>
import baseInput from '../../components/BaseInput.vue';
import useScript from '../../views/components/useScript';

export default {
  data() {
    return {
      google: null,
      postalCode: null,
      name: 'AddressField',
      userInput: '' 
    }
  },
  components: {
    baseInput,
  },
  mounted() {
    useScript(process.env.VUE_APP_GM_URL)
      .then((cleanup) => {
        this.$nextTick(() => {
          let autocomplete = new google.maps.places.Autocomplete(this.$refs.streetRef.getInputRef());

          this.google = autocomplete;
          this.cleanup = cleanup;

          autocomplete.addListener('place_changed', () => {
            let place = autocomplete.getPlace();
            let postalCode = null;
            let fullAddress = place.formatted_address;
            this.addressData.fullAddress = fullAddress
            this.userInput = fullAddress;
            let neighbourhood = null;
            let city = null;
            for (let i = 0; i < place.address_components.length; i++) {
              let addressType = place.address_components[i].types[0];
              if (addressType === 'postal_code') {
                postalCode = place.address_components[i]['long_name'];
                this.addressData.postalCode = postalCode;
              }
              if (addressType === 'neighborhood') {
                neighbourhood = place.address_components[i]['long_name'];
                this.addressData.neighbourhood = neighbourhood;
              }
              if (addressType === 'locality') {
                city = place.address_components[i]['long_name'];
                this.addressData.city = city;
              }
              if(postalCode && neighbourhood && city) {
                break;
              }
            }
            // If a neighbourhood isn't found, set the noNeighbourhood flag to true
            if (!neighbourhood) {
              this.addressData.noNeighbourhood = true;
            }
            else {
              this.addressData.noNeighbourhood = false;
            }
          });
        });
      });
  },
  beforeDestroy() {
    if (this.cleanup) {
      this.cleanup();
    }
  },
  props: {
    addressData: {
      type: Object,
      default: () => {},
    }
  },
  watch: {
  userInput(newVal) {
    if (!newVal) {
      this.$emit('input-cleared');
    }
  },
},
}
</script>