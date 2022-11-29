<template>
	<v-layout align-center justify-center text-center>
		<div>
			<h2>You don't have any</h2>
			<h2>items in your cart</h2>
			<div class="frm-btn">
				<v-btn
				rounded
				min-height="42"
				class="btn--green mt-4"
				width="150"
				color="#3b823e"
				dark
				elevation="elevation-0"
				@click="$PRXRouter().goTo('product')"
				>
					Browse products
				</v-btn>
			</div>
		</div>
	</v-layout>
</template>
