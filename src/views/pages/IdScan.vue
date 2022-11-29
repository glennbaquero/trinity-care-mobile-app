<template>
  <v-container pa-0 fill-height>
    <v-layout align-content-center row wrap pa-5 mx-auto>
      <v-flex xs12 mb-2>
        <h3 class="type-1">Input QR ID</h3>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-text-field
          v-model="qr_id"
          label="QR ID"
          color="#FABF24"
          class="form__input--text"
          :error-messages="errors.qr_id"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 text-center>
        <v-btn color="red" class="button cstm-button-radius text-small cstm-width type-gradient-l-r v-btn--large" depressed large dark @click="submit">Proceed</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    data: () => ({
      qr_id: null,
      errors: {}
    }),

    methods: {
      submit() {
        const body = {
          qr_id: this.qr_id,
          product_id: this.$store.getters['user/productId']
        };

        axios.post('api/care/cart/items/validate', body)
          .then(response => {
            this.$store.commit('user/setData', { name: 'allowBuy', payload: true });
            this.$PRXRouter().goTo('productView');
          })
          .catch(error => {
            this.errors = { ...error.response.data.errors };
          });
      }
    }
  }
</script>
