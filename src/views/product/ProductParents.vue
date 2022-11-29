<template>
	<v-layout row wrap mx-0 align-content-start class="product__con">
		<v-container pa-5>
			<!-- SEARCH_COMPONENT -->
			<form @submit.prevent="search">
				<v-flex xs12 class="frm-elevation search__con cstm-button-radius mb-4">
					<v-layout row wrap mx-auto>
						<v-flex xs10 class="search__form">
							<v-text-field
								label="Type your keyword here"
								single-line
								solo
								v-model="query"
							></v-text-field>
						</v-flex>
						<v-flex xs2 class="search__icon">
							<i class="fas fa-search"></i>
						</v-flex>
					</v-layout>
				</v-flex>
			</form>
			<!-- END_SEARCH_COMPONENT -->		
		</v-container>

		<v-container grid-list-lg fluid pa-5>
			<v-layout wrap class="slider_con">
		
				<EmptyFrame v-if="!parents.length" message="No products yet" />

				<v-flex  v-else v-for="(parent, key) in parents" :key="key" xs6 class="product__listCon">
					<v-card flat tile class="cstm-border-radius frm-elevation pt-5" @click="viewVariants(parent)">
						<v-img :src="parent.image" height="150" contain></v-img>
						<v-card-title class="text-center justify-center pb-0 pt-1">
							<h4 class="type-gray slider__text--1">{{ parent.name }}</h4>
						</v-card-title>
						<v-card-text class="pt-0 text-center justify-center">
							<v-btn
							class="button cstm-button-radius mt-4 text-small type-shdw-type1"
							:color="'#3b823e'"
							dark
							width="120"
							>
							View Products
							</v-btn>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
			
		<v-dialog
			v-model="loading"
			persistent
			width="300"
	    >
			<v-card
			color="#FABF24"
			dark
			>
				<v-card-text>
					Please wait
					<v-progress-linear
						indeterminate
						color="white"
						class="mb-0"
					></v-progress-linear>
				</v-card-text>
			</v-card>

	    </v-dialog>

	</v-layout>
</template>
<script>
import EmptyFrame from '@/components/substitute/EmptyFrame';
export default {

	components: {
		'EmptyFrame': EmptyFrame
	},

	data() {
		return {
			loading: false,

			query: null,
			parents: [],
		}
	},

	mounted() {
		this.init();
	},	

	methods: {

		init() {
			this.fetchProductParents();
		},

		fetchProductParents() {

			// this.loading = true;

			let data = {
				query: this.query
			};

			axios.post(this.routes['api.care.product-parents.fetch'], data)
				.then((response) => {
					this.loading = false;
					this.parents = response.data.items;
				}).catch(error => {
					this.loading = false;
				});		

		},

		search() {
			if(this.query) {
				this.fetchProductParents();
			}
		},

		viewVariants(parent) {
			this.$PRXRouter().goTo('product');
			this.$store.commit('parent/set', parent);
			this.$store.commit('pageName/set', 'Products');			
		},

	}

}

</script>