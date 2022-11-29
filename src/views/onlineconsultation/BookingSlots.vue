<template>
	<v-layout row wrap mx-auto class="booking__slotHolder">
		<template v-for="schedule in filteredSchedules">
			<template v-if="schedule.status && canBook(schedule.date, schedule.start_time, schedule.end_time, schedule.type)">
				<v-flex xs6 class="align-self-center">
					<v-layout row wrap mx-auto class="schedule__Holder">
				 		<v-flex xs2 class="align-self-center">
				 			<div class="booking--dot"></div>  
				 		</v-flex>
				 		<v-flex xs10 class="align-self-center">
				 		  <p class="mb-0">{{ renderTime(schedule) }}</p>
				 		</v-flex>    
				    </v-layout>
				</v-flex>
				<v-flex xs6 class="align-self-center text-right py-1">
					<template v-if="hasSufficientCredit(schedule.doctor)">
						<v-btn
							class="button text-center cstm-button-radius type-white type-shdw-type1-gray type-1 text-small"
							@click="viewSummary(schedule)"
							height="26"
							width="145"
						>
						<i class="fa fa-plus fa-sm mr-1" style="color:green !important"></i> <small>Book Appointment</small>
						</v-btn>
					</template>
					<template v-else>
						<v-btn
							class="button cstm-button-radius type-white type-shdw-type1-gray type-2 font-weight-bold text-small"
							:disabled="true"
						>
							<v-img :src="$PRXConfig().staticUrl('icons/cancel-icon.png')" width="16px" max-height="16px" max-width="16px" contain></v-img> Insufficient credits
						</v-btn>
					</template>
				</v-flex>
			</template>
		</template>

		<template v-if="!filteredSchedules.length">
	        <v-layout row wrap mx-auto class="px-3">
	          <v-flex xs12 text-center>
	            <p class="mb-0 font-weight-bold type-black">No schedules</p>
	          </v-flex>
	        </v-layout>
		</template>
	</v-layout>
</template>

<script>
	export default {

		props: {
			schedules: {
				type: Array,
				default: []
			},	

			date: {
				type: [String, Date],
				default: moment()
			},
		},

		computed: {
			filteredSchedules() {
				let schedules = this.schedules;

				schedules = schedules.filter((schedule) => {
					if(schedule) {
						return schedule.status && this.canBook(schedule.date, schedule.start_time, schedule.end_time, schedule.type);
					}
				});

				return schedules;
			}
		},

		data() {
			return {
				bookingSummaryView: false,
			}
		},

		methods: {

            /*
            |--------------------------------------------------------------------------
            | @Initialize
            |--------------------------------------------------------------------------
            */

            /**
             * Open schedule summary modal
             * 
             * @param  object schedule
             */
			viewSummary(schedule) {
				this.$emit('selected', schedule);
	      	},

            /*
            |--------------------------------------------------------------------------
            | @Renders
            |--------------------------------------------------------------------------
            */	      	

            /**
             * Render time
             * 
             * @param  object schedule
             */
	      	renderTime(schedule) {
	      		let start = moment(moment(schedule.date).format('MM/D/YYYY') +' '+  schedule.start_time).format('hh:mm'),
	      			end = moment(moment(schedule.date).format('MM/D/YYYY') +' '+  schedule.end_time).format('hh:mm');
	     			
	     			if(schedule.type == 'am') {
	     				if(schedule.start_time == "11:30" && schedule.end_time == "12:00") {
	     					return start +' AM - ' + end + ' PM';
	     				}
	     				return start +' AM - ' + end + ' AM';
	     			}
	     			if(schedule.type == 'pm') {
	     				if(schedule.start_time == "11:30" && schedule.end_time == "12:00") {
	     					return start +' PM - ' + end + ' AM';
	     				}
	     			} 
	     		return start +' PM - ' + end + ' PM';	
	      	},


            /*
            |--------------------------------------------------------------------------
            | @Checkers
            |--------------------------------------------------------------------------
            */
           	
			canBook(date, startTime, endTime, schedType) {
				let start = moment(moment(date).format('MM/D/YYYY') +' '+  startTime + ' ' +  schedType),
				end = moment(moment(date).format('MM/D/YYYY') +' '+  endTime + ' ' + schedType),
				now = moment(moment().format('MM/D/YYYY h:mm a'));
				if(now >= start) {
					return false;
				}
				return true;

			},

           	/**
           	 * Check if user can book
           	 * 
           	 * @param  int fee
           	 */
			hasSufficientCredit(doctor) {
				if(doctor) {
					if(this.$store.state.api.credits >= doctor.consultation_fee) {
						return true;
					}
				}
				return false;

			},

		},

	}
</script>