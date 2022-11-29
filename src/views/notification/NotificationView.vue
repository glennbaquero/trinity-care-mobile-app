<template>
<v-layout row wrap mx-0 align-content-start class="notification__con">
    <v-container pa-5>
        <v-flex xs12 mb-2>
            <v-card class="cstm-border-radius-5 frm-elevation pa-5 py-2">
                <v-list two-line class="cstm-bg-transparent">
                    <v-list-item class="mb-3 backgroundColor--white cstm-border-radius-5 px-0">
                        <v-list-item-avatar class="mt-0">
                            <v-img :src="$PRXConfig().staticUrl('icons/news.svg')" class="mx-auto auth__ordersListImg" width="40px" height="40px"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content class="pr-5 pt-0">
                            <v-list-item-title><h4 class="type-2 mb-2">{{ notification.data['title'] }}</h4></v-list-item-title>
                            <v-list-item-subtitle><small class="type-lighterGray"> {{ parseDate(notification.created_at) }} </small></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-card-text class="pa-0 notification__textCon">
                    <p v-html="notification.data['message']"></p>
                </v-card-text>

                <template v-if="consultation">
                    <v-card-text class="pa-0 notification__textCon text-center">
                        <v-btn
                        @click="openChat()"
                        :disabled="!canChat()"
                        class="button cstm-button-radius type-green font-weight-bold mx-auto"
                        >
                            Chat Now
                        </v-btn>
                    </v-card-text>
                </template>

                <template v-if="referral">
                    <v-card-text class="pa-0 notification__textCon text-center">
                        <v-btn
                        @click="requestClaim()"
                        class="button cstm-button-radius type-green font-weight-bold mx-auto"
                        >
                            Request Claim
                        </v-btn>
                    </v-card-text>
                </template>
            </v-card>
        </v-flex>
    </v-container>
    
    <Loader
    ref="loader"
    ></Loader>

</v-layout>
</template>
<script>
import Loader from '@/components/Loader.vue';
export default {

    components: {
        Loader,
    },

    computed: {
        notification() {
            return this.$store.state.selectedNotification.item;
        },
        referral() {
            return this.notification.data['subject_type'] == "App\\Models\\Referrals\\SuccessReferral";
        }
    },

    data() {
        return {
            consultation: null,
            loading: false,
        }
    },

    mounted() {
        this.$store.commit('setTopNav/set', 'Notification')
        if(this.notification.data['subject_type'] == "App\\Models\\Consultations\\Consultation") {
            this.fetchConsultation();
        }
    },

    methods: {
        parseDate(date) {
            return moment(date).format('MMMM DD, YYYY h:mm a')
        },

        fetchConsultation() {

            this.$refs['loader'].show();
            let data = {
                id: this.notification.data['subject_id']
            };

            this.loading = true;

            axios.post(this.routes['api.care.consultations.fetch-consultation'], data)
            .then((response) => {
                this.$refs['loader'].hide();
                this.consultation = response.data.consultation;
            }).catch((err) => {
                this.$refs['loader'].hide();
            });
        },

        openChat() {
            this.$store.commit('onlineConsultation/setConsultation', this.consultation);                
            this.$PRXRouter().goTo('chats');
        },

        canChat() {
            if(this.consultation) {

                if(this.consultation.status == "Completed") {
                    return true;
                }

                if(this.consultation.schedule_type === 0) {
                    if(this.consultation.end_time) {
                        let end = moment(moment(this.consultation.date).format('MM/D/YYYY') +' '+ this.consultation.start_time),
                        now = moment();
                        let duration = end.diff(now, 'minutes');

                        if(duration <= 0) {
                            return true;
                        } else if (duration > 60) {
                            return false;
                        } else {
                            return true;
                        }
                    } 

                } else {

                    if(this.consultation.remaining) {
                        let now = moment();
                        let start = moment(moment(this.consultation.date).format('MM/D/YYYY') +' '+ this.consultation.start_time);
                        start = start.add('seconds', this.consultation.remaining);
                        let left = start.diff(now, 'minutes');
                        if(left <= 0) {
                            return true;
                        } else if (left > 60) {
                            return false;
                        } else {
                            return true;
                        }           
                    }

                }
            }
        },

        /**
        * Send request claim referral
        * 
        */
        requestClaim() {

            let data = {
                'success_referral_id': this.notification.data['subject_id']
            };

            this.$refs['loader'].show();
            let icon = null;

            axios.post(this.routes['api.care.request-claim-referrals.request'], data)
            .then((response) => {
                this.$refs['loader'].hide();
                if(response.data.status === 1) {
                    icon = this.$PRXConfig().staticUrl('icons/Check.svg');
                }
                this.$alert.show('Request claim referral', response.data.message, icon);
            }).catch((err) => {
                this.$refs['loader'].hide();
            });
        },

    }
}
</script>