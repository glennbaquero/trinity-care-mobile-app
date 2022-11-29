<template>
<div>
	<p class="font-weight-semibold mb-4 mt-6">Prescription</p>
    <div class="frm-inpt-file d-flex align-center">
        <label for="fileupload" class="frm-inpt-file__lbl">{{ fileName }}</label>
        <div class="frm-inpt-file__btn">
            <input 
            @change="uploadFile"
            type="file" id="fileupload" name="file" required>
			<p>Browse</p>
        </div>
    </div>

    <template v-if="selectedItem.prescription_path">
	    <div class="text-center mt-4">
			<v-img
			@click="previewImage(selectedItem.prescription_path)"
		    :src="selectedItem.prescription_path"
		    class="mx-auto elevation-0"
		    contain
			width="250px" height="250px"    
		    ></v-img>    
	    </div>
    </template>

	<p class="font-weight-semibold mb-4 mt-4">Upload from Consultation</p>
    <div class="frm-btn mb-6">
	    <v-btn
	    	@click="setDialog(true)"
			block
			large
			dark
			rounded
			class="btn--green"
			elevation="elevation-0"
			min-height="42"
		>
	      	Browse
	    </v-btn>
	</div>
	<template v-if="selectedConsultation">
		<v-card class="frm-card border-radius--10 box-shadow--5 mb-2" width="100%">
		    <v-list-item two-line>
		        <v-list-item-content>
		            <v-list-item-title class="">Dr. {{ selectedConsultation.doctor_name }}</v-list-item-title>
		            <v-list-item-subtitle class="font-size-small">{{ selectedConsultation.date | format_date }}</v-list-item-subtitle>
		            <v-list-item-subtitle class="font-size-small">{{ selectedConsultation.start_time }} - {{ selectedConsultation.end_time }}</v-list-item-subtitle>
		            <v-list-item-subtitle class="font-size-small">-{{ selectedConsultation.fee }} Credits</v-list-item-subtitle>
		        </v-list-item-content>
		        <v-list-item-action>
		            <v-btn 
		            @click="removeSelectedConsultation()"
		            icon>
		                <v-icon color="grey lighten-1">fa fa-times</v-icon>
		            </v-btn>
		            <small class="text-darkgreen">Completed</small>
		        </v-list-item-action>
		    </v-list-item>
		</v-card>
	</template>

	<v-row>
		<v-col cols="6" class="pr-1">
			<div class="frm-btn">
			    <v-btn
					@click="submit()"
					class="btn--green"
					block
					large
					dark
					rounded
					elevation="elevation-0"
					min-height="42"
			    >
			      Save Changes
			    </v-btn>
			</div>
		</v-col>
		<v-col cols="6" class="pl-1">
			<div class="frm-btn">
			    <v-btn
			    	@click="goBack()"
					block
					large
					dark
					rounded
					outlined
					elevation="elevation-0"
					min-height="42"
			    >
			      Cancel
			    </v-btn>
			</div>
		</v-col>
	</v-row>

	<v-dialog
	v-model="consultationsDialog"
	max-width="290"
	>
	    <v-card class="frm-dialog br-10 px-2 py-5">		
			<div 
			@click="setDialog(false)"
			class="frm-dialog__close-btn mb-4">
				<i class="fa fa-times"></i>
			</div>
			<v-card-title class="pb-1 mt-2 text-center">
				<h3 class="clr--black mx-auto">Please select a previous consultations</h3>
			</v-card-title>			
			<div style="max-height: 300px; overflow: auto;">
				<template v-if="consultations.length">
					<template v-for="consultation in consultations">
						<v-card 
						@click="selectConsultation(consultation)"
						class="frm-card border-radius--10 box-shadow--5 mb-2" width="100%">
						    <v-list-item two-line>
						        <v-list-item-content>
						            <v-list-item-title class="">Dr. {{ consultation.doctor_name }}</v-list-item-title>
						            <v-list-item-subtitle class="font-size-small">{{ consultation.date | format_date }}</v-list-item-subtitle>
						            <v-list-item-subtitle class="font-size-small">{{ consultation.start_time }} - {{ consultation.end_time }}</v-list-item-subtitle>
						            <v-list-item-subtitle class="font-size-small">-{{ consultation.fee }} Credits</v-list-item-subtitle>
						        </v-list-item-content>
						        <v-list-item-action>
						            <small class="text-darkgreen">Completed</small>
						        </v-list-item-action>
						    </v-list-item>
						</v-card>
					</template>
				</template>
				<template v-else>
					<div class="text-center">
						<p class="font-size-small">No consultations found</p>
					</div>
				</template>
			</div>
		</v-card>	
	</v-dialog>

	<SuccessDialog
	:show="success.status"
	:title="success.title"
	:message="success.message"
	@close="goBack()"
	></SuccessDialog>

    <Loader
    ref="loader"
    ></Loader>	

