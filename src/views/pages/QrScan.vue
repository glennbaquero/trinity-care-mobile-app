<template>
  <v-layout row wrap mx-0 align-content-start>
    <v-container px-5 py-7 class="">

    </v-container>
  </v-layout>
</template>
<script>
	export default {
		data() {
			return {
				scannedQr: null,
			}
		},

		mounted() {
			this.init();
		},

		methods: {
			init() {
				this.openQRReader();
			},

		  	openQRReader() {
		  		
		  }
		}
	}
</script>