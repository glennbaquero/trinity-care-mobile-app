<template>
	<v-row justify="center">
		<v-dialog
		v-model="creditsDeduction"
		width="290"
		persistent
		>
		<v-card class="health__dialogCon pt-3 pb-5">
			<!-- <v-icon class="close--dialog" @click="creditsDeduction = false">{{ 'fa-times' }}</v-icon> -->
			<v-layout row wrap mx-auto class="py-5 px-7">
				<v-flex xs3>
					<v-img :src="$PRXConfig().staticUrl('icons/consult-doctor.svg')" class="mx-auto" width="30px" height="30px"></v-img>
				</v-flex>
				<v-flex xs9 class="text-left align-xself-center">
					<p class="font-weight-normal type-black mb-0"><span class="font-weight-bold">{{ fee }} credits</span> will be deducted once the chat is approved. Do you wish to proceed?</p>  
				</v-flex>
			</v-layout>

			<v-layout row wrap mx-auto class="px-7 pt-3">
				<v-flex xs6 class="text-center">
					<v-btn
						@click="hide()"
						class="button cstm-button-radius type-white type-shdw-type1-gray type-2 font-weight-bold text-small">
						No
					</v-btn>
				</v-flex>
				<v-flex xs6 class="text-center">
					<v-btn
					class="button cstm-button-radius type-green font-weight-bold mx-auto text-small"
					@click="confirm()"
					>
					Yes
					</v-btn>
				</v-flex>
			</v-layout>
	</v-card>
	</v-dialog>

	<v-dialog
	v-model="successModal"
	width="290"
	persistent
	>
		<v-card class="health__dialogCon pt-3 pb-5">
			<v-layout row wrap mx-auto class="py-5 px-7">
				<v-flex xs3 class="">
					<v-img :src="$PRXConfig().staticUrl('icons/consult-doctor.svg')" class="mx-auto" width="30px" height="30px"></v-img>
				</v-flex>
				<v-flex xs9 class="text-left align-self-center">
					<p class="mb-1 font-weight-bold type-black">Chat request has been sent</p> 
				</v-flex>
			</v-layout>

			<v-layout row wrap mx-auto class="px-7 pt-3">
				<v-flex xs12 class="text-center">
					<v-btn
					class="button cstm-button-radius type-green font-weight-bold mx-auto text-small"
					@click="openChat()"
					>
					Okay
				</v-btn>
			</v-flex>
		</v-layout>
		</v-card>
	</v-dialog>

	<Loader
	ref="loader"
	></Loader>

</v-row>
</template>


<script>

    import Loader from '@/components/Loader.vue';

	export default {
		components: {
            Loader,
		},

		data () {
			return {
				creditsDeduction: false,
				chatRequest: false,

				successModal: false,
				responseData: null
			}
		},

		computed: {
			doctor() {
				if(this.$store.state.viewDoctors.selected) {
					return this.$store.state.viewDoctors.selected;
				}
			},
			fee() {
				if(this.doctor) {
					return this.doctor.consultation_fee;
				}
			},
		},

		methods: {

			show() {
				this.creditsDeduction = true;
			},

			hide() {
				this.creditsDeduction = false;	
			},

			confirm() {

                this.$refs['loader'].show();

				let data = {
					doctor_id: this.doctor.id,
					type: 1,
					fee: this.doctor.consultation_fee
				};

				axios.post(this.routes['api.care.consultations.chat-request'], data)
					.then((response) => {
		                this.$refs['loader'].hide();
		                this.hide();
		                
		                this.responseData = {
		                	consultation: response.data.consultation,
		                	doctor: response.data.doctor
		                };

		                this.successModal = true;
					}).catch((err) => {
		                this.$refs['loader'].hide();
					});

			},

			openChat() {
				this.successModal = false;
				this.$emit('openChat', this.responseData);
			},
		},

	}
</script>