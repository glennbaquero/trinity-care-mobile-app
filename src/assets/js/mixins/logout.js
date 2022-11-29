export default {
	methods: {
		clearAuthentication() {
			window.localStorage.removeItem('authToken');
			window.axios.defaults.headers.common['Authorization'] = null;
		},

	}
}