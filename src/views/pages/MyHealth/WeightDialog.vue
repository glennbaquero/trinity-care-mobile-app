<template>
	<v-row justify="center">
		<v-dialog
		v-model="weight"
		max-width="290"
		>
		<v-card class="health__dialogCon pt-5">
			<v-btn icon dark class="close--dialog" @click="weight = false">
					<v-icon>{{ 'fa-times' }}</v-icon>
				</v-btn>
			<div class="text-center mb-5">
				<h3>Weight</h3>
			</div>

			<v-form v-model="isFormValid">
				<v-layout class="px-7 weight__contentCol">
					<v-flex xs6>
						<v-col cols="12" sm="6" md="3" class="align-self-center mb-0">
							<v-text-field
							v-model="post.personal_information.weight"
							:rules="[rules.required, rules.number]"
							type="number"
							label="Solo"
							placeholder="Weight"
							solo
							></v-text-field>
						</v-col>
					</v-flex>

					<v-flex xs6>
						<v-col class="align-self-center mb-0 select--modal" cols="12" sm="6" md="3">
							<v-select
							v-model="post.personal_information.weight_units"
							:rules="[rules.required]"
							:items="items"
							label="lbs"
							solo
							></v-select>
						</v-col>
					</v-flex>
				</v-layout>

				<v-card-actions class="text-center">
					<v-btn
					color="#3b823e"
					height="25px"
					dark class="health__dialogBtn mx-auto" 
					:disabled="!isFormValid"
					@click="submitPersonalInformation()">
					save
				</v-btn>

			</v-card-actions>
		</v-form>
	</v-card>
</v-dialog>

	<Loader
	ref="loader"
	></Loader>

<SuccessDialog
:show="successDialog"
:message="message"
image="icons/Check.svg"
@close="setSuccessDialog()"
/>

</v-row>
</template>


<script>
	import Personal from './extensions/personal.js';

	export default {
		mixins: [ Personal ],

		props: {
			show: Boolean,
            
            value: {
                type: Object,
                default: {}
            },

		},

		data () {
			return {
				weight: false,
				items: ['lbs', 'kg'],
			}
		},

		watch: {
			show(val) { 
                this.post.personal_information.weight = this.value.personal_information ? this.value.personal_information.weight : '';
                this.post.personal_information.weight_units = this.value.personal_information ? this.value.personal_information.weight_units : '';				
				this.weight = val
			}
		}, 
	}
</script>