<template>
	<v-tab-item value="tab1">

        <!-- PERSONAL DETAILS -->
        <v-layout pa-5 mb-2 wrap class="backgroundColor--white frm-elevation">
	      <v-flex xs12 mb-6>
	        <h3>Personal Details</h3>
	      </v-flex>
	      <v-flex xs12 mb-2>
	        <v-text-field v-model="payload.first_name" label="First name" color="#3B823E" class="form__input--text" :error-messages="errors.first_name" @keypress="regexLetter($event)"></v-text-field>
	      </v-flex>
	      <v-flex xs12 mb-2>
	        <v-text-field v-model="payload.last_name" label="Last name" color="#3B823E" class="form__input--text" :error-messages="errors.last_name" @keypress="regexLetter($event)"></v-text-field>
	      </v-flex>
	      <v-flex xs12 mb-2>
	        <v-text-field v-model="payload.email" disabled label="Email" color="#3B823E" class="form__input--text"></v-text-field>
	      </v-flex>
	      <v-flex xs12 mb-2>
	      	<v-file-input full-width rounded label="Upload Profile Photo" @change="upload"></v-file-input>
	      </v-flex>
	    </v-layout>

        <!-- DEFAULT ADDRESS -->
        <Addresses />
        <!-- END_DEFAULT ADDRESS -->

        <!-- ADD NEW ADDRESS -->
        <v-layout px-5 py-7 mb-6 wrap class="backgroundColor--white frm-elevation">
          <v-flex xs12 text-center>
            <h3 class="color-doc-primary2" @click="$PRXRouter().goTo('addAddress')">Add New Address</h3>
          </v-flex>
        </v-layout>

        <v-layout px-5 mt-4 py-4 wrap>
          <v-flex xs12 text-center mb-4>
            <v-btn class="button cstm-button-radius text-small cstm-width type-gradient-l-r v-btn--large" depressed large dark :disabled="loading" @click="updateInfo">
            	<Spinner v-if="loading" />
	            <span v-else>Save Changes</span>
	        </v-btn>
          </v-flex>
          <v-flex xs12 text-center mb-4>
            <v-btn class="button cstm-button-radius text-small cstm-width type-3 v-btn--large" depressed large dark @click="logout" style="color: white;">Logout</v-btn>
          </v-flex>
        </v-layout>

    <Loader
    ref="loader"
    ></Loader>

    </v-tab-item>
</template>


<script>
import Addresses from './Addresses';
import Spinner from '@/components/Spinner';
import { bus } from '@/assets/js/EventBus.js';
import Loader from '@/components/Loader.vue';

export default {
	
	components: { 
		Addresses, 
		Spinner,
		Loader
	},
	computed: {
		user() {
	      return JSON.parse(window.localStorage.getItem('user'));
	    }
	},

	data: () => ({
		loading: false,
		payload: {
			first_name: null,
			last_name: null,
			email: null,
			image: null,
		},
		errors: {}
	}),

	mounted() {
		const { first_name, last_name, email } = this.user;

	    this.payload.first_name = first_name;
	    this.payload.last_name = last_name;
	    this.payload.email = email;
	},

	methods: {

		upload(e) {
	      this.payload.image = e;
	    },

		updateInfo() {

			this.$refs['loader'].show();

			const data = new FormData();
			const { first_name, last_name, email, image } = this.payload;

			data.append('first_name', first_name);
			data.append('last_name', last_name);
			data.append('email', email);
			data.append('image', image);

			axios.post('/api/care/profile/update', data)
				.then(response => {
					this.$refs['loader'].hide();
					this.$emit('showSuccessDialog', response.data.message);
					this.$store.commit('user/setData', { name: 'info', payload: response.data.user });
					window.localStorage.setItem('user', JSON.stringify(response.data.user));
				})
				.catch(error => {
					this.$refs['loader'].hide();
					this.errors = { ...error.response.data.errors };
				});
         	bus.$emit('update_profile');
	    },

	    logout() {
			this.$refs['loader'].show();	    	
            this.$store.commit('notificationReceive/set', false);

            if(this.isCordova) {
		    	window.plugins.googleplus.logout(
		    	    function (msg) {
		    	      console.log(msg) // do something useful instead of alerting
		    	    }
		    	);
		    	window.plugins.googleplus.disconnect(
		    	    function (msg) {
		    	      console.log(msg)
		    	    }
		    	);	            	
            }

	    	axios.post(this.routes['api.care.logout'])
	    		.then(response => {
					this.$refs['loader'].hide();	    			
			    	this.$PRXRouter().goTo('login');
			    	this.$store.commit('tempStorage/resetProducts');
			    	this.$store.commit('tempStorage/resetNotifications');
			    	this.$store.commit('tempStorage/resetNews');
			    	window.localStorage.removeItem('authToken');
					window.localStorage.removeItem('user');
					window.localStorage.removeItem('settings');

	    		}).catch((err) => {
					this.$refs['loader'].hide();	    			
					this.$PRXRouter().goTo('login');
			    	this.$store.commit('tempStorage/resetProducts');
			    	this.$store.commit('tempStorage/resetNotifications');
			    	this.$store.commit('tempStorage/resetNews');					
			    	window.localStorage.removeItem('authToken');
					window.localStorage.removeItem('user');
					window.localStorage.removeItem('settings');
	    		});
	    }
	}
}
</script>