<template>
	<svg :width="width"  :height="height"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-dual-ring" style="background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%;">
		<circle cx="50" cy="50" fill="none" stroke-linecap="round" r="40" :stroke-width="stroke" :stroke="strokeColor" stroke-dasharray="62.83185307179586 62.83185307179586">
			<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
		</circle>
	</svg>
</template>

<script>
	export default {
		props: {
			width: { default: '35px' },
			height: { default: '35px' },
			stroke: { default: '10' },
			strokeColor: { default: '#efefef' }
		}
	}
</script>
