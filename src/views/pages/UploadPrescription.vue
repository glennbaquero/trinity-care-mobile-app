<template>
  <v-container pa-0 fill-height>
    <v-layout align-content-center row wrap pa-5 mx-auto>
      <v-flex xs12 mb-2>
        <h3 class="type-1">Upload Prescription Image</h3>
      </v-flex>
      <v-flex xs12 mb-2>
        <!-- <v-text-field
          v-model="qr_id"
          label="QR ID"
          color="#FABF24"
          class="form__input--text"
          :error-messages="errors.qr_id"
        ></v-text-field> -->
        <!--<v-file-input
          full-widtth
          rounded
          label="Upload image"
          :error-messages="errors.image"
          @change="upload">
        </v-file-input>-->

        <input type="file" @change="upload">
      </v-flex>
      <v-flex xs12 text-center>
        <v-btn
          :class="`button cstm-button-radius text-small cstm-width v-btn--large ${loading ? 'type-3' : 'type-gradient-l-r'}`"
          depressed
          large
          :dark="!loading"
          :disabled="loading"
          @click="submit"
        >
          <span v-if="!loading">Proceed</span>
          <Spinner v-else stroke-color="#afafaf" />
        </v-btn>
      </v-flex>
    </v-layout>

    <SuccessDialog
      :show="successDialog"
      :message="message"
      image="icons/Check.svg"
      @close="$PRXRouter().goTo('product')"
    />
  </v-container>
</template>


<script>
  import SuccessDialog from '@/components/SuccessDialog';
  import Spinner from '@/components/Spinner';

  export default {
    data: () => ({
      loading: false,
      image: null,
      successDialog: false,
      message: null,
      errors: {}
    }),

    components: { SuccessDialog, Spinner },

    methods: {
      upload(e) {
       // this.image = e.target.files || e.dataTransfer.files;
       var files = e.target.files || e.dataTransfer.files;

        if(!files.length)
          return;

        this.image = files[0];
      },
      submit() {
        const data = new FormData();

        data.append('image', this.image);
        data.append('product_id', this.$store.state.selectedProduct.item.parent_id);

        axios.post('/api/care/cart/items/upload', data)
          .then(response => {
            this.message = response.data.message;
            this.successDialog = true;
            // this.$store.commit('user/setData', { name: 'allowBuy', payload: true });
            // this.$PRXRouter().goTo('productView');
          })
          .catch(error => {
            this.errors = { ...error.response.data.errors };
          });
      }
    }
  }
</script>
