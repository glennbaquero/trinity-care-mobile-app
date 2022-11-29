<template>
<vue-pull-refresh :on-refresh="onRefresh" :config="pullToRefreshConfig" class="bg-lightGray"> 
	<v-container pa-5 class="consultation__con">
		<v-container coloumn pa-0>
			<v-layout row wrap mx-auto>
				<v-flex xs12>
					<a @click="navigate('consult-doctor')"><v-card class="findDoctor__card cstm-border-radius-10 cstm-elevation-2">
						<v-layout class="px-7 py-5">
							<v-flex xs2 class="align-self-center">
								<v-img :src="$PRXConfig().staticUrl('icons/consult-doctor.svg')" class="ml-0" width="40px" height="40px"></v-img>
							</v-flex>
							<v-flex xs9 pl-3 class="align-self-center">
								<h4>Find a Doctor</h4>
								<span>Click here to view doctors</span>
							</v-flex>
							<v-flex xs1 align-self-center>
								<v-icon class="close--dialog">{{ 'fa-chevron-right' }}</v-icon>
							</v-flex>
						</v-layout>
					</v-card></a>
				</v-flex>		    
			</v-layout>
		</v-container>

		<!-- Frame 2 -->
		<v-container coloumn pa-0 mt-10>
			<v-layout row wrap mx-auto>
				<v-flex xs8>
					<h4>Upcoming Consultations</h4>
				</v-flex>
				<v-flex xs4 text-right align-self-end>
					<h5 class="color-doc-primary2" @click="openHistory()">View History</h5>
				</v-flex>

				<v-flex xs12 class="my-5 mt-5">
					<h4>Approved Consultations</h4>
				</v-flex>

				<template v-if="approved_consultations.length">
					<template v-for="approved_consultation in approved_consultations">
						<v-flex xs12 class="my-1">
							<v-card class="consultation__drCard cstm-border-radius-10 cstm-elevation-2">
								<v-layout class="px-4 py-3">
									<v-flex xs2 class="align-self-center">
										<div class="consultation__drImgHolder">
											<v-img :src="approved_consultation.doctor_image" class="ml-0 mb-3 consultation__drImg" width="60px" height="60px"></v-img>
											<div 
											:class="renderOnlineStatus(approved_consultation.doctor.online, true)">
											</div>
										</div>
									</v-flex>
									<v-flex xs6 ml-5>
										<h5>Dr. {{ approved_consultation.doctor_name }}</h5>
										<span class="color-gray block">{{ approved_consultation.date | format_date }}</span>
										<span class="color-gray block" >{{ approved_consultation.start_time | format_time }} {{ approved_consultation.schedule_type }} - {{ approved_consultation.end_time | format_time }} {{ approved_consultation.schedule_type }}</span>
										<span class="block"><b>{{ approved_consultation.type == 0 ? 'Booking' : 'Instant Chat' }}</b></span>
									</v-flex>
									<v-flex xs4 class="align-self-center">
										<v-btn 
										@click="openChat(approved_consultation)"
										:disabled="!canChat(approved_consultation)"
										style="width: inherit;"
										class="button cstm-button-radius type-green font-weight-bold mx-auto">Chat Now</v-btn>
									</v-flex>									
								</v-layout>
							</v-card>
						</v-flex>
					</template>
				</template>

				<template v-else>
					<v-flex xs12 text-center my-10>
						<p class="general__text color-gray mb-0">No approved consultations yet.</p>
					</v-flex>
				</template>

				<v-flex xs12 class="mt-2 mb-7">
					<v-divider></v-divider>
				</v-flex>

				<v-flex xs12 class="my-5">
					<h4>Pending Consultations</h4>
				</v-flex>

				<template v-if="pending_consultations.length">
					<template v-for="pending_consultation in pending_consultations">
						<v-flex xs12 class="my-1">
							<v-card class="consultation__drCard cstm-border-radius-10 cstm-elevation-2">
								<v-layout class="px-4 py-3">
									<v-flex xs2 class="align-self-center">
										<div class="consultation__drImgHolder">
											<v-img :src="pending_consultation.doctor_image" class="ml-0 mb-3 consultation__drImg" width="60px" height="60px"></v-img>
											<div
											:class="renderOnlineStatus(pending_consultation.doctor.online, true)"
											></div>
										</div>
									</v-flex>
									<v-flex xs6 ml-5>
										<h5>Dr. {{ pending_consultation.doctor_name }}</h5>
										<span class="color-gray block">{{ pending_consultation.date | format_date }}</span>
										<template v-if="pending_consultation.start_time && pending_consultation.date && pending_consultation.type == 0">
											<span class="color-gray block">
												<div>
													{{ pending_consultation.start_time | format_time }} {{ pending_consultation.schedule_type }} - {{ pending_consultation.end_time | format_time }} {{ pending_consultation.schedule_type }}
												</div>
											</span>						
										</template>
										<span class="block"><b>{{ pending_consultation.type == 0 ? 'Booking' : 'Instant Chat' }}</b></span>
									</v-flex>
									<v-flex xs4 class="align-self-center">
										<v-btn class="button type-white type-shdw-type1-gray type-1" @click="cancelConsultation(pending_consultation.id)">cancel</v-btn>
									</v-flex>
								</v-layout>
							</v-card>
						</v-flex>
					</template>
				</template>
				
				<template v-else>
					<v-flex xs12 text-center my-10>
						<p class="general__text color-gray mb-0">No pending consultations.</p>
					</v-flex>
				</template>

			</v-layout>

			<Loader
			ref="loader"
			></Loader>

			<ConsultationHistory 
			ref="history"
			></ConsultationHistory>

			<SuccessDialog
			:show="successDialog"
			:message="message"
			image="icons/Check.svg"
			@close="successDialog = false"
			/>
		</v-container>
	</v-container>
