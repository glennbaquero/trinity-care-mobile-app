import { bus } from '../../EventBus.js';
export default {
	methods: {
		setupPushNotif() {
			var $this = this;
	        var push = PushNotification.init({
	            android: {
	                senderID: 876723025628,
	                clearBadge: true
	            },
	            ios: {
	                alert: "true",
	                badge: "true",
	                sound: "true",
	                clearBadge: true
	            },
	        });

	        //registration
	        push.on('registration', function(data) {
	            console.log('Registering device token -----');
	            console.log(device.platform)
	            var data = {
	                'token' : data.registrationId,
	                'platform' : device.platform,
	                'deviceable_id' : localStorage.user ? JSON.parse(localStorage.user).id : 0,
	            }
	            axios.post($this.routes['api.store.token'], data).then(response => {
	            	window.localStorage.setItem('pushnotifs/setToken', response.data.token);
	            });
	        });

	        push.on('notification', (data) => {
	        	if(window.localStorage.user) {
		            if(data.title == 'Calling...') {
		            	if(!$this.$store.state.onlineConsultation.onCall) {	            	
			            	var doctor = data.message.split('is calling you.');
			            	cordova.plugins.CordovaCall.setVideo(true);
			            	cordova.plugins.CordovaCall.setIcon('icon');
			            	cordova.plugins.CordovaCall.setAppName(data.message);
			            	cordova.plugins.CordovaCall.receiveCall(doctor[0]);
			            	cordova.plugins.CordovaCall.on('answer', function(e) {
			            		$this.$store.commit('onlineConsultation/setOnCall', true);
				                $this.$PRXRouter().goTo('video-call');
				                setTimeout(() => {
				                	cordova.plugins.CordovaCall.endCall((success) => {
				                		// code 
				                	}, (error) => {
				                		console.log('Error', error)
				                	});
				                }, 2000)  
			            	});

			            	cordova.plugins.CordovaCall.on('reject', function(e) {
		                        $this.callRejected();
		                    });
			            }else {
			            	this.callRejected();
			            }
		            } else if (data.title == 'Consultation Approved') {
	            		let notifData = {
	            			consultation_number: this.getConsultationNumber(data.message),
	            			data: data
	            		};

		            	bus.$emit('consultation_approved', notifData);

		            } else if (data.message == 'Call rejected') {
		            	bus.$emit('call_declined');
		            } else {
	            		bus.$emit('new_notification' , data);
	            		$this.$store.commit('notificationReceive/set', true);
	            		$this.$store.commit('notificationReceive/setMessage', data.message);
	            		$this.$store.commit('notificationReceive/setTitle', data.title);
	            		$this.$store.commit('notificationReceive/setBannerImage', data.sound);
	            	    console.log('notification received ...', data);
		            }
	        	}
	        });

	        push.on('error', function(e) {
	            console.log('Error, ' + e);
	        })
		},

		callRejected() {
			let data = {
				action: 'rejected'
			};
            axios.post(this.routes['api.care.call.manage'], data)
                .then(response => {
                	console.log('Call declined');
                }).catch((err) => {
                	console.log(err);
                });
        },

        /**
         * Get consultation number
         * 
         * @param  message
         */
        getConsultationNumber(message) {
        	let a = message,
        		index;
        	a = a.split(" ");
        	index = a.indexOf("No:");
        	return a[index + 1];
        },

	}
}