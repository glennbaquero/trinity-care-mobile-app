<template>
	<v-flex xs12 text-center class="box">
		<h2 class="text">{{ message }}</h2>
	</v-flex>
</template>


<script>
	export default {
		props: ['message']
	}
</script>


<style scoped>
	.box {
		background: #dfdfdf;
		padding: 15px 0;
	}

	.text {
		color: #afafaf;
	}
</style>