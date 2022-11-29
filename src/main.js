import './bootstrap.js'

import Vue from 'vue'
import vuetify from '@/plugins/vuetify'

import App from './App.vue'
import router from './router'
import store from './store'

import PRXVuetifyComponents from '@praxxys/vuetify-components'
import PRXVueUtils from '@praxxys/vue-utils'

import VeeValidate from 'vee-validate';
import InfiniteLoading from 'vue-infinite-loading';
import VueClipboard from 'vue-clipboard2';

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Tawk from 'vue-tawk'

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'; //Vuesax styles
  
// Vue.use(Tawk, {
//     tawkSrc: 'https://embed.tawk.to/5d9157ab6c1dde20ed0415d2/default'
// })

Vue.config.productionTip = false

Vue.use(PRXVuetifyComponents);
Vue.use(PRXVueUtils);

Vue.use(VeeValidate);
Vue.use(InfiniteLoading);

Vue.use(VueClipboard);
 
Vue.use(Chartkick.use(Chart))

Vue.use(Vuesax, {
// options here
});

/** Dialog */
import Alert from '@/components/Alert.vue';
Vue.component("Alert", Alert);

var app = {

	init () {
		if (window.hasOwnProperty('cordova')) {
			document.addEventListener('deviceready', this.on_deviceready.bind(this), false)
			Vue.prototype.$cordova = this
		} else {
			this.setup()
		}
	},

	on_deviceready () {
		this.setup()
	},

	setup () {
        require('./assets/js/mixins/global')

		new Vue({
			vuetify,
			el: '#app',
			render: h => h(App),

			router,
			store,

			mounted () {
				this.init();
			},

			methods: {
				init () {
					this.navigate()
					if(this.isCordova) {
			        	this.setupPushNotif();
					}	
				},

				navigate () {
					if(localStorage.authToken) {
					  this.$store.commit('pageName/set', 'Home');
					  this.$PRXRouter().goTo('home');
					} else {
						this.$PRXRouter().goTo('login');
					}
				}
			}

		})
	},

}

app.init()
