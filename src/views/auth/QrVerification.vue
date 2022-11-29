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
          @click="submit">
          <span v-if="!loading">Verify</span>
          <Spinner v-else stroke-color="#afafaf" />
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import Spinner from '@/components/Spinner';

  export default {
    data: () => ({
      loading: false,
      qr_id: null,
      errors: {}
    }),

    components: { Spinner },

    methods: {
      submit() {
        const body = {
          qr_id: this.qr_id,
          email: this.$store.getters['user/authEmail']
        };

        this.loading = true;

        axios.post('api/care/verify/qr', body)
          .then(response => {
            this.loading = false;
            this.setToken(response.data.token, response.data.user);
          })
          .catch(error => {
            this.loading = false;
            this.errors = { ...error.response.data.errors };
          });
      },
      setToken(token, user) {
        this.setupPushNotif();
        window.axios.defaults.headers.common['Authorization'] = token;
        window.localStorage.setItem('authToken', token);
        this.$store.commit('user/setToken', token);
        window.localStorage.setItem('user', JSON.stringify(user));
        this.$PRXRouter().goTo('home');
        this.$store.commit('pageName/set', 'Home');
      }
    }
  }
</script>
