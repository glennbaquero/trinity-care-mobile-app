<template>
<div>
    <!-- Filter View -->
    <v-navigation-drawer
    v-model="chatView"
    fixed
    left
    class="chat__pageCon"
    width="100%"
    stateless
    >

        <v-card class="chat__headerCon">
            <v-toolbar 
            style="height: auto !important;"
            class="px-5 py-3 justify-space-between">
                <v-btn
                @click="hide()"
                icon dark>
                    <v-icon>fa-chevron-left</v-icon>
                </v-btn>
                <template v-if="doctor">
                    <v-img :src="doctor.full_image" class="mr-7 chat__profileImg" max-width="45px" width="45px" height="45px"></v-img>
                    <v-toolbar-title>Dr. {{ doctorName }}</v-toolbar-title>
                </template>
                <template v-if="canChat && canCall">
                    <v-img 
                    @click="videoCall('video')"
                    :src="$PRXConfig().staticUrl('icons/video.svg')" class="call--icon" max-width="40px" max-height="40px"></v-img>
                    <v-img 
                    @click="videoCall('voice')"
                    :src="$PRXConfig().staticUrl('icons/call.svg')" class="video--icon" max-width="40px" max-height="40px" width="40px" height="60px"></v-img>
                </template>
            </v-toolbar>
        </v-card>

        <template>
            <div class="chat__timeHolder text-center bg-doc-primary3 py-1">
                <i class="mb-0 font-size-small color-white">00:{{ minutes | format }}:{{ seconds | format }}</i>
            </div>
        </template>
        <div class="chat__Body">
        <template v-if="disclaimer">
            <div class="chat__disclaimerHolder py-4 text-center">
                <div 
                @click="hideDisclaimer()"
                >
                    <v-icon 
                    class="close--dialog">fa-times</v-icon>
                </div>
                <div class="chat__disclaimerContent">
                    <h5 class="color-white disclaimer--title">Disclaimer</h5>
                    <small class="font-weight-normal font-size-small type-white">This facility does not guarantee accurate diagnosis. Physical Interaction and hospital appointment with a doctor are still advised especially with critical and severe conditions</small>
                </div>
            </div>
        </template>

        <template v-if="canChat">
            <v-layout row wrap mx-auto>
                <v-flex xs12 class="py-6 px-5" @click="personalInfo = true">
                    <v-card class="pa-5 chat__cardHolder cstm-border-radius-5">
                        <v-layout row wrap mx-auto>
                            <v-flex xs9 class="align-self-center">
                                <small class="font-style-italic font-size-small mb-0">Share height, weight, and other conditions</small>  
                            </v-flex>
                            <v-flex xs3 class="align-self-center text-right">
                                <v-btn
                                :disabled="!enable"
                                class="button cstm-button-radius text-small elevation-0 px-3"
                                color="transparent"
                                @click="openPersonalInfo()"
                                >
                                    <v-img :src="$PRXConfig().staticUrl('icons/send.svg')" max-width="20" width="20" height="20" contain></v-img>
                                </v-btn>
                            </v-flex>                
                        </v-layout>
                    </v-card>
                </v-flex>

            <PersonalInformationDialog 
            ref="personalSharing"
            @hide=""
            ></PersonalInformationDialog>
            </v-layout>
        </template>


    <v-layout row wrap mx-auto class="chat__convoHolder" v-if="canChat"
    :style="[disclaimer ? {height: '42vh'} : {height: '56vh'}]"
    >
        <template v-if="!conversation.length">
            <v-layout row wrap mx-auto>
                <v-flex xs12 text-center>
                    <p class="font-weight-bold mb-0 type-gray">Start your conversation with Dr. {{  doctor ? doctor.fullname: '' }}</p>
                </v-flex>
            </v-layout>        
        </template>

        <template v-for="(chat, index) in conversation">
            
            <template v-if="chat.receiver">
                <!-- Receiver -->
                <template v-if="chat.message != 'null' && !chat.file">
                    <v-flex 
                    :id="'bubble' + index"
                    xs12 class="px-5 py-2">
                        <v-layout row wrap mx-auto>
                            <v-flex xs2 align-self-end>
                                <v-img :src="chat.sender_image" class="mr-7 chat__profileImg" max-width="45px" width="45px" height="45px"></v-img>
                            </v-flex>
                            <v-flex xs10>
                                <div class="receiver__contentHolder py-3">
                                    <div class="receiver__content">
                                        <span class="font-size-small" v-html="chat.message"></span>
                                        <v-flex text-right>
                                            <small class="font-weight-normal"><i>{{ chat.readable_date }}</i></small>
                                        </v-flex>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </template>

                <template v-if="chat.message == 'null' && chat.file">
                    <v-flex 
                    :id="'bubble' + index"
                    xs12 class="px-5 py-2">
                        <v-layout row wrap mx-auto>
                            <v-flex xs2>
                                <v-img :src="chat.sender_image" class="mr-7 chat__profileImg" max-width="45px" width="45px" height="45px"></v-img>
                            </v-flex>
                            <v-flex xs10>
                                <div class="receiver__contentHolder py-3">
                                    <div class="receiver__content">
                                        <v-img 
                                        @click="previewImage(chat.file)"
                                        :src="chat.file" class="" max-width="100%" width="100%" height="auto"></v-img>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </template>
            </template>

            <template v-if="chat.sender">
                <!-- Sender -->
                <template v-if="chat.message != 'null' && !chat.file">
                    <v-flex 
                    :id="'bubble' + index"
                    xs12 class="px-5 py-2">
                        <v-layout row wrap mx-auto>
                           <v-flex xs2>

                            </v-flex>
                            <v-flex xs10>
                                <div class="sender__contentHolder py-3">
                                    <div class="sender__content">
                                        <span class="font-size-small" v-html="chat.message"></span>
                                        <v-flex text-right>
                                            <small class="font-weight-normal"><i>{{ chat.readable_date }}</i></small>
                                        </v-flex>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </template>
                
                <template 
                v-if="chat.message == 'null' && chat.file">
                    <v-flex 
                    :id="'bubble' + index"
                    xs12 class="px-5 py-2">
                        <v-layout row wrap mx-auto>
                            <v-flex xs2>

                            </v-flex>
                            <v-flex xs10>
                                <div class="sender__contentHolder py-3">
                                    <div class="sender__content">
                                        <v-img 
                                        @click="previewImage(chat.file)"
                                        :src="chat.file" class="" max-width="100%" width="100%" height="auto"></v-img>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </template>

            </template> 

        </template>

        <template v-for="chat in filteredToSend">
            <v-flex 
            xs12 class="pa-5">
                <v-layout row wrap mx-auto>
                   <v-flex xs2>

                    </v-flex>
                    <v-flex xs10>
                        <div class="sender__contentHolder py-3">
                            <div class="sender__content">
                                <span class="font-size-small" v-html="chat.message"></span>
                                <v-flex text-right>
                                    <span class="font-size-small font-weight-normal"><i>Sending...</i></span>
                                </v-flex>
                            </div>
                        </div>
                    </v-flex>
                </v-layout>
            </v-flex>
        </template>
    </v-layout>
    </div>


    <!-- Prescription Button -->
    <template v-if="hasMedicalPrescription || consultationStatus == 'Completed'">
        <v-btn
        style="z-index: 10"
        class="button cstm-button-radius type-green font-weight-bold mx-auto text-small prescription__button"
        @click="openPrescriptionPage()"
        >
        View Prescription
        </v-btn>
    </template>
    <template v-if="!canChat">
        <div class="chat__textHolder">
            <div class="chat__pageCon chat__details">
                <div class="chat__detailsFooter py-3">
                  <div class="chat__detailsInner text-center">
                    <span class="font-size-small type-white">This consultation has ended. You can't reply to this conversation. This is already an archived message.</span>
                  </div>
                </div>
            </div>
        </div>

    </template>
    <template v-if="canChat">
        <div class="chat__textHolder">
            <div class="chat__textInner">
                <div class="chat__border">
                    <v-text-field
                    v-model="post.message"
                    label="Type a message"
                    class="text__input mb-0"
                    solo
                    :disabled="!enable"
                    ></v-text-field>

                    <template v-if="!post.message">
                        <div 
                        @click="openFileViewer()"
                        class="image--uploadHolder">
                            <input 
                            @change="uploadImage"
                            ref="file"
                            accept="image/*" 
                            type="file" hidden>
                            <v-icon class="">{{ 'insert_photo' }}</v-icon>  
                        </div>
                    </template>
                </div>

                <div class="send__holder" @click="send">
                    <v-icon class="">{{ 'fa-paper-plane' }}</v-icon>
                </div>
            </div>
        </div>
    </template>

    <Loader
        ref="chatLoader"
    ></Loader>

    <ConsultationEndedDialog ref="consultation-ended"></ConsultationEndedDialog>

    </v-navigation-drawer>

    <PrescriptionPage 
    :consultation-status="consultationStatus"
    ref="prescription"></PrescriptionPage>
