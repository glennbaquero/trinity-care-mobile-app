<template>
	<v-layout column>
		<v-container pa-5 mx-auto class="auth__login-TopCon">
	      <v-flex xs12 mb-4>
	        <h1 class="mb-4">Account verification</h1>
	        <h3 class="type-lighterGray">Please an option for your account's verification</h3>
	      </v-flex>
	    </v-container>

	    <v-radio-group v-model="option" class="cart--radio mt-0 pt-0">
        <v-layout row wrap mx-auto>
          <!-- COD -->
          <v-flex xs12 my-3 px-5 align-self-center>
            <v-radio label="Enter QR ID" :value="1" color="#FABF24" @change="qr_id = null"></v-radio>
          </v-flex>
          <v-flex v-if="option === 1" xs12 my-3 px-5>
            <v-text-field
	          v-model="qr_id"
	          label="QR ID"
	          color="#FABF24"
	          :error-messages="errors.qr_id"
	        ></v-text-field>
          </v-flex>
          <v-flex xs12 my-3 px-5 align-self-center>
            <v-radio label="Scan QR ID" :value="2" color="#FABF24" @change="scan"></v-radio>
          </v-flex>
          <v-flex xs12 my-3 px-5 align-self-center>
            <v-radio label="Upload Prescription Image" :value="3" color="#FABF24"></v-radio>
          </v-flex>
          <v-flex v-if="option === 3" xs12 my-3 px-5 align-self-center>
	        <v-file-input full-width rounded label="Select image" :error-messages="errors.prescription" @change="upload"></v-file-input>
          </v-flex>
        </v-layout>
      </v-radio-group>

	    <v-flex xs12 text-center mt-3 mb-6 px-5>
          <v-btn class="button cstm-button-radius text-small cstm-width type-gradient-l-r v-btn--large" depressed large dark @click="submit">Verify account</v-btn>
        </v-flex>

        <SuccessDialog
	      :show="successDialog"
	      :message="message"
	      image="icons/Check.svg"
	      @close="$PRXRouter().goTo('login')"
	    />
	</v-layout>
</template>

<script>
	import QrMixin from '@/assets/js/mixins/qr.js';
	import SuccessDialog from '@/components/SuccessDialog';

	export default {
		
		data: () => ({
			successDialog: false,
			message: null,
			option: null,
			qr_id: null,
			prescription: null,
			errors: {}
		}),
		components: { SuccessDialog },
		mixins: [ QrMixin ],
		methods: {
			upload(e) {
				this.prescription = e;
			},
			scan() {
				this.openQRReader(qr => {
					this.qr_id = qr;
					this.submit(this.qr_id);
				});
			},
			submit(qr = null) {
				const data = new FormData();

				data.append('option', this.option);
				data.append('prescription', this.prescription);
				data.append('qr_id', this.qr_id);
				data.append('email', this.$store.getters['user/authEmail']);

				axios.post('/api/care/verify', data)
					.then(response => {
						if (this.option === 1 || this.option === 2) {
							this.setToken(response.data.token, response.data.user);
						}

						if (response.data.message) {
							this.message = response.data.message;
							this.successDialog = true;	
						}
					})
					.catch(error => {
						this.errors = { ...error.response.data.errors };
					});
			},
			setToken(token, user) {
		        // this.setupPushNotif();
		        window.axios.defaults.headers.common['Authorization'] = token;
		        window.localStorage.setItem('authToken', token);
		        this.$store.commit('user/setToken', token);
		        window.localStorage.setItem('user', JSON.stringify(user));
		        this.$PRXRouter().goTo('home');
	            this.$store.commit('pageName/set', 'Home');
		        this.loading = false;
		      }
		}
	}
</script>