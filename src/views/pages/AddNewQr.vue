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
        <v-btn
          :class="`button cstm-button-radius text-small cstm-width ${loading ? 'type-3' : 'type-gradient-l-r'} v-btn--large`"
          depressed
          large
          :dark="!loading"
          :disabled="loading"
          @click="add"
        >
          <span v-if="!loading">Add doctor</span>
          <Spinner v-else stroke-color="#afafaf" />
        </v-btn>
      </v-flex>
    </v-layout>

    <SuccessDialog
      :show="dialog"
      :message="message"
      image="icons/Check.svg"
      @close="$PRXRouter().goTo('home')"
    />
  </v-container>
</template>

<script>
  import Spinner from '@/components/Spinner';
  import SuccessDialog from '@/components/SuccessDialog';

  export default {
    data: () => ({
      dialog: false,
      message: null,
      loading: false,
      qr_id: null,
      errors: {}
    }),

    components: { Spinner, SuccessDialog },

    methods: {
      add() {
        this.loading = true;

        axios.post(this.routes['api.care.doctor.scan'], { qr_id: this.qr_id })
          .then(response => {
            this.loading = false;
            this.message = response.data.message;
            this.dialog = true;
            this.doctor = response.data.specialization;
            this.$store.commit('api/updateDoctors', response.data.doctor);
          })
          .catch(error => {
            this.loading = false;
            this.errors = { ...error.response.data.errors };
          });
      }
    }
  }
</script>