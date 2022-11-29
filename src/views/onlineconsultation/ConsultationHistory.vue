<template>
	<v-row justify="center">
		<v-dialog v-model="history" fullscreen hide-overlay transition="dialog-right-transition">
			<v-card class="consultation__historyCon">
				<v-toolbar class="consultation__historyTitle type-shdw-gray">
					<v-btn icon dark @click="hide">
						<v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
					</v-btn>
					<v-toolbar-title>Consultation History</v-toolbar-title>
				</v-toolbar>
				<vue-pull-refresh :on-refresh="onRefresh" :config="pullToRefreshConfig"> 
					<v-container coloumn pa-5>
						<v-layout row wrap mx-auto>
							<v-flex xs12>
								<template v-for="consultation in consultation_history">
									<v-card class="consultation__historyCard" @click="openActions(consultation)">
										<v-layout class="pa-5">
											<v-flex xs8>
												<p class="mb-0">{{ consultation.doctor_name }}</p>
												<span>{{ consultation.date | format_date }}</span>
												<span class="clr-black">{{ renderTime(consultation.start_time, consultation.end_time) }}</span>
												<span>- {{ consultation.fee }} credits</span>
											</v-flex>
											<v-flex xs4 class="align-self-center">
												<span class="status">{{ consultation.status }}</span>
												<template v-if="consultation.status == 'Approved'">
													<span class="status">{{ renderTimeLeft(consultation.type, consultation.date, consultation.start_time, consultation.end_time, consultation.remaining) }}</span>
												</template>
											</v-flex>
										</v-layout>
									</v-card>
								</template>

						      	<infinite-loading class="mt-3" :identifier="infiniteId" @infinite="fetchHistory" ref="infiniteLoading">
						            <span slot="spinner">
						              <template v-if="this.page > 1">
						                <v-img class="mx-auto" :src="$PRXConfig().staticUrl('images/loading.gif')" width="40px" ></v-img>
						              </template>
						            </span>
						          <div slot="no-more"> 
						              <template v-if="consultation_history.length <= 0">
						                 <p class="general__text color-gray mb-0">No consultation history.</p>
						              </template>
						              <template v-else>
						                <p class="general__text color-gray mb-0">No more consultation history found.</p>
						              </template> 
						          </div>
  						          <div slot="no-results"> 
						          </div>
						      </infinite-loading>

								<ChooseActionDialog ref="actions"></ChooseActionDialog>
							</v-flex>
							<template v-if="!consultation_history.length">
								<v-flex xs12 text-center>
									<p class="general__text color-gray"><b>No consultation history</b></p>
								</v-flex>
							</template>						
						</v-layout>
					</v-container>
				</vue-pull-refresh>
			</v-card>
		</v-dialog>

		<Loader
		ref="loader"
		></Loader>
	</v-row>
</template>


<script>
	import ChooseActionDialog from './modals/ChooseActionDialog.vue';
	import Loader from '../../components/Loader.vue';
	import VuePullRefresh from 'vue-pull-refresh';

	export default {
		components: {
			ChooseActionDialog,
			Loader,
			VuePullRefresh,
		},

		data () {
			return {
				history: false,
				message: null,
				consultation_history: [],
      			infiniteId: +new Date(),
				page : 1,
			}
		},

		methods: {
			/*
			|--------------------------------------------------------------------------
			| @Initialize
			|--------------------------------------------------------------------------
			*/

			/*
			|--------------------------------------------------------------------------
			| @Methods
			|--------------------------------------------------------------------------
			*/

			fetchHistory($state) {

				let data = {
					page : this.page
				}
				axios.post(this.routes['api.care.consultations.fetch-history'], data)
					.then((response) => {
						this.$refs['loader'].hide();
						if(response.data.consultation_history.data.length) {				
							this.consultation_history.push(...response.data.consultation_history.data);
							this.page++;
            				$state.loaded();
            				this.$refs['loader'].hide();	
						}else {
							$state.complete();
						}
					}).catch((err) => {
						this.$refs['loader'].hide();
				});
			},

			openActions(consultation) {
				if(consultation.status == 'Approved' || consultation.status == 'Completed') {
					this.$refs['actions'].show(consultation)
				}
			},

			show() {
				this.history = true;
				this.$refs['loader'].show();
			},

			hide() {
			    this.page = 1;
			    this.$refs.infiniteLoading.stateChanger.reset();
				this.history = false;
			},

			/**
			 * Pull to trigger fetchHistory()
			 * 	 
			 */
		    onRefresh: function() {
		      	return new Promise((resolve, reject) => {
		          setTimeout(() =>{
		              this.fetchHistory();
		              resolve();
		          }, 1000);
		      	});
		    },

			/*
			|--------------------------------------------------------------------------
			| @Renders
			|--------------------------------------------------------------------------
			*/
			
			renderTimeLeft(type, date, start, end, remaining) {
				if(type === 0) {
					if(end) {
						let end = moment(moment(date).format('MM/D/YYYY') +' '+ start),
						now = moment();
						let duration = end.diff(now, 'minutes');

						if(duration <= 0) {
							return '';
						} else if (duration > 60) {
							return 'Not yet started';
						} else {
							return duration + 'mins left';
						}
					} 

				} else {

					if(remaining) {
						let now = moment();
						start = moment(moment(date).format('MM/D/YYYY') +' '+ start);
						start = start.add('seconds', remaining);
						let left = start.diff(now, 'minutes');

						if(left <= 0) {
							return '';
						} else if (left > 60) {
							return 'Not yet started';
						} else {
							return left + 'mins left';
						}						
					}
          
				}
			},

			/**
			* Render consultation time
			* 
			* @param  startTime
			* @param  endTime
			*/
			renderTime(startTime, endTime) {
				if(startTime && endTime) {
				  let start = moment(moment().format('MM/D/YYYY') + ' ' + startTime).format('hh:mm A'),
				  end = moment(moment().format('MM/D/YYYY') + ' ' + endTime).format('hh:mm A');          

				  return start +' - ' + end;        
				}
			},
			
		},

		filters: {
			format_time(time) {
     			return moment(moment().format('MM/D/YYYY') +' '+ time).format('h:mm A');
			},
			format_date(date) {
				return moment(date).format('LL');
			}
		},

	}
</script>