</div>
</template>

<script>
import PersonalInformationDialog from './modals/PersonalInformationDialog.vue';
import ConsultationEndedDialog from './modals/ConsultationEndedDialog.vue';
import PrescriptionPage from './PrescriptionPage.vue';
import { bus } from '@/assets/js/EventBus.js';
import Loader from '@/components/Loader';

export default {

    components: {
        PersonalInformationDialog,
        PrescriptionPage,
        ConsultationEndedDialog,
        Loader,
    },

    computed: {
        canChat() {
            if(this.consultationStatus == 'Completed' || this.consultationStatus == 'Disapproved' ||  this.consultationStatus == 'Refunded' || this.consultationStatus == 'Cancelled') {
                return false;
            } 
            return true;
        },

        canCall() {
            if(this.consultationStatus == 'Approved') {
                return true;
            } 
        },

        doctorName() {
            if(this.doctor) {
                let name = this.doctor.fullname;
                if(name.length > 10) {
                    name = name.substring(0, 10) + '...';
                }
                return name;
            }
        },

        filteredToSend() {
            let messages = this.toSend;

            messages = messages.filter((message) => {
                return message.status == 0;
            });
            return messages;
        },
    },

    watch: {
        consultationStatus() {
            if(this.consultationStatus == 'Completed') {
                bus.$emit('review');
                this.openPrescriptionPage();
                clearInterval(this.timer);
            }
        }
    },  

    data () {
        return {

            enable: true,
            consultation: {},
            doctor: null,
            conversation: [],
            post: {
                message: null, 
                file: null
            },

            minutes: 0,
            seconds: 0,
            

            disclaimer: true,

            chatView: true,
            personalInfoDialog: false,
            consultationSummaryView: false,

            consultationStatus: "Completed",
            timer: null,
            hasMedicalPrescription: false,

            message: "Sending message",

            backgroundMode: null,

            toSend: []         
        }
    },

    mounted() {
        this.consultation = this.$store.state.onlineConsultation.consultation;
        this.doctor = this.$store.state.onlineConsultation.consultation.doctor;
        this.show();
        if(this.consultationStatus == 'Approved') {
            this.sendNotification();
        }
        this.eventHandler();
        this.backgroundProcessor();
    },

    beforeRouteLeave (to, from, next) {
        clearInterval(this.timer);
        next()
    },

    methods: {

        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        /**
         * Fetch messages
         * 
         */
        fetchMessages()  {


            return new Promise((resolve, reject) => {
                let data = {
                    consultation_id : this.consultation.id,
                };                
                axios.post(this.routes['api.care.consultation-chats.fetch'], data)
                    .then((response) => {
                        this.conversation = response.data.conversation;
                        this.consultationStatus = response.data.consultationStatus;
                        this.consultation.start_time = response.data.consultation.start_time;
                        this.consultation.remaining = response.data.consultation.remaining;                            
                        this.hasMedicalPrescription = response.data.medicalPrescription;
                        if(this.consultationStatus == 'Completed') {
                            this.stopTimer();
                        }
                        if(this.conversation.length && this.canChat) {
                            setTimeout(() => {
                                document.getElementById("bubble" + (this.conversation.length - 1)).scrollIntoView();
                            }, 100)
                        }
                        resolve(response);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },

        postData() {
            let data = new FormData();            
            data.append('file', this.post.file);
            data.append('message', this.post.message);                
            data.append('receiver_id', this.doctor.id);
            data.append('consultation_id', this.consultation.id);
            
            this.post.file = null;
            this.post.message = null;
            
            return data;
        },

        /**
         * Store message
         * 
         */
        send() {
            
            if(!this.enable) {
                return;
            }

            if(!this.post.message && !this.post.file) {
                return;
            }


            this.toSend.push({'message': this.post.message, 'status': 0 });
            let key = this.toSend.length - 1;

            return new Promise((resolve, reject) => {

                // this.$refs['chatLoader'].show();
                axios.post(this.routes['api.care.consultation-chats.store'], this.postData())
                    .then((response) => {
                        this.toSend[key].status = 1;
                        this.fetchMessages();

                        resolve(response)
                        this.$refs['chatLoader'].hide();                                                
                    }).catch((err) => {
                        reject(err)
                        this.$refs['chatLoader'].hide();                            
                    });
            });

        },


        /**
         * Share user personal information
         * 
         */
        openPersonalInfo() {
            this.$refs['chatLoader'].show();

            let data = {
                consultation_id: this.consultation.id,
                receiver_id: this.doctor.id
            };

            axios.post(this.routes['api.care.personal-informations.share'], data)
                .then((response) => {
                    this.$refs['chatLoader'].hide();        
                    this.fetchMessages();
                    if(!response.data.exists) {
                        this.$refs['personalSharing'].show();
                    }
                }).catch((err) => {
                    this.$refs['chatLoader'].hide();
                });
        },

        /**
         * Open file picker
         * 
         */
        openFileViewer() {
            if(!this.enable) {
                return;
            }                
            this.$refs['file'].click();
        },

        /**
         * Upload image
         * 
         * @param  e
         */
        uploadImage(e) {

            let files = e.target.files || e.dataTransfer.files;
            if(!files.length) {
                return;
            }
            this.post.file = files[0];

            this.send();
        },


        /**
         * Start timer
         * 
         */
        startTimer() {
            if(this.consultation.start_time && this.consultationStatus == 'Approved') { 
                if(!this.timer) {
                    this.timer = setInterval(() => {
                        let addedSeconds = this.consultation.type == 1 ? this.consultation.remaining : 3600;
                        let start_time = moment(moment().format('MM/D/YYYY') +' '+ this.consultation.start_time);
                        let end = start_time.add(addedSeconds, 'seconds');
                        let now = moment();
                        let remaining = end.diff(now, 'seconds');

                        if((remaining / 60) === 5) {
                            this.$alert.show('Reminder:','You have 5 minutes left for this consultation.');
                        }

                        if(remaining <= 0) {
                            this.minutes = 0;
                            this.seconds = 0;
                            this.disableChatPage();
                            return;
                        }

                        if(remaining >= 3600) {
                            this.consultationStatus = 'Completed';
                            clearInterval(this.timer);
                            return;                            
                        }

                        this.minutes = parseInt(remaining / 60);
                        this.seconds = remaining % 60;
                    }, 1000);

                }
                
            }

        },

        /**
         * Disable chat feature
         * 
         */
        disableChatPage() {           
            this.stopTimer();
            this.$refs['consultation-ended'].show(this.doctor.fullname);
            this.consultationStatus = 'Completed';
            this.consultationCompleted();
        },

        /**
         * Set consultation to completed
         * 
         */
        consultationCompleted() {

            // this.$refs['chatLoader'].show();
            this.message = "Please wait";
            let data = {
                consultation_id: this.consultation.id,
                remaining: (this.minutes * 60) + this.seconds,                    
            };

            axios.post(this.routes['api.care.consultations.completed'], data)
                .then((response) => {
                    this.$refs['chatLoader'].hide();
                    this.$refs['consultation-ended'].show(this.doctor.fullname);
                    this.enable = false;
                    this.stopTimer();
                }).catch((err) => {
                    this.$refs['chatLoader'].hide();
                });
        },

        show() {
            this.fetchMessages()
                .then((response) => {
                    this.startTimer();
                });
        },

        /**
        * Send notification to doctor once the user enters the chat page
        * 
        */
        sendNotification() {
            let data = {
                consultation_id: this.consultation.id,
                isUser: 1,
            };
            axios.post(this.routes['api.care.consultations.send.notification'], data)
                .then((response) => {

                }).catch((err) => {

                });    
        },

        hide() {
            this.stopTimer();    
            this.$PRXRouter().goBack();
        },

        hideDisclaimer() {
            this.disclaimer = false;
        },

        openPrescriptionPage() {
            this.$refs['prescription'].show(this.consultation, this.doctor);
        },

        videoCall(type) {
            this.$store.commit('viewDoctors/setSelected', this.doctor);
            this.stopTimer();
            this.$router.push({ name: 'video-call-dispatcher', params : { type: type } });
        },

        previewImage(image) {
            PhotoViewer.show(image);
        },

        stopTimer() {
            clearInterval(this.timer);
        },

        backgroundProcessor() {
            let $this = this;
            document.addEventListener("pause", function() {
                $this.backgroundMode = setInterval(() =>  {
                    $this.fetchMessages()
                        .then((response) => {
                            $this.startTimer();
                        });
                }, 1000);               
            }, false);
            
            document.addEventListener("resume", function() {
                clearInterval($this.backgroundMode);
            }, false);
        },


        /*
        |--------------------------------------------------------------------------
        | @Events
        |--------------------------------------------------------------------------
        */
        
        eventHandler() {
            bus.$on('new_notification', () => {
                this.fetchMessages()
                    .then((response) => {
                        this.startTimer();
                    });
            });
            bus.$on('consultation_approved', () => {
                this.fetchMessages()
                    .then((response) => {
                        this.startTimer();
                    });
            });                
        },
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