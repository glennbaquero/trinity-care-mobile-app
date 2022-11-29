import { bus } from '../EventBus.js';

export default {
	mounted() {
		document.addEventListener('offline', this.onOffline.bind(this.$cordova), false);
		document.addEventListener('online', this.onOnline.bind(this.$cordova), false);
	},

	methods: {
		onOnline() {
			setTimeout(() => {
				bus.$emit('network_online');
				bus.$emit('network_changed', navigator.connection.type);
			}, 500);
		},

		onOffline() {
			setTimeout(() => {
				bus.$emit('network_offline');
				bus.$emit('network_changed', navigator.connection.type);
			}, 500);
		},
	},

	computed: {
		isOnline() {
	        return navigator.connection.type !== 'none'; 
		},
	},
}