</vue-pull-refresh>
</template>

<script>
import ConsultationHistory from './ConsultationHistory';
import Loader from '../../components/Loader.vue';
import SuccessDialog from '@/components/SuccessDialog';
import VuePullRefresh from 'vue-pull-refresh';

export default {
	components: {
		ConsultationHistory,
		Loader,
		SuccessDialog,
		VuePullRefresh,
	},

	data () {
		return {
			review: true,

			consultationHistory: false,
			successDialog: false,
			message: null,
			loading: false,

			pending_consultations: [],
			approved_consultations: [],
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
        	this.fetchConsultations();
        },


        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        /**
         * Fetch consultations
         * 
         */
		fetchConsultations(hasLoading = true) {
				
			if(hasLoading) {
				this.$refs['loader'].show();
			}
			
			axios.post(this.routes['api.care.consultations.fetch'])
			.then((response) => {
				this.$refs['loader'].hide();
				this.pending_consultations = response.data.pending_consultations;
				this.approved_consultations = response.data.approved_consultations;
				this.$store.commit('api/fetchData', { key : 'credits', payload: response.data.credits });
			}).catch((err) => {
				this.$refs['loader'].hide();
				this.$alert.show();
			});
		},

        /**
         * Refresh init
         * 
         */
	    onRefresh() {
	      return new Promise((resolve, reject) => {
	          setTimeout(() =>{
	              this.fetchConsultations(false);
	              resolve();
	          }, 1000);
	      });
	    },         

	    /**
	     * Cancel specific consultation
	     * 
	     * @param int consultation_id
	     */
		cancelConsultation(consultation_id) {
			let data = {
				id: consultation_id
			};
			this.$refs['loader'].show();

			axios.post(this.routes['api.care.consultations.cancel'], data)
				.then((response) => {
				 	this.$refs['loader'].hide();
					if(response.status === 200) {
						this.setSuccessDialog();
						this.fetchConsultations();
						this.message = response.data.message;
					}
				}).catch((err) => {
				 	this.$refs['loader'].hide();
				 	this.$alert.show();
				});
		},

		/**
		 * Open chat page
		 * 
		 * @param  object consultation
		 */
	    openChat(consultation) {
            this.$store.commit('onlineConsultation/setConsultation', consultation);                
            this.$PRXRouter().goTo('chats');
	    },

	    /**
	     * Set success dialog
	     * 
	     */
		setSuccessDialog() {
			this.successDialog = this.successDialog ? false: true;
		},

		/**
		 * Open history
		 * 
		 */
        openHistory() {
			this.$refs['history'].show();
        },

        /**
         * Navigate to specific component
         * 
         * @param  string route
         */
        navigate(route) {
        	this.$PRXRouter().goTo(route);
        },

	    /*
      	|--------------------------------------------------------------------------
      	| @Renders
      	|--------------------------------------------------------------------------
      	*/

	    /*
        * Render online status of a doctor
        * 
        */
        renderOnlineStatus(status ,isClass) {
            if(status == 1) {
                if(isClass) {
                    return 'online--status online';
                }
                return 'Online';
            } else if (status == 2) {
                if(isClass) {
                    return 'online--status busy';
                }
                return 'Busy';
            } else {
                if(isClass) {
                    return 'online--status offline';
                }
                return 'Offline';
            }
            return;
        },
		/*
		|--------------------------------------------------------------------------
		| @Checkers
		|--------------------------------------------------------------------------
		*/
		
		/**
		 * Check if user can chat to a specific consultation
		 * 
		 * @param  object consultation
		 */
		canChat(consultation) {
			if(consultation) {

				if(consultation.status == "Completed") {
					return false;
				}
				if(consultation.type === 0) {
					if(consultation.end_time) {
						let end = moment(moment(consultation.date).format('MM/D/YYYY') +' '+ consultation.end_time + ' ' + consultation.schedule_type),
						now = moment();
						let duration = end.diff(now, 'minutes');

						if(duration <= 0) {
							return false;
						} else if (duration > 60) {
							return false;
						} else {
							return true;
						}
					} 

				} else {

					if(consultation.remaining) {
						let now = moment();
						let start = moment(moment(consultation.date).format('MM/D/YYYY') +' '+ consultation.start_time);
						start = start.add('seconds', consultation.remaining);
						let left = start.diff(now, 'minutes');
						if(left <= 0) {
							return false;
						} else if (left > 60) {
							return false;
						} else {
							return true;
						}           
					}

				}
			}
		}


     },


     filters: {
     	format_time(time) {
     		if(time) {
	     		return moment(moment().format('MM/D/YYYY') +' '+ time).format('h:mm');
     		}
     	},
     	format_date(date) {
     		if(date) {
	     		return moment(date).format('MMM DD, YYYY');
     		}
     	}
     },

 }
 </script>