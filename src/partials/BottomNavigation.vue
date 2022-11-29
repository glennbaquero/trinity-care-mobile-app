<template v-if="authenticated">
<v-bottom-navigation fixed class="footer" height="60px" grow
v-model="bottomNav"
v-show="showBottomNav"
>
	<v-btn 
	value="home"
	:input-value="$PRXRouter().isOnRoute('home')"
	@click="goTo('home', 'Home')"
	:ripple="false"
	>
		<span class="pt-1">Home</span>
		<v-img :src="$PRXConfig().staticUrl('icons/home.svg')" class="mx-auto" width="25px" max-height="25px" contain></v-img>
	</v-btn>
	
	<v-btn
	value="product"
	:input-value="$PRXRouter().isOnRoute('product') || $PRXRouter().isOnRoute('product-parents')"
	@click="goTo('product', 'Products')"
	:ripple="false"
	>
		<span class="pt-1">Product</span>
		<v-img :src="$PRXConfig().staticUrl('icons/product.svg')" class="mx-auto" width="25px" max-height="25px" contain></v-img>
	</v-btn>
	
	<v-btn
	value="notification"
	:input-value="$PRXRouter().isOnRoute('notification') || $PRXRouter().isOnRoute('notificationView')"
	@click="goTo('notification', 'Notification')"
	:ripple="false"
	>
		<span class="pt-1">Notification</span>
		<v-img :src="$PRXConfig().staticUrl('icons/notifications.svg')" class="mx-auto" width="25px" max-height="25px" contain></v-img>
		<div 
		v-if="notificationCount"
		class="header__cartCon bottom">
			<small class="type-darkerGray">{{ notificationCount }}</small>      
		</div>
	</v-btn>

	<v-btn
	value="reward"
	:input-value="$PRXRouter().isOnRoute('reward')"
	@click="goTo('reward', 'Reward')"
	:ripple="false"
	>
		<span class="pt-1">Reward</span>
		<v-img :src="$PRXConfig().staticUrl('icons/rewards.svg')" class="mx-auto" width="25px" max-height="25px" contain></v-img>
	</v-btn>

	<v-btn
	value="news"
	:input-value="$PRXRouter().isOnRoute('news')"
	@click="goTo('news', 'News')"
	:ripple="false"
	>
		<span class="pt-1">News</span>
		<v-img :src="$PRXConfig().staticUrl('icons/modules.svg')" class="mx-auto" width="25px" max-height="25px" contain></v-img>
	</v-btn>

</v-bottom-navigation>
</template>

<script type="text/javascript">
export default {
	data () {
		return {
			bottomNav: true
		}
	},

	computed: {
		notificationCount() {
			return this.$store.state.api.notification_count;
		},

		showBottomNav() {

			let currRoute = this.$route.name;
			switch(currRoute) {
				case 'login':
				case 'forgetPassword':
				case 'signup':
				case 'cartSummary':
				case 'cartCheckout':
				case 'cartCheckoutShipping':
				case 'cartPayment':
				case 'cartCheckoutSummary':
					return false;
				break;

				default:
					return true;
				break;
			}
		}

	},

	methods: {
		goTo(route, pageName) {
			this.$PRXRouter().goTo(route);
			this.$store.commit('pageName/set', pageName);
		}
	}
}
</script>
