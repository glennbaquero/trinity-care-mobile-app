<template>
	<div>
		<v-dialog
		v-model="loading"
		persistent
		width="60px"
		>
			<v-card class="text-center py-3">
				<v-progress-circular
				indeterminate
				color="#3B823E"
				></v-progress-circular>
			</v-card>
		</v-dialog>		
	</div>
</template>
<script>

export default {

	props: {
		message: {
			type: String,
			default: "Please wait"
		}
	},

	data() {
		return {
			loading: false,
		}
	},

	methods: {

		show() {
			this.loading = true;
		},

		hide() {
			this.loading = false;
		}

	},

}

</script>