<template>
	<!-- Filter View -->
    <v-navigation-drawer
    v-model="acceptcallView"
    fixed
    left
    class="chat__pageCon chat__details acceptCall__Holder"
    width="100%"
    touchless
    >
        <v-card class="chat__headerCon frm-elevation" style="z-index: 10;">
            <v-toolbar class="py-2" style=" height: auto;">
                <v-img :src="$PRXConfig().staticUrl('icons/video.svg')" class="chat--icon" max-width="40px" max-height="40px" width="40px" height="60px"></v-img>
                <vs-switch v-model="withVideo" class="video--switch">
                  <template #off>
                      <v-icon>{{ 'fa-video-slash' }}</v-icon>
                  </template>
                  <template #on>
                      <v-icon>{{ 'fa-video' }}</v-icon>                                                                              
                  </template>
                </vs-switch>

                <!-- <v-switch class="video--switch mb-0" label=""></v-switch> -->
            </v-toolbar>
        </v-card>
		<div class="chat__timeHolder text-center bg-doc-primary3 py-1">
		    <p class="mb-0 font-size-small color-white">00:{{ minutes | format }}:{{ seconds | format }}</p>
        </div>
          <v-layout row wrap mx-auto>
            <v-flex xs12 class="videoHolder">
  	  			<loading :active="!hasSubscriber" loader="dots" color="#fff" :is-full-page="false"  zIndex="9" background-color="#000"></loading>
  	        	<div id="publisherAppend" >
	      	  		<div id="subscriber" style="width: 100%; height: 100%; background-color: white"></div>
   	        	</div>
            </v-flex>
            <v-flex xs12 class="videoHolder">
  	        	<div id="publisherAppend" >
	      	  		<div id="publisher" style="width: 100%; height: 100%; background-color: black"></div>
  	        	</div>
            </v-flex>
          </v-layout>

          <v-layout row wrap mx-auto class="px-5 call__buttonHolder pb-8">
          	
          	<v-snackbar
          	    v-model="snackbar"
          	    timeout="25000"
          	    color="warning">

          	    You have 5 minutes left for this consultation.

          	    <template v-slot:action="{ attrs }">
          	        <v-btn
          	          	text
          	          	v-bind="attrs"
          	          	@click="snackbar = false"
          	        >
          	          	Okay
          	        </v-btn>
          	    </template>
          	</v-snackbar>
            <v-col 
              cols="6" class="pa-0 text-center patienCard--buttonHolder">
                  <v-btn class="mr-5 ml-auto my-2 patientCard--button" small fab :style="[ withVoice ? {'background': 'gray' } : {'background': 'red' } ]" @click="turnOffVoice()">
                      <v-icon>{{ 'fa-microphone' }}</v-icon>
                  </v-btn>
              </v-col>
              <v-col 
              cols="6" class="pa-0 text-center patienCard--buttonHolder">
                  <v-btn class="ml-5 mr-auto my-2 patientCard--button" small fab color="red"  @click="end">
                      <v-icon>{{ 'fa-phone' }}</v-icon>
                  </v-btn>
              </v-col>
          </v-layout>
        <!-- </div> -->

    </v-navigation-drawer>

