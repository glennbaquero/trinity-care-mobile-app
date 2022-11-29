<template>
	<div>
		<v-row class="pa-0" no-gutters>
	    	<v-col cols="12">
	    		<div class="frm-info">
	    			<p class="mb-0 type-white font-size-small">Share your referral code or invite your friends via Facebook, Twitter and Email.</p>
	    		</div>
	    	</v-col>
	    </v-row>

	    <v-row class="pa-6 pt-5" no-gutters>
	    	<v-col cols="12">
	    		<h3 class="font-weight-semibold type-black mb-1">Your referral code:</h3>
	    		<v-card class="mx-auto frm-elevation cstm-border-radius-10 mb-4" width="100%">
	    		    <v-list-item
	    		    	v-clipboard:copy="code" v-clipboard:success="copied" v-clipboard:error="copyingError"
	    		    >
	    		    	<v-list-item-content>
	    		    		<v-list-item-title>
	    		    			<p class="mb-0 type-green">{{ code }}</p>
	    		    		</v-list-item-title>
	    		    	</v-list-item-content>
	    		    	<v-list-item-avatar tile size="23">
	    		    		<v-img :src="$PRXConfig().staticUrl('icons/copy-icon.svg')"></v-img>
	    		    	</v-list-item-avatar>
	    		    </v-list-item>
	    		</v-card>
	    		<v-card class="mx-auto frm-elevation cstm-border-radius-10" width="100%">
	    		    <v-list-item>
	    		    	<v-list-item-content>
	    		    		<v-list-item-title>
	    		    			<h3 class="mb-1 font-weight-semibold">Invite Now!</h3>
	    		    			<p class="mb-0 font-size-small">Invite a friend and earn a Voucher </p>
	    		    		</v-list-item-title>
	    		    	</v-list-item-content>
	    		    	<v-list-item-avatar tile size="20">
	    		    		<v-icon>fa fa-chevron-right</v-icon>
	    		    	</v-list-item-avatar>
	    		    </v-list-item>
	    		</v-card>

    			<div class="frm-steps">
    				<div class="frm-steps__col">
    					<div class="frm-steps__icon">
    						<v-img class="mx-auto" width="30" height="60" contain :src="$PRXConfig().staticUrl('icons/share 1.svg')"></v-img>
    					</div>
    					<p class="font-size-small mb-0 type-black">Share your link</p>
    				</div>
    				<div class="frm-steps__col">
    					<div class="frm-steps__icon">
    						<v-img class="mx-auto" width="30" height="60" contain :src="$PRXConfig().staticUrl('icons/share 2.svg')"></v-img>
    					</div>
    					<p class="font-size-small mb-0 type-black">Referred friends registers with your referral code.</p>
    				</div>
    				<div class="frm-steps__col">
    					<div class="frm-steps__icon">
    						<v-img class="mx-auto" width="30" height="60" contain :src="$PRXConfig().staticUrl('icons/share 3.svg')"></v-img>
    					</div>
    					<p class="font-size-small mb-0 type-black">Referred friends purchases a product</p>
    				</div>
    			</div>

	    		<div class="frm-social-md text-center">
	    			<h4 class="font-weight-semibold">Share via:</h4>
	    			<div class="d-flex justify-space-between align-center px-10 mt-2">
	    				<div class="frm-btn">
	    					<v-btn 
	    					@click="share('fb')"
	    					class="px-0" text height="50" width="50" elevation="elevation-0">
	    					    <v-img class="mx-auto mb-2" width="50" height="50" contain :src="$PRXConfig().staticUrl('icons/facebook.svg')"></v-img>
	    					</v-btn>
    					    <p class="font-size-small mt-2 type-black">Facebook</p>
	    				</div>
	    				<div class="frm-btn">
	    					<v-btn 
	    					@click="share('twitter')"
    						class="px-0" text height="50" width="50" elevation="elevation-0">
	    					    <v-img class="mx-auto mb-2" width="50" height="50" contain :src="$PRXConfig().staticUrl('icons/twitter.svg')"></v-img>
	    					</v-btn>
    					    <p class="font-size-small mt-2 type-black">Twitter</p>
	    				</div>
	    				<div class="frm-btn">
	    					<v-btn 
	    					@click="share('email')"
	    					class="px-0" text height="50" width="50" elevation="elevation-0">
	    					    <v-img class="mx-auto mb-2" width="50" height="50" contain :src="$PRXConfig().staticUrl('icons/email.svg')"></v-img>
	    					</v-btn>
    					    <p class="font-size-small mt-2 type-black">Email</p>
	    				</div>	    				
	    			</div>
	    		</div>
	    	</v-col>
	    </v-row>


		<v-snackbar
			v-model="snackbar.status"
			:timeout="snackbar.timeout"
		>
			{{ snackbar.message }}
		</v-snackbar>

	</div>
