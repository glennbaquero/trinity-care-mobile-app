<template>
	<v-dialog v-model="alert" max-width="290">
		<v-card class="cstm-border-radius pa-5 py-10 dialog__con">
			<v-img :src="icon" class="mx-auto text-center" width="70px" height="70px"></v-img>
			<v-card-title class="px-7 pt-3 pb-32 justify-center"><h2 class="mb-0 text-center">{{ title }}</h2></v-card-title>
			<v-list-item-content class="text-center pt-0 pb-5">
				<p class="mb-2" v-html="message"></p>
			</v-list-item-content>
			<v-card-actions class="pa-0 justify-center">
				<v-btn
				class="button cstm-button-radius v-btn--small"
				color="#3b823e"
				dark
				@click="hideAlert()"
				min-width="100px">
				Okay
				</v-btn>
			</v-card-actions>
		</v-card>		
	</v-dialog>	
</template>

<script>

import Vue from 'vue';

export default {

	data() {
		return {
			alert: false,

			title: "Something went wrong",
			message: "Something went wrong. Please try again.",
			icon: this.$PRXConfig().staticUrl('icons/prompt.svg')
		}
	},

	mounted() {

		if(typeof(Vue.prototype.dialog) !== 'object') {
			Vue.prototype.$alert = {};
		}

		Vue.prototype.$alert = this;

	},

	methods: {

		show(title = null, message = null, icon = null) {
			this.alert = true;
			if(icon) {
				this.icon = icon;
			}
			if(title && message) {
				this.title = title;
				this.message = message;
			}
		},

		hideAlert() {
			this.alert = false;
			setTimeout(() => {
				this.icon = this.$PRXConfig().staticUrl('icons/prompt.svg');
			}, 200)
		}
	}
}

</script>