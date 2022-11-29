<template>
	<v-form ref="form">
		<slot></slot>
	</v-form>
</template>

<script type="text/javascript">
	export default {

		data() {
			return {
				serverErrors: []
			};
		},

		methods: {
			submitForm (validator, throwError = false) {

				return validator.validate()
					.then(validated => {
						return this.deliverPayload(validated, throwError);
					})

			},

			deliverPayload(validated, throwError) {
				if (this.$PRX.dialogLoader.loading || !validated) { return Promise.reject() }

				this.$PRX.dialogLoader.show();

				let form = this.$el,
					params = new FormData(form);

				return axios[this.method](this.action, params)
					.then(response => {
						this.$PRX.dialogLoader.hide();
						return response.data;

					})
					.catch(error => {
						this.$PRX.dialogLoader.hide();
						
						// Set error fields if there is a return value
						this.serverErrors = this.$PRXResponse().parseAndAlertError(error);

						// throw the error down the catch train if true,
						// otherwise, error will get stuck here
						if(throwError) {
							throw error;
						}
					});	
			}
		},

		props: {
			action: {
				default: 'https://httpbin.org/anything',
				type: String
			},

			method: {
				default: 'post',
				type: String
			},
		}
	}
</script>
