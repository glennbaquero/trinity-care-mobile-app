<template>
	<div>
		<v-row class="pa-0 pb-6" no-gutters>
			<v-col cols="12" class="pa-0 mb-3">
				<v-card tile class="box-shadow--10 pa-4">
					<p class="font-weight-semibold">Order Summary</p>
					<v-card class="frm-card border-radius--10 box-shadow--10 mb-2" width="100%" v-for="(item, i) in cartItems" :key="i" @click="$PRXRouter().goTo('productView')">
						<v-list two-line>
							<v-list-item>
								<v-list-item-avatar width="70" height="120" tile class="my-0">
									<v-img
									class="elevation-0"
									contain
									:src="item.image_path"
									></v-img>
								</v-list-item-avatar>
								<v-list-item-content class="py-0">
									<v-list-item-title class="font-weight-semibold text-clamp mb-2">{{ item.product_name }}</v-list-item-title>
									<v-list-item-subtitle class="font-size-small">{{ item.quantity }} x P {{ item.product.price }}</v-list-item-subtitle>
									<v-list-item-subtitle>
									</v-list-item-subtitle>
								</v-list-item-content>
								<v-list-item-action class="font-weight-semibold">
									P {{ item.total_per_item }}
								</v-list-item-action>
							</v-list-item>
						</v-list>
					</v-card>
				</v-card>
			</v-col>

			<v-col cols="12" class="pa-0 mb-3">
				<v-card tile class="box-shadow--10 pa-4">
					<p class="font-weight-semibold mb-2">Deliver to</p>
					<div class="px-6 d-flex flex-wrap">
						<v-col cols="12" class="pa-0 mb-1">                            
							<p class="font-weight-semibold font-size-small mb-0">{{ user.shipping_name }}</p>
						</v-col>
						<v-col cols="12" class="pa-0 mb-1">
							<p class="font-size-small mb-0">{{ user.shipping_email }}</p>
						</v-col>
						<v-col cols="4" class="pa-0">
							<p class="font-size-small">Mobile #</p>                        
						</v-col>
						<v-col cols="8" class="pa-0 text-right">
							<p class="font-size-small">{{ user.shipping_mobile ? '(+63) ' + user.shipping_mobile.slice(1) : 'N/A'}}</p>
						</v-col>
					</div>
				</v-card>
			</v-col>

			<v-col cols="12" class="pa-0 mb-3">
				<v-card tile class="box-shadow--10 pa-4">
					<p class="font-weight-semibold mb-2">Payment summary</p>
					<v-row class="px-4 py-5" no-gutters>
						<v-col cols="6">
							<p class="font-size-small font-weight-semibold type-lighterGray mb-1">SUB TOTAL</p>
						</v-col>
						<v-col cols="6" class="text-right">
							<p class="font-size-small font-weight-semibold type-lighterGray mb-1">P {{ subTotal }}</p>
						</v-col>
						<v-col cols="6">
							<p class="font-size-small font-weight-semibold type-lighterGray mb-1">DISCOUNT</p>
						</v-col>
						<v-col cols="6" class="text-right">
							<p class="font-size-small font-weight-semibold type-lighterGray mb-1">P {{ discount }}</p>
						</v-col>
						<v-col cols="6">
							<p class="font-size-small font-weight-semibold type-lighterGray mb-1">SHIPPING FEE</p>
						</v-col>
						<v-col cols="6" class="text-right">
							<p class="font-size-small font-weight-semibold type-lighterGray mb-1">P {{ shippingFee }}.00</p>
						</v-col>
						<v-col cols="6">
							<p class="font-size-small font-weight-semibold text-darkgreen mb-1">GRAND TOTAL</p>
						</v-col>
						<v-col cols="6" class="text-right">
							<p class="font-size-small font-weight-semibold text-darkgreen mb-1">P {{ grandTotal }}</p>
						</v-col>
					</v-row>
				</v-card>
			</v-col>

			<v-col cols="12" class="pa-0 mb-3">
				<v-card tile class="box-shadow--10 pa-4">
					<p class="font-weight-semibold mb-2">Payment Method</p>
					<div class="px-6 d-flex flex-wrap">
						<v-col cols="12" class="pa-0 mb-1">                            
							<p class="font-weight-semibold font-size-small mb-0">Pay using</p>
						</v-col>
						<v-col cols="12" class="pa-0 mb-1">
							<p class="font-size-small mb-0">{{ selectedPaymentMethod.name }}</p>
						</v-col>
						<template v-if="selectedPaymentMethod.id == 4 || selectedPaymentMethod.id == 6 || selectedPaymentMethod.id == 7">
							<v-col cols="12" class="pa-0 mb-1">                            
								<p class="font-weight-semibold font-size-small mb-0">Notes:</p>
							</v-col>

							<v-col cols="12" class="pa-0 mb-1">
								<p class="font-size-small mb-0">{{ paymentNotes }}</p>
							</v-col>
						</template>
					</div>
				</v-card>
			</v-col>

			<template v-if="uploadedDocument">
				<v-col cols="12" class="pa-0 mb-3">
					<v-card tile class="box-shadow--10 pa-4">
						<p class="font-weight-semibold mb-2">Document</p>
						<div class="px-6 d-flex flex-wrap">
							<v-img
						    :src="uploadedDocumentPreview"
						    class="mx-auto elevation-0"
						    contain
							width="200px" height="200px"    
						    ></v-img>
						</div>
					</v-card>
				</v-col>
			</template>

			<v-col cols="12" class="pa-0 mb-5">
				<v-card tile class="box-shadow--10 pa-4">
					<p class="font-weight-semibold">Shipping Address</p>
					<div class="d-flex flex-wrap align-center px-3">
						<v-col cols="4" class="pa-0 mb-1">
							<p class="font-size-small mb-0">Unit &amp; Floor #</p>
						</v-col>
						<v-col cols="8" class="text-right pa-0 mb-1">
							<p class="font-size-small mb-0">{{ defaultAddress.unit }}</p>
						</v-col>

						<v-col cols="4" class="pa-0 mb-1">
							<p class="font-size-small mb-0">Street</p>
						</v-col>
						<v-col cols="8" class="text-right pa-0 mb-1">
							<p class="font-size-small mb-0">{{ defaultAddress.street }}</p>
						</v-col>

						<v-col cols="4" class="pa-0 mb-1">
							<p class="font-size-small mb-0">BLDG/Subdv.</p>
						</v-col>
						<v-col cols="8" class="text-right pa-0 mb-1">
							<p class="font-size-small mb-0">{{ defaultAddress.building }}</p>
						</v-col>

						<v-col cols="4" class="pa-0 mb-1">
							<p class="font-size-small mb-0">Region</p>
						</v-col>
						<v-col cols="8" class="text-right pa-0 mb-1">
							<p class="font-size-small mb-0">{{ defaultAddress.region.text }}</p>
						</v-col>

						<v-col cols="4" class="pa-0 mb-1">
							<p class="font-size-small mb-0">Province</p>
						</v-col>
						<v-col cols="8" class="text-right pa-0 mb-1">
							<p class="font-size-small mb-0">{{ defaultAddress.province.text }}</p>
						</v-col>

						<v-col cols="4" class="pa-0 mb-1">
							<p class="font-size-small mb-0">City</p>
						</v-col>
						<v-col cols="8" class="text-right pa-0 mb-1">
							<p class="font-size-small mb-0">{{ defaultAddress.city.text }}</p>
						</v-col>

						<v-col cols="4" class="pa-0 mb-1">
							<p class="font-size-small mb-0">Zip Code</p>
						</v-col>
						<v-col cols="8" class="text-right pa-0 mb-1">
							<p class="font-size-small mb-0">{{ defaultAddress.zip }}</p>
						</v-col>

						<v-col cols="4" class="pa-0 mb-1">
							<p class="font-size-small mb-0">Landmark</p>
						</v-col>
						<v-col cols="8" class="text-right pa-0 mb-1">
							<p class="font-size-small mb-0">{{ defaultAddress.landmark }}</p>
						</v-col>
					</div>
				</v-card>
			</v-col>

			<div class="frm-btn frm-btn--fixed pa-4" style="bottom: 0px">
				<v-btn
				block
				rounded
				min-height="60"
				class="btn--green elevation-0"
				dark
				@click="placeOrder"
				>Place Order</v-btn>
			</div>
		</v-row>

		<Loader
		ref="loader"
		></Loader>

		<v-dialog 
		persistent
		v-model="confirmDialog" max-width="100%">
			<v-card class="frm-dialog br-10 px-5 py-12 text-center">
				<v-img :src="$PRXConfig().staticUrl('icons/Check.svg')" class="mx-auto" width="42px" height="42px"></v-img>
				<div class="mt-4 mb-6">
					<p class="text--primary mx-auto mb-0 font-size-default font-weight-semibold">Order successfully placed.</p>
					<p class="text--primary mx-auto mb-0 font-size-default font-weight-semibold">Thank you.</p>
				</div>
				<div class="px-12">
					<div class="frm-btn mt-2">
						<v-btn
						rounded
						block
						dark
						elevation="elevation-0"
						min-height="42"
						@click="redirectRoute()"
						class="btn--green">Go to Orders Page</v-btn>
					</div>               
				</div>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>

