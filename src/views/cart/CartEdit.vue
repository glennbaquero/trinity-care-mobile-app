<template>
	<v-row class="px-4 py-5" no-gutters>
		<v-col cols="12">
			<v-tabs color="#3B823E" background-color="#f4f4f4" class="frm-tabs">
				<v-tabs-slider></v-tabs-slider>
				<v-tab ripple="false" class="px-0 mr-6 ml-0">
					Link Doctor
				</v-tab>
				<template v-if="hasPrescription">
			      	<v-tab ripple="false" class="px-0">
				        Prescription
				    </v-tab>
			    </template>

			    <v-tab-item>
			    	<MDLinking
                    ></MDLinking>
			    </v-tab-item>
			    <v-tab-item>
                    <UploadPrescription
                    ></UploadPrescription>
			    </v-tab-item>
			</v-tabs>
		</v-col>
	</v-row>
</template>
<script>

import MDLinking from './CartPages/MDLinking.vue';
import UploadPrescription from './CartPages/UploadPrescription.vue';

export default {
	components: {
		MDLinking,
        UploadPrescription
	},

	computed: {
		selectedItem() {
			return this.$store.state.cart.selectedCartItem;
		},

		hasPrescription() {
			if(this.selectedItem.product.prescriptionable) {
				return true;
			}
		},
	},

}
</script>