<template>
	<v-layout pa-5 wrap>
		<v-flex xs12 mb-2>
			<v-list two-line class="cstm-bg-transparent" v-for="(invoice, i) in invoices" :key="i" >
				<v-card class="pa-3 order--card cstm-border-radius frm-elevation"  
				@click="preview(invoice)">

					<v-layout row class="mx-auto">
						<v-flex xs4 py-3>
							<v-img :src="renderImage(invoice.products[0].data)" height="90" contain></v-img>   
						</v-flex>

						<v-flex xs8>
							<v-card-text class="text-left pb-0">
								<p class="font-weight-bold type-black mb-0">Order No.{{ invoice.invoice_number }}</p>
								<h5 class="font-weight-regular type-gray mb-0">Placed on: {{ renderDate(invoice.created_at) }}</h5>
								<h5 class="font-weight-bold type-black">P {{ currencyFormatter(invoice.grand_total) }}</h5>
							</v-card-text>  
						</v-flex>
					</v-layout> 

					<template v-if="(invoice.payment_method == 4 || invoice.payment_method == 6) && !invoice.deposit_slip_path">
						<v-layout row class="mx-auto py-4">
							<v-flex xs12 pa-2>
								<v-divider></v-divider>  
							</v-flex>
							<v-flex xs12 pa-2>
								<h5 class="font-weight-regular mb-0"><span class="font-weight-bold color-light-green">Note:</span> upload your proof of payment to continue processing your order.</h5>
							</v-flex>
						</v-layout> 
					</template>
				</v-card>
			</v-list>
		</v-flex>
		<template v-if="!invoices.length">
			<v-flex xs12 text-center my-10>
				<p class="general__text color-gray mb-0">No ongoing orders</p>
			</v-flex>
		</template>

    <Loader
    ref="loader"
    ></Loader>

	</v-layout>
</template>

<script>
import Loader from '../../components/Loader.vue';

export default {
	components: { Loader },

	data: () => ({
		loading: false,
		invoices: []
	}),

	mounted() {
		this.$refs['loader'].show();
		axios.post('api/care/invoices', { completed: false })
		.then(response => {
			this.$refs['loader'].hide();
			this.invoices = response.data.orders;
		}).catch((err) => {
			this.$refs['loader'].hide();			
		});
	},

	methods: {
		/*
		|--------------------------------------------------------------------------
		| @method
		|--------------------------------------------------------------------------
		*/

		preview(id) {
			this.$store.commit('user/setData', { name: 'selectedInvoice', payload: id });
			this.$PRXRouter().goTo('orderHistory');
		},

		/*
		|--------------------------------------------------------------------------
		| @Render
		|--------------------------------------------------------------------------
		*/

		renderDate(date) {
			return moment(date).format('MMMM DD, YYYY');
		},

		renderImage(json) {
			var obj = JSON.parse(json);
			return obj.full_image;
		}
	}
}
</script>