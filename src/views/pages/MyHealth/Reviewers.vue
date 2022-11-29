<template>
	<div>
		<v-navigation-drawer v-model="drawer" fixed :permanent="drawer" :hide-overlay="!drawer" right class="filter__view" width="100%">
      <v-list-item class="px-1 py-2 frm-elevation backgroundColor--white">
        <v-btn
        @click="setDrawer()"
        icon readonly>
            <v-icon>fa-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="pa-0">
        <v-container pa-0 class="cstm-height-100">
          <v-layout row wrap mx-auto pa-5 class="filter__viewList">
            <v-flex xs12 mb-4>
              <h3 class="type-1">Linked Doctors</h3>
            </v-flex>
            <!-- COMPONENT_FILTER_LIST -->
            <template v-for="doctor in doctors">
	            
	            <v-flex class="mb-3" xs11 align-self-center>
	              <!-- TO_DEV_ADD: type-darkerGray bold | When checked -->
	              <p class="mb-0 bold" :class="{'type-darkerGray': findArray(selectedDoctors, doctor.id) }">{{ doctor.fullname }}</p>
                <p class="mb-0" :class="{'type-darkerGray': findArray(selectedDoctors, doctor.id) }">{{ doctor.specialization.name }}</p>
	            </v-flex>
	            <v-flex class="mb-3" xs1>
	              <v-checkbox
	                v-model="selectedDoctors"
	                :value="doctor.id"
	                height="0"
	                color="#DA8924"
	                mt-0
	              ></v-checkbox>
	            </v-flex>
	            <!-- END_COMPONENT_FILTER_LIST -->

						</template>

          </v-layout>
          <v-layout row wrap mx-auto pa-5 mb-12 class="filter__viewBtn">
            <v-flex xs1 mb-8>
              <v-checkbox
                v-model="allow"
                :value="true"
                height="0"
                color="#DA8924"
                value="2"
                mt-0
              ></v-checkbox>
            </v-flex>
            <v-flex xs11 mb-8>
              <p class="mb-0">By checking this box, I'm allowing the following doctors to view my my health records</p>
            </v-flex>
            <v-flex xs12>
              <v-btn class="button cstm-button-radius text-small cstm-width type-gradient-l-r v-btn--large" depressed large dark @click="setConfirmation()">Continue Sending</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-list-item>
    </v-navigation-drawer>

    <ConfirmationDialog
      :show="confirmDialog"
      message="Send health details to selected Doctors?"
      image="icons/help-web-button.svg"
      @cancel="setConfirmation()"
      @proceed="updateReviewers()"
      @close="confirmDialog = false"
      rightButtonText="Proceed"
    >
    </ConfirmationDialog>

    <ConfirmationDialog
      :show="successDialog"
      :message="message"
      image="icons/Check.svg"
      :left-button="false"
      @proceed="setSuccessDialog()"
      rightButtonText="Close"
    >
    </ConfirmationDialog>

    <ErrorDialog
      :show="errorDialog"
      :message="errorMessage"
      @close="errorDialog = false"
    />

    <Loader
    ref="loader"
    ></Loader>

	</div>
</template>
<script>

import ConfirmationDialog from '@/components/ConfirmationDialog';
import ErrorDialog from '@/components/ErrorDialog';
import Spinner from '@/components/Spinner';
import Loader from '@/components/Loader.vue'

export default {


  components: {
    ConfirmationDialog,
    Spinner,
    ErrorDialog,
    Loader
  },

	computed: {
		doctors() {
			return this.$store.state.api.doctors;
		}
	},

	data() {
		return {

      allow: false,

			drawer: false,
			selectedDoctors: [],

      confirmDialog: false,
      successDialog: false,

      errorDialog: false,

      errorMessage: null,
      message: null,
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
			this.selectedDoctors = this.$store.getters['api/reviewers'];
		},

    /*
    |--------------------------------------------------------------------------
    | @Methods
    |--------------------------------------------------------------------------
    */

    /**
     * Get post params
     * 
     */
		getPost() {
			let post = {
				doctors: this.selectedDoctors 
			};
			return post;
		},

    /**
     * Update record reviewers
     * 
     */
		updateReviewers() {

      if(this.check()) {
        this.setConfirmation();
        return;
      }

      this.$refs['loader'].show();
			axios.post(this.routes['api.care.my-health.update-reviewers'], this.getPost())
				.then((response) => {
          this.$refs['loader'].hide();          
					if(response.status === 200) {
						this.setConfirmation();
						this.setSuccessDialog();
						this.$store.commit('api/fetchData', { key: 'reviewers', 'payload': response.data.reviewers });
            this.message = response.data.message;
            this.allow = false;
					}
				}).catch((err) => {
          this.$refs['loader'].hide();          
        });

		},

    /**
     * Set drawer status
     * 
     */
		setDrawer() {
			this.drawer = this.drawer ? false: true;
		},

    /**
     * Set confirmation status
     * 
     */
		setConfirmation() {
			this.confirmDialog = this.confirmDialog ? false: true; 
		},

    /**
     * Set success dialog status
     * 
     */
		setSuccessDialog() {
			this.successDialog = this.successDialog ? false: true; 
		},

    /*
    |--------------------------------------------------------------------------
    | @Checkers
    |--------------------------------------------------------------------------
    */
  
    /**
     * Set error checker
     * 
     */
    check() {
      let hasError = false;

      if(!this.allow) {
        hasError = true;
        this.errorMessage = "Please check the check box to allow doctors to see your records";
        this.errorDialog = true;
      }

      return  hasError;

    },



	},
}
</script>
