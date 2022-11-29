import Vue from 'vue'

import ConfigMixin from './config.js';
import PushNotification from './notification.js';
import NavigationMixin from './navigation.js';

Vue.mixin({
	mixins: [ ConfigMixin, PushNotification, NavigationMixin ],
});