</template>
<script>
export default {

	// computed: {
	// 	code() {
	// 		let user = JSON.parse(window.localStorage.getItem('user'));
	// 		return user.code
	// 	},
	// },

	watch: { 


	},

	data() {
		return {
			snackbar: {
				status: false,
				timeout: 2000,
				message: null
			},

			code: null
		}
	},

	mounted() {
		this.getReferralCode();
	},

	methods: {

		/*
		|--------------------------------------------------------------------------
		| @Initialize
		|--------------------------------------------------------------------------
		*/
	
		/**
		 * Get user code
		 */
		
		getReferralCode() {
			axios.get(this.routes['api.care.user.referral-code'])
				.then(response => {
					this.code = response.data.code
				}).catch(error => {
					console.log(error.response.data.message);
				})
		},

		/**
		 * Generate referral message
		 * 
		 */
		generateReferralMessage() {
			let message = "Use my referral code: " + this.code;
			return message;
		},

		/**
		 * Generate full referral message
		 * 
		 */
		generateFullReferralMessage() {
			let message = this.generateReferralMessage() + "\n"
					+ 'Download for Android: ' + "https://play.google.com/store/apps/details?id=com.praxxys.trinitycare" + "\n"
					+ 'Download for iOS: ' + "https://apps.apple.com/ph/app/trinity-care/id1484025649";
			return message;			
		},

		/*
		|--------------------------------------------------------------------------
		| @Methods
		|--------------------------------------------------------------------------
		*/

		/**
		 * Share event
		 * 
		 * @param  string type
		 */
		share(type) {
			switch(type) {
				case 'fb':
					this.fbShare();
				break;
				case 'twitter':
					this.twitterShare();
				break;
				case 'email':
					this.emailShare();
				break;
			}
		},

		/**
		 * FB sharing
		 * NOTES: Prefilled messages was disabled by FB. 
		 * This function will open the ShareDialog together with the clip text see `this.generateFullReferralMessage()`
		 * 
		 */
		fbShare() {
			window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(this.generateFullReferralMessage(), 
				null /* img */, 
				null /* url */,
				'Paste your referrence code.' /* Paste hint */,
				function() {
					console.log('share ok')
				}, function(errormsg) {
					alert(errormsg)
				}
			);
		},	

		/**
		 * Twitter sharing
		 * NOTES: This will open an inappbrowser for twitter sharing
		 * 
		 */
		twitterShare() {
			let url = "https://twitter.com/share?text=" + this.generateReferralMessage() + '%0A'+ 'Download For Android: ' + "https://play.google.com/store/apps/details?id=com.praxxys.trinitycare" + '%0A' + 'Download for iOS: ' + "https://apps.apple.com/ph/app/trinity-care/id1484025649";
			let inAppBrowser = cordova.InAppBrowser.open(url, '_blank', 'location=yes,hideurlbar=yes');

		},

		/**
		 * Email/Mail sharing
		 * 
		 */
		emailShare() {

			window.plugins.socialsharing.shareViaEmail(
			  this.generateFullReferralMessage(),
			  'Trinity Care Referral Code',
			  null, // TO: must be null or an array
			  null, // CC: must be null or an array
			  null, // BCC: must be null or an array
			  null, // FILES: can be null, a string, or an array
			  (success) => {
			  	console.log(success);
			  },
			  (error) => {
			  	console.log(error)
			  }
			);
		},

		/**
		 * Copying referral code
		 * 
		 */
		copied() {
          this.snackbar.message = 'Referral code has been successfully copied';
          this.snackbar.status = true;
		},

		/**
		 * Copying error
		 * 
		 */
		copyingError(err) {
			console.log(err);
		}

	},



}
</script>