import NumberJS from '@/assets/js/mixins/number.js';
import Loader from '@/components/Loader.vue';

export default {
	
	components: {
		Loader
	},

	computed: {
		
		cartItems() {
			return this.$store.getters['user/cartItems'];
		},
		
		user() {
			return this.$store.getters['user/shipping'];
		},
		
		defaultAddress() {
			const addresses = this.$store.getters['api/addresses'];
			const address = addresses.find(a => a.defaultAddress == true);

			return address;
		},
		
		subTotal() {
			const sub_total = this.$store.getters['user/subTotal'];

			return sub_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		
		grandTotal() {
			const total = this.$store.state.user.grandTotal;
			return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		
		shippingFee() {
			return this.$store.state.user.shippingFee;
		},

		selectedPaymentMethod() {
			const pm = this.$store.getters['user/paymentMethod'];
			const methods = this.$store.getters['user/paymentMethods'];

			return methods.find(method => method.id === pm);
		},

		voucher() {
			return this.$store.getters['user/voucher'];
		},

		discount() {
			return parseFloat(this.$store.getters['user/discount']);
		},

		uploadedDocument() {
			return this.$store.getters['user/uploadedDocument'];
		},

		uploadedDocumentPreview() {
			if(this.uploadedDocument) {
				return this.uploadedDocument.preview;
			}
		},		

		paymentNotes() {
			
			let notes;

			switch(this.selectedPaymentMethod.id) {
				case 4:
					notes = 'Please upload your deposit slip in the orders page';
				break;
				case 6:
					notes = 'Please upload your electronic receipt in the orders page';
				break;
				case 7:
					notes = 'This will deduct to your existing wallets';
				break;
			}

			return notes;
		}
	},
	
	data () {
		return {
			confirmDialog: false,
			deposit_slip: null,
			loading: false,
			
		}
	},

	mounted() {
		this.$store.commit('setTopNav/set', 'Checkout Summary');
	},

	methods: {

        /*
        |--------------------------------------------------------------------------
        | @Initialize
        |--------------------------------------------------------------------------
        */

        /**
         * Process paynamics
         * 
         * @param object form
         */
		processPaynamics(form) {
			var returnUrl = this.$PRXConfig().api.url+"/admin/checkout/paynamicsReturn";
			var cancelUrl = this.$PRXConfig().api.url+"/admin/checkout/paynamicsCancel";

			const pageContentUrl = `data:text/html;base64,${btoa(form)}`;
			const browser = cordova.InAppBrowser.open(pageContentUrl, '_blank', 'hidden=no,location=no,clearsessioncache=yes,clearcache=yes');

			browser.addEventListener('loadstart', (event) => {
				if (event.url.match(returnUrl) || event.url.match(cancelUrl)) {
					browser.close();
					if(!event.url.match(cancelUrl)) {
						axios.get('api/care/checkout/return')
						.then(response => {
			                this.confirmDialog = true;
							// this.$PRXRouter().goTo('home');
							console.log(response.data);
						});
					} else {
			            this.$PRXRouter().goTo('cartPayment');
					}
					
				}

				browser.executeSript({ code: form }, (html) => {
					browser.close();
		          	if(!event.url.match(returnUrl)) {
			            this.$PRXRouter().goTo('cartPayment');
		          	} else {
		          		this.confirmDialog = true;
		          	}
					// this.$PRXRouter().goTo('home');
				});
			});
		},

		/**
		 * Place order
		 * 
		 */
		placeOrder() {
			this.$refs['loader'].show();
			const data = new FormData();
			const shipping = this.$store.getters['user/shipping'];

			data.append('payment_method', this.selectedPaymentMethod.id);
			data.append('shipping_method', this.$store.getters['user/shippingMethod']);
			data.append('shipping_name', shipping.shipping_name);
			data.append('shipping_email', shipping.shipping_email);
			data.append('shipping_mobile', shipping.shipping_mobile);
			data.append('shipping_unit', this.defaultAddress.unit);
			data.append('shipping_street', this.defaultAddress.street);
			data.append('shipping_region', this.defaultAddress.region.text);
			data.append('shipping_province', this.defaultAddress.province.text);
			data.append('shipping_city', this.defaultAddress.city.text);
			data.append('shipping_zip', this.defaultAddress.zip);
			data.append('shipping_landmark', this.defaultAddress.landmark);
			data.append('shipping_fee', parseFloat(this.shippingFee));
			data.append('total_discount', this.discount);
			data.append('document', this.uploadedDocument.file);
			data.append('sub_total', parseFloat(this.$store.getters['user/subTotal']));
			data.append('voucher', this.voucher ? this.voucher.id : null );
			data.append('voucher_type',  this.checkVoucherType());						
			data.append('grand_total', this.$store.state.user.grandTotal);
			data.append('deposit_slip', this.deposit_slip);

			axios.post('/api/care/checkout', data)
			.then(response => {
				const ongoingOrders = this.$store.getters['api/ongoing_orders'];
				this.$refs['loader'].hide();
				
				this.$store.commit('api/add', { key: 'invoices', payload: response.data.invoice });
				this.$store.commit('api/fetchData', { key: 'ongoing_orders', payload: ongoingOrders + 1 });
				this.$store.commit('user/setData', { name: 'uploadedDocument', payload: { 
	                file: null, name: null, preview: null
	            }});

				if (this.$store.getters['user/paymentMethod'] 	=== 2) {
					this.processPaynamics(response.data.form);
				}else {
					this.confirmDialog = true;
				}
			}).catch((err) => {
				this.$refs['loader'].hide();
			});
		},

		checkVoucherType() {
			if(this.voucher) {
				return this.voucher.type == 1 ? 'global' : 'redeemable'
			}
			return null;
		},

		/**
		 * Redirect to profile page
		 * 
		 */
		redirectRoute() {
			this.loading = false;
			let params = 'orders';
			this.$router.replace({ name: 'profile', params : { params } });
		}
	}
}
</script>
