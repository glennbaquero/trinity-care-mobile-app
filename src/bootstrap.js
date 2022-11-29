// import '@fortawesome/fontawesome-free/css/all.css';

window.moment = require('moment')
// window.QRScanner = require('QRScanner');

var FastClick = require('fastclick');
FastClick.attach(document.body);

window.$ = window.jQuery = require('jquery')
window._ = window._ = require('lodash')
window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['App-Key'] = process.env.VUE_APP_API_KEY
window.axios.defaults.baseURL = process.env.VUE_APP_API_URL;

if(localStorage.authToken) {
	window.axios.defaults.headers.common['Authorization'] = localStorage.authToken;
}

require('./assets/scss/app.scss')
