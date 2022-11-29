<template>
<div>
	<div class="form__input--text search__form my-3">
		<v-text-field
			v-model="search"
            type="text"
            color="#3B823E"
            single-line
            solo
            hide-details
            placeholder="Type Doctor's name here..."
            append-icon="fa fa-search"
            class="border-radius--50"
      	></v-text-field>
	</div>


	<p class="font-weight-semibold mb-2">Recently Linked</p>
	<template v-if="linked">
		<v-card class="frm-card mb-2 bg-transparent elevation-0" width="100%">
			<div class="d-flex align-center">
				<div class="my-2 col-2 pa-0">
					<v-badge bordered bottom color="#00c353" dot offset-x="10" offset-y="10">
						<v-avatar size="40">
							<v-img :src="linked.full_image"></v-img>
						</v-avatar>
					</v-badge>
				</div>
				<div class="col-7 pa-0">
        		    <v-list-item two-line class="pl-0">
        		        <v-list-item-content>
        		            <v-list-item-title class="font-weight-semibold">{{ linked.fullname }}</v-list-item-title>
        		            <v-list-item-subtitle class="font-size-small">{{ linked.specialization_name }}</v-list-item-subtitle>
        		        </v-list-item-content>
        		    </v-list-item>	        					
				</div>
				<div class="col-3 pa-0 text-right d-flex">
					<div class="frm-btn">                 
					    
					</div>
					<div class="frm-btn ml-auto">                 
					    <v-btn 
					    @click="removeLinked()"
					    icon>
					        <v-icon color="a80000">fa fa-times</v-icon>
					    </v-btn>
					</div>
				</div>
			</div>
		</v-card>
	</template>
	<template v-else>
		<div class="text-center">
			<p class="font-size-small">No Linked doctor</p>
		</div>
	</template>

	<v-flex xs12 class="mt-7 mb-7">
		<v-divider></v-divider>
	</v-flex>

	<p class="font-weight-semibold mb-2">My Doctors</p>
	
	<template v-if="filteredDoctors.length">
		<template v-for="doctor in filteredDoctors">
    		<v-card class="frm-card mb-2 bg-transparent elevation-0" width="100%">
    			<div class="d-flex align-center">
    				<div class="my-2 col-2 pa-0">
    					<v-badge bordered bottom color="#00c353" dot offset-x="10" offset-y="10">
    						<v-avatar size="40">
    							<v-img :src="doctor.full_image"></v-img>
    						</v-avatar>
    					</v-badge>
    				</div>
    				<div class="col-7 pa-0">
	        		    <v-list-item two-line class="pl-0">
	        		        <v-list-item-content>
	        		            <v-list-item-title class="font-weight-semibold">{{ doctor.fullname }}</v-list-item-title>
	        		            <v-list-item-subtitle class="font-size-small">{{ doctor.specialization_name }}</v-list-item-subtitle>
	        		        </v-list-item-content>
	        		    </v-list-item>	        					
    				</div>
    				<div class="col-3 pa-0 text-right d-flex">
    					<div class="frm-btn">                 
    					</div>
    					<div class="frm-btn ml-auto">                 
    					    <v-btn
    					    @click="link(doctor)"
    					    icon>
    					        <v-icon>fa fa-link</v-icon>
    					    </v-btn>
    					</div>
    				</div>
    			</div>
    		</v-card>
		</template>
	</template>
	<template v-else>
		<div class="text-center">
			<p class="font-size-small">No doctors to link</p>
		</div>
	</template>	
	<v-row>
		<v-col cols="6" class="mt-8 pr-1">
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
		<v-col cols="6" class="mt-8 pl-1">
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

		filteredDoctors() {
			let doctors = this.doctors;

			if(this.linked && this.doctors.length) {

				doctors = doctors.filter((doctor) => {
					return this.linked.id != doctor.id;
				});
			}

			if(this.search) {
				doctors = doctors.filter((doctor) => {
					return doctor.fullname.toLowerCase().includes(this.search.toLowerCase())
				});
			}
			return doctors;
		},
	},

	data() {
		return {
			doctors: [],
			linked: null,

			search: null,

			success: {
				status: false,
				title: 'Update Cart Item',
				message: null,
			},
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
			this.fetchMyDoctors();
			this.setLinkedMD();
		},


		/*
		|--------------------------------------------------------------------------
		| @Methods
		|--------------------------------------------------------------------------
		*/
		
		/**
		 * Fetch my doctors
		 * 
		 */
		fetchMyDoctors() {
            this.$refs['loader'].show();
			let data = {
				product_id: this.selectedItem.product_id
			};
			axios.post(this.routes['api.care.my-doctors.fetch'], data)
				.then((response) => {
		            this.$refs['loader'].hide();					
					this.doctors = response.data.doctors ? response.data.doctors : [];
					this.doctors.forEach((doctor) => {
						doctor.fullname = "Dr. " + doctor.fullname;
					});					

				}).catch((err) => {
		            this.$refs['loader'].hide();					
					console.log(err);
				});
		},

		/**
		 * Set linked MD
		 * 
		 */
		setLinkedMD() {
			if(this.selectedItem && this.selectedItem.linked_md) {
				this.linked = this.selectedItem.linked_md;
			} 
		},

		/**
		 * Submit cart item update
		 * 
		 */
		submit() {
			let data = {
				cart_item_id: this.selectedItem.id,
				doctor_id: this.linked ? this.linked.id : null,
			};
            this.$refs['loader'].show();
			axios.post(this.routes['api.care.cart.linked-md.update'], data)
				.then((response) => {
		            this.$refs['loader'].hide();					
					this.setSuccessDialog(response.data.message);
				}).catch((err) => {
		            this.$refs['loader'].hide();					
					console.log(err);
				});
		},

		/**
		 * Link specific doctor
		 * 
		 * @param  object doctor
		 */
		link(doctor) {
			this.linked = doctor;
		},

		/**
		 * Remove linked md
		 * 
		 */
		removeLinked() {
			this.linked = null;
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

		/**
		 * Go back to cart
		 * 
		 */
		goBack() {
			this.$PRXRouter().goBack();
		}
	}

}
</script>