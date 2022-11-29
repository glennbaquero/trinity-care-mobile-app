    <template>
	<v-container pa-0 fill-height class="myVouchers__con bg-lightGray">
		<v-row class="align-self-baseline" no-gutters>
    
			<v-row class="px-5 pt-5" no-gutters>
				<v-col cols="12">
					<h3 class="mb-3">Pending Requests</h3>
				</v-col>
	            <template v-if="pending.length" >
					<v-col cols="12">
						<template v-for="voucher in pending">
							<v-card class="cstm-border-radius-10 cstm-elevation-2 px-6 py-5">
								<v-row no-gutters>
									<v-col cols="12" class="mb-3">
										<p class="font-size-small mb-0">Jun 2 2020</p>
									</v-col>
									<v-col cols="12">
										<p class="font-size-small mb-0 type-1"><i>Pending Claim Request</i></p>
									</v-col>
								</v-row>
							</v-card>
						</template>
					</v-col>
				</template>
                <template v-else>
                    <v-flex xs12 text-center my-10>
                          <p class="general__text color-gray mb-0">No Pending Voucher</p>
                    </v-flex>
                </template>
			</v-row>

			<v-row class="mt-6 px-5 pb-5" no-gutters>
				<v-col cols="12">
					<h3 class="mb-3">Approved Requests</h3>
				</v-col>
				<template v-if="active.length">
    				<v-col cols="12">
						<template v-for="voucher in active">
							<v-card 
                                class="cstm-border-radius-10 cstm-elevation-2 px-6 py-5 mb-2"
                                v-clipboard:copy="voucher.code" v-clipboard:success="copied" 
                            >
								<v-row no-gutters>
									<v-col cols="12" class="mb-3">
										<p class="font-size-small mb-0">Created At: {{ renderDate(voucher.created_at) }}</p>
                                        <p class="font-size-small mb-1">Expiry Date: {{ renderDate(voucher.expired_at) }}</p>
                                        <p class="font-size-small mb-0">Max Usage: {{ voucher.max_usage }}</p>
									</v-col>
									<v-col cols="12">
										<p class="font-size-small mb-0 color-doc-primary2">
                                            <i>Voucher Code: <strong>{{ voucher.code }}</strong></i>
                                        </p>
									</v-col>
								</v-row>
							</v-card>
					   </template>		
    				</v-col>
			    </template>
                <template v-else>
                    <v-flex xs12 text-center my-10>
                        <p class="general__text color-gray mb-0">No approved requests.</p>
                    </v-flex>
                </template>                         
			</v-row>
		</v-row>

        <Loader
          ref="loader"
        ></Loader>


        <v-snackbar
            v-model="snackbar.status"
            :timeout="snackbar.timeout"
        >
        {{ snackbar.message }}
        </v-snackbar>
	</v-container>
</template>
<script>
	import EmptyFrame from '@/components/substitute/EmptyFrame';
	import moment from 'moment';
    import Loader from '@/components/Loader.vue';

	export default {
        components: {
        	EmptyFrame,
            Loader,
        },

        data () {
            return {
            	active: [],
            	pending : [],
                snackbar: {
                    status: false,
                    timeout: 2000,
                    message: null
                },

            }
        },

        mounted() {	
       		this.init();
       		this.$store.commit('setTopNav/set', 'Vouchers');
        },

        methods: {

            /*
            |--------------------------------------------------------------------------
            | @Initialize
            |--------------------------------------------------------------------------
            */ 

            init() {
            	this.fetchVoucher();
            },

            fetchVoucher() {
                this.$refs['loader'].show(); 
            	axios.post(this.routes['api.care.my-vouchers.fetch'])
            	.then((response)=>{
            		this.active = response.data.active;
            		this.pending = response.data.pending;
                    this.$refs['loader'].hide(); 
            	}).catch((error)=>{

            	});
            },

            /*
            |--------------------------------------------------------------------------
            | @Methods
            |--------------------------------------------------------------------------
            */      

            /**
             * Copying referral code
             * 
             */
            copied() {
              this.snackbar.message = 'Referral code has been successfully copied';
              this.snackbar.status = true;
            },    

            /**
             * Reinitialize data
             * 
             */
            onRefresh() {
              return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    this.init();
                    resolve();
                  }, 1000);
              });
            },

            /*
            |--------------------------------------------------------------------------
            | @Renders
            |--------------------------------------------------------------------------
            */  
            renderDate(date) {
      			return moment(date).format('MMMM DD, YYYY');
    		},

        }

    }
	
</script>

