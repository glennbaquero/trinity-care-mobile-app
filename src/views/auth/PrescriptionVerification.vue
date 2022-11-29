<template>
  <v-container pa-0 fill-height>
    <v-layout align-content-center row wrap pa-5 mx-auto>
      <v-flex xs12 mb-2>
        <h3 class="type-1">Upload Prescription Image</h3>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-file-input
          full-widtth
          rounded
          label="Upload image"
          :error-messages="errors.prescription"
          @change="upload">
        </v-file-input>
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
      @close="$PRXRouter().goTo('login')"
    />
  </v-container>
</template>


<script>
  import SuccessDialog from '@/components/SuccessDialog';
  import Spinner from '@/components/Spinner';

  export default {
    data: () => ({
      loading: false,
      prescription: null,
      successDialog: false,
      message: null,
      errors: {}
    }),

    components: { SuccessDialog, Spinner },


    computed: {
      email() {
        return this.getItem('user').email;
      }
    },

    methods: {
      upload(e) {
        this.prescription = e;
      },
      submit() {
        const data = new FormData();

        this.loading = true;

        data.append('prescription', this.prescription);
        data.append('email', this.email);

        axios.post('/api/care/verify/prescription', data)
          .then(response => {
            this.loading = false;
            this.message = response.data.message;
            this.successDialog = true;
          })
          .catch(error => {
            this.loading = false;
            this.errors = { ...error.response.data.errors };
          });
      }
    }
  }
</script>