</div>
</template>
<script>

import SuccessDialog from '@/components/SuccessDialog.vue';
import Loader from '@/components/Loader.vue';

export default {

	components: {
		SuccessDialog,
		Loader
	},

	computed: {
		selectedItem() {
			return this.$store.state.cart.selectedCartItem;
		},

	},

	data() {
		return {
			consultationsDialog: false,

			consultations: [],
			selectedConsultation: null,

			success: {
				status: false,
				title: 'Uploading Prescription',
				message: null,
			},

			fileName: 'Upload prescription',
			file: null
		}
	},

	mounted() {
		this.init();
	},

	methods: {

		/*
		|--------------------------------------------------------------------------
		| @Initialize
		|--------------------------------------------------------------------------
		*/
		init() {
			this.fetchCompletedConsultations();
			this.setConsultation();
		},

		/*
		|--------------------------------------------------------------------------
		| @Methods
		|--------------------------------------------------------------------------
		*/

		/**
		 * Fetch completed consultations
		 * 
		 */
		fetchCompletedConsultations() {
			let data = {
				status: 'completed',
				paginate: 'no-pagination'
			};
			axios.post(this.routes['api.care.consultations.fetch-history'], data)
				.then((response) => {
					this.consultations = response.data.consultation_history
				}).catch((err) => {
					console.log(err);
				});
		},

		/**
		 * Set consultation based on cart item consultation
		 * 
		 */
		setConsultation() {
			if(this.selectedItem.consultation_data) {
				this.selectedConsultation = this.selectedItem.consultation_data;
			}
		},

		/**
		 * Event for file uploading
		 * 
		 * @param  array e
		 */
		uploadFile(e) {
			let file = e.target.files;
			if(file.length) {
				this.fileName = file[0].name.length > 25 ? (file[0].name.substring(0, 25) + '...') : file[0].name;
				this.file = file[0]; 
			}
		},

		/**
		 * Generating post data
		 * 
		 */
		getPostData() {

			let data = new FormData;
			data.append('prescription', this.file);
			data.append('cart_item_id', this.selectedItem.id);
			if(this.selectedConsultation) {
				data.append('consultation_id', this.selectedConsultation.id);
			}

			return data;

		},

		/**
		 * Submit prescription 
		 * 
		 */
		submit() {
            this.$refs['loader'].show();			
			axios.post(this.routes['api.care.cart.prescription.upload'], this.getPostData())
				.then((response) => {
	                this.$refs['loader'].hide();					
					this.setSuccessDialog(response.data.message);
				}).catch((err) => {
	                this.$refs['loader'].hide();					
					console.log(err);
				});
		},

		/**
		 * Set dialog status
		 * 
		 * @param boolean status
		 */
		setDialog(status) {
			this.consultationsDialog = status;
		},

		/**
		 * Set selected consultation
		 * 
		 * @param object consultation 
		 */
		selectConsultation(consultation) {
			this.selectedConsultation = consultation;		
			this.setDialog(false);
		},

		/**
		 * Remove selected consultation
		 * 
		 */
		removeSelectedConsultation() {
			this.selectedConsultation = null;
		},

		/**
		 * Set success dialog/message
		 * 
		 * @param string message
		 */
		setSuccessDialog(message) {
			this.success.status = true;
			this.success.message = message;
		},

        previewImage(image) {
            PhotoViewer.show(image);
        },

		/**
		 * Go back to cart
		 * 
		 */
		goBack() {
			this.$PRXRouter().goBack();
		}

	},
	filters: {
		format_date(date) {
			return moment(date).format('LL');
		}
	},	

}

</script>