</template>
<script type="text/javascript">
	import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';

	export default {
		components: {
			Loading,
		},
		data() {
			return {
				acceptcallView: true,
				show: false,
				route: String,
				sessionID: null,
				token: null,
				key: null,
				withVoice: true,
				withVideo: true,
				subscriber: null,
				publisher: null,
				session: null,
				hasSubscriber: false,
				timer: null,

                minutes: 0,
                seconds: 0,

                doctor: {},
                consultation: {},

                snackbar: false

			}
		},

		watch: {
			withVideo(val) {
		    	var publisher = this.publisher;
		    	publisher.publishVideo(val);
			},
		},

		mounted() {
		    this.deviceIsReady();
            this.backgroundProcessor();
            this.lockPortrait();
            this.key = this.$store.state.api.opentok_key;
			document.addEventListener('backbutton', this.onBackbutton.bind(this), false);
			
		},

        beforeRouteLeave (to, from, next) {
            clearInterval(this.timer);
            next()
        },

		methods: {
		  	deviceIsReady: function() {
			  	var data = {};

			  	var sessionID = null;
			  	var token = null;
			  	
			  	axios.post(this.routes['api.care.video-call-session.show'], data)
			  		.then(response => {
			  			this.sessionID = response.data.session;
			  			this.token = response.data.token;
				  		this.doctor = response.data.doctor;
				  		this.consultation = response.data.consultation;
				  		this.startTimer();
			  			
  						document.addEventListener('deviceready', this.runVideoCall.bind(this), false);
			  		}).catch(errors => {
			  			console.log(errors);
			  		})		    
		  	},

		  	runVideoCall() {
		  		// Initialize Session Object
		  		this.session = OT.initSession(this.key, this.sessionID);
		  		var session = this.session;
		  		var $this = this;
		  		
		  		// initialize a publisher
		  		var options = {
		  		  	insertMode: 'append',
		  		  	width: 400,
		  		  	height: 227,
		  		  	style: {buttonDisplayMode: 'on'}
		  		};
		  		
		  		this.publisher = OT.initPublisher('publisher', options);
		  		var publisher = this.publisher;

		  		session.on({
		  		  	streamCreated: function(event) {
		  		  		$this.hasSubscriber = true;
		  		    	$this.subscriber = session.subscribe(event.stream, 'subscriber', options);
		  		  	},
		  		  	streamDestroyed: function(event) {
		  		    	$this.end();
		  		  	},
		  		  	sessionConnected: function(event) {
		  		    	session.publish(publisher);
		  		    	setTimeout(() => {
		  		    		if(!$this.hasSubscriber) {
		  		    			$this.end();
		  		    		}
		  		    	}, 5000);
		  		  	},

		  		  	streamPropertyChanged: function(event) {
			  		  	// Setting an image to display in audio-only mode
			  		  	if ($this.subscriber.stream.hasVideo) {
			  		    	var imgData = $this.subscriber.getImgData();
			  		    	$this.subscriber.setStyle('backgroundImageURI', imgData);
			  		  	} else {
			  		    	$this.subscriber.setStyle('backgroundImageURI',
			  		      		'https://tokbox.com/img/styleguide/tb-colors-cream.png'
			  		    	);
			  		  	}
		  		  	}
		  		});

		  		session.connect(this.token, function(error) {
		  		  if (error) {
		  		    console.log(`There was an error connecting to the session: ${error}`);
		  		  }
		  		});
		  		
		  		this.receivedEvent('deviceready');

		  	},

		    // Update DOM on a Received Event
		    receivedEvent: function(id) {
		        var parentElement = document.getElementById(id);
		    },

		    end() {
		    	var session = this.session;
		    	session.connect(this.token, function(error) {
		    	  	if (error) {
		    	    	console.log('There was an error connecting to the session:', error);
		    	  	}
		    	});
		    	session.disconnect();
        		this.$store.commit('onlineConsultation/setOnCall', false);
		    	this.stopTimer();
	    		this.$PRXRouter().goBack();
		    },

		    turnOffVoice() {
		    	this.withVoice = !this.withVoice;
		    	var publisher = this.publisher;
		    	publisher.publishAudio(this.withVoice);
		    },

		    onBackbutton() {
		    	this.stopTimer();
		    	this.end();
		    },

            startTimer() {
                if(this.consultation.start_time) {
                    this.timer = setInterval(() => {
                        let addedSeconds = this.consultation.type == 1 ? this.consultation.remaining : 3600;
                        let start_time = moment(moment().format('MM/D/YYYY') +' '+ this.consultation.start_time);

                        let end = start_time.add(addedSeconds, 'seconds');
                        let now = moment();
                        let remaining = end.diff(now, 'seconds');

                        if(remaining <= 0) {
                            clearInterval(this.timer);
                            this.end();
                        } 
                        
                        if((remaining / 60) === 5 ) {
                        	this.snackbar = true;
                            // this.$PRX.alert.warning('You have 5 minutes left for this consultation.', 'Reminder:');
                        }

                        this.minutes = parseInt(remaining / 60);
                        this.seconds = remaining % 60;
                        
                    }, 1000);                    
                }

            },

            stopTimer() {
            	clearInterval(this.timer);	
            },

            backgroundProcessor() {
                let $this = this;
                document.addEventListener("pause", function() {
                	$this.withVideo = false;
                }, false);
                
                document.addEventListener("resume", function() {
					$this.withVideo = true;
                }, false);
            },

            lockPortrait() {
				screen.orientation.lock('portrait');
            }

		},
        filters: {
            format(value) {
                if(value < 10) {
                    return '0' + value;
                }
                return value;
            }
        },
	}
</script>
<style type="text/css">
	html, body, .OT_root {
	  background: transparent !important;
	}

	.OT_root video {
	  display: none !important;
	}
</style>
