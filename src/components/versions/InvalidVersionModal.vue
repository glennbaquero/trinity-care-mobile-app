<template>
	<v-dialog 
	persitent
	v-model="alert" max-width="290">
		<v-card class="cstm-border-radius pa-5 py-10 dialog__con">
			<v-img :src="this.$PRXConfig().staticUrl('icons/prompt.svg')" class="mx-auto text-center" width="70px" height="70px"></v-img>
			<v-card-title class="px-7 pt-3 pb-32 justify-center"><h2 class="mb-0 text-center">{{ title }}</h2></v-card-title>
			<v-list-item-content class="text-center pt-0 pb-5">
				<p class="mb-2" v-html="message"></p>
			</v-list-item-content>
			<v-card-actions class="pa-0 justify-center">
				<v-btn
				class="button cstm-button-radius v-btn--small"
				color="#3b823e"
				dark
				@click="update()"
				min-width="100px">
				Update
				</v-btn>
			</v-card-actions>
		</v-card>		
	</v-dialog>	
</template>
<script>

export default {
	props: {
		title: {
			type: String,
			default: 'Your app is outdated',
		},

		message: {
			type: String,
			default: 'Please download the new version of the app.',
		},

		downloadLink: {
			type: String,
			default: null,
		},

		alert: {
			type: Boolean,
			default: false
		},

	},

	methods: {

		/**
		 * Open appstore or playstore
		 * 	
		 */
		update() {
			window.location.replace(this.downloadLink)
		}
	}
}

</script>