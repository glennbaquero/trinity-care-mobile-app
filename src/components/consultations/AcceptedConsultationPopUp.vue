<template>
	<v-dialog 
	persistent
	v-model="consultationPopUp" max-width="290">
		<v-card class="cstm-border-radius pa-5 py-10 dialog__con">
			<div class="frm-dialog__close-btn"
            @click="close()"><i class="fa fa-times"></i></div>
			<v-list-item-content class="text-center pt-0 pb-5">
				<p class="mb-2"><b>{{ message }}</b></p>
			</v-list-item-content>
			<v-card-actions class="pa-0 justify-center">
				<v-btn
				:disabled="loading"
				:class="{'text-white': !loading}"
				class="button cstm-button-radius v-btn--small"
				color="#3b823e"
				@click="joinChat"
				min-width="100px">
				Join Chat
				</v-btn>
			</v-card-actions>
		</v-card>		
	</v-dialog>
</template>
<script>

import { bus } from '@/assets/js/EventBus.js';

export default {

	data() {
		return {
			consultationPopUp: false,
			message: null,
			loading: false,
			consultation_number: null,
		}
	},

	mounted() {
		this.eventHandler();
	},

	methods: {

		/**
		 * Event handler 
		 * 
		 */
		eventHandler() {
			bus.$on('consultation_approved', (notif) => {
				this.consultationPopUp = true;
				this.message = notif.data.message;
				this.consultation_number = notif.consultation_number;
			});
		},	

		/**
		 * Join chat function
		 * 
		 */
		joinChat() {
			this.setLoading(true);
			let data = {
				params: 'consultation_number',
				consultation_number: this.consultation_number
			};
			axios.post(this.routes['api.care.consultations.fetch-consultation'], data)
				.then((response) => {
					this.close();
					this.setLoading(false);
		            this.$store.commit('onlineConsultation/setConsultation', response.data.consultation);                
		            this.$PRXRouter().goTo('chats');					
				}).catch((err) => {
					console.log(err);
					this.setLoading(false);
				});
		},

		/**
		 * Set loading status
		 * @param boolean status
		 */
		setLoading(status) {
			this.loading = status;
		},

		/**
		 * Close consultation pop-up
		 * 
		 */
		close() {
			this.consultationPopUp = false;
		},

	},

}
</script>

