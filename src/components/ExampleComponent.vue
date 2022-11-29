<template>
	<v-layout align-center justify-space-around column>
		<v-flex xs12 class="pa-4">
			<v-img :src="$PRXConfig().staticUrl('logo.png')" max-width="200" class="mx-auto"></v-img>
			<div class="my-3 text-center">{{ $PRXConfig().appVersion }}</div>
		</v-flex>
		<v-flex xs12 align-center>
			<v-layout align-center justify-space-around>
				<v-btn class="mx-1 caption" @click="showLoader" color="success">
					<v-icon small class="mr-2">fa-sync-alt</v-icon>
					Load
				</v-btn>
				<v-btn class="mx-1 caption" @click="showAlert" color="warning">
					<v-icon small class="mr-2">fa-exclamation-triangle</v-icon>
					Alert
				</v-btn>
				<v-btn class="mx-1 caption" @click="showToaster" color="error">
					<v-icon small class="mr-2">fa-bread-slice</v-icon>
					Toast
				</v-btn>
			</v-layout>
		</v-flex>
	</v-layout>
</template>

<script type="text/javascript">
	export default {
		mounted () {
		},

		methods: {
			showLoader () {
				this.$PRX.dialogLoader.show();

				setTimeout(() => {
					this.$PRX.dialogLoader.hide();
				}, 3000);
			},

			showAlert () {
				this.$PRX.alert.warning('You\'re awesome.', 'Warning!')
					.then(() => {
						console.log('do something after close.');
					});
			},

			showToaster () {
				this.$PRX.toast.error('Oops.. No bread here.');
			}

		}
	}
</script>
