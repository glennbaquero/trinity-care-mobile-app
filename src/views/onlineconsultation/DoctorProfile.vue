<template>
    <v-row class="pa-0 pb-12" no-gutters>
        <template v-if="doctor">
            <v-col cols="12" class="pa-0">
                <v-card tile class="frm-card box-shadow--10 text-center py-6 px-8">
                    <div class="Doctor__imgHolder mx-auto">
                        <v-img :lazy-src="doctor.full_image" :src="doctor.full_image" class="mx-auto consultation__drImg" width="100px" height="100px">
                        </v-img>
                        <div :class="renderOnlineStatus(doctor.online, true)" class="online--status">
                        </div>                  
                    </div>
                    <v-card-title class="justify-center"><p class="mb-0 font-size-default font-weight-semibold">Dr. {{ doctor.fullname }}</p></v-card-title>
                    <v-card-subtitle class="font-size-small">{{ doctor.specialization.name }}</v-card-subtitle>

                    <v-card-text>
                        <div class="d-flex align-center justify-center">
                            <v-rating size="18" readonly background-color="#bbb" color="#FABF24" empty-icon="fa fa-star" v-model="doctor.ratings"></v-rating>

                            <h4 class="text-yellow ml-2 mb-0">{{ doctor.ratings ? doctor.ratings : 'No Ratings'  }}</h4>
                        </div>
                    </v-card-text>
                    <div class="frm-btn px-8 mt-4">
                        <v-btn 
                        @click="viewCalendar(doctor.id)"
                        block 
                        rounded
                        dark
                        elevation="elevation-0"
                        min-height="42"
                        class="btn--green">
                        Book Appointment
                        </v-btn>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" class="px-4 py-5">
                <v-card class="frm-card box-shadow--10 border-radius--10 text-center px-2 pt-4">
                    <WeeklyCalendar></WeeklyCalendar>
                    <v-card-text class="text-right mt-4">
                        <small  @click="viewCalendar(doctor.id)" class="font-weight-semibold text-darkgreen">View Schedule</small>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" class="px-4 py-5">
                <v-card class="frm-card box-shadow--10 border-radius--10">
                    <v-list-item two-line>
                        <v-list-item-avatar tile size="28">
                            <v-img
                            contain
                            class="elevation-0"
                            :src="$PRXConfig().staticUrl('icons/graduate.svg')"
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-semibold text--ellipsis">Graduated from</v-list-item-title>
                            <v-list-item-subtitle class="font-size-small text--ellipsis">{{ hasData(doctor.alma_mater) }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line>
                        <v-list-item-avatar tile size="28">
                            <v-img
                            contain
                            class="elevation-0"
                            :src="$PRXConfig().staticUrl('icons/hospital.svg')"
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-semibold text--ellipsis">Places of practice</v-list-item-title>
                            <v-list-item-subtitle class="font-size-small text--ellipsis">{{ hasData(doctor.place_of_practice) }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line>
                        <v-list-item-avatar tile size="28">
                            <v-img
                            contain
                            class="elevation-0"
                            :src="$PRXConfig().staticUrl('icons/id.svg')"
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-semibold text--ellipsis">License No.</v-list-item-title>
                            <v-list-item-subtitle class="font-size-small text--ellipsis">{{ hasData(doctor.license_number) }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>                
                </v-card>
            </v-col>

            <v-col cols="12" class="px-4 py-5 mb-5">
                <template v-if="reviews.length">
                    <p class="font-weight-semibold mb-2">Reviews <small v-if="total_reviews" >({{ total_reviews }})</small></p>
                    <v-card class="frm-card box-shadow--10 border-radius--10 pb-6 mb-2">
                        <div class="review-cntnr" v-for="review in reviews">
                            <v-list-item two-line >
                                <v-list-item-avatar size="50">
                                    <v-img
                                    class="elevation-0"
                                    :lazy-src="review.reviewer_image"
                                    :src="review.reviewer_image"
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-semibold text--ellipsis">{{ review.reviewer }}</v-list-item-title>
                                    <v-list-item-subtitle class="font-size-small text--ellipsis">{{ review.created_at }}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action class="justify-end">
                                    <v-rating v-model="review.ratings" x-small dense readonly background-color="#bbb" color="#FABF24" empty-icon="fa fa-star"></v-rating>
                                </v-list-item-action>
                            </v-list-item>
                            <template v-if="review.description">
                                <v-card-text class="pb-0">{{ review.description }}</v-card-text>
                            </template>
                            <template v-else >
                                <v-card-text class="pb-0 text-center"><small>no description available</small></v-card-text>
                            </template>      
                        </div>
                    </v-card>  
                    <div v-if="total_reviews >= 3"class="frm-btn col-12 pa-0 text-center">
                        <v-btn 
                            :disabled="reviews_count > total_reviews" 
                            @click="fetchReviews();" 
                            rounded 
                            max-height="25" 
                            elevation="elevation-0" 
                            class="mt-4 text-dark">
                            {{ reviews_count > total_reviews ? 'No more' : 'Show more'}}
                        </v-btn>
                    </div>
                </template>
            
                <template v-if="!reviews.length">
                    <v-flex xs12 text-center>
                        <p class="general__text color-gray"><b>No patient review available</b></p>
                    </v-flex>
                </template>
            </v-col>    
            
            <div class="frm-btn frm-btn--fixed pa-4">
                <div class="d-flex align-center">
                    <div class="col-7 left pa-0">
                        <p class="mb-0">Consultation Credits</p>
                        <p class="mb-0 text-darkgreen font-weight-semibold">{{ doctor.consultation_fee }} credit(s)</p>
                    </div>
                    <div class="frm-btn col-5 pa-0 pl-2">
                        <v-btn
                        v-if="canBook(doctor.consultation_fee)"
                        dark
                        block
                        rounded
                        min-height="42"
                        elevation="elevation-0"
                        :disabled="!doctor.online == 2 || doctor.online == 3  ? true : false"
                        @click="confirmChatRequest(doctor)"
                        class="btn--green"
                        >
                        Chat Now
                        </v-btn>
                        <v-btn
                            v-else
                            text depressed
                            min-height="30"
                            class="button cstm-button-radius type-green font-weight-bold mx-auto"
                            @click="ewalletShow()"
                        >
                        Top-up credits
                        </v-btn>
                    </div>
                </div>
            </div>
        </template>

        <Ewallet
        ref="ewallet"
        ></Ewallet>

        <CreditsDeductionDialog 
        @openChat="openChat"
        ref="confirmation">
        </CreditsDeductionDialog>

        <Loader
        ref="loader"
        ></Loader>
    </v-row>
</template>

<script>
import WeeklyCalendar from './WeeklyCalendar.vue';
import Ewallet from '@/views/ewallet/Ewallet.vue';
import Loader from '@/components/Loader';
import CreditsDeductionDialog from './modals/CreditsDeductionDialog.vue';
import EmptyFrame from '@/components/substitute/EmptyFrame';
import ConsultationMixin from '@/assets/js/mixins/consultations/consultations.js';

export default {
    components: {
        WeeklyCalendar,
        Ewallet,
        Loader,
        CreditsDeductionDialog,
        EmptyFrame
    },

    computed: {
        doctor() {
            if(this.$store.state.viewDoctors.selected) {
                return this.$store.state.viewDoctors.selected;
            }
            return {};
        }
    },

    data () {
        return {
            profile: true,
            reviews_count : 0,
            reviews: [],
            total_reviews : null,
        }
    },

    mounted() {
        this.init();
    },

    mixins: [
        ConsultationMixin
    ],

    methods: {

        /*
        |--------------------------------------------------------------------------
        | @Initiliaze
        |--------------------------------------------------------------------------
        */

        init() {
            this.fetchReviews();
        },

        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        /**
         * Fetch doctor reviews
         * 
         */
        fetchReviews() {

            let data = {
                doctor_id: this.doctor.id,
                reviews_count: this.reviews_count,
            };

            axios.post(this.routes['api.care.doctor-reviews.get-reviews'], data)
                .then((response) => {
                    this.reviews.push(...response.data.results.reviews);
                    this.total_reviews = response.data.results.count;
                    this.reviews_count += 3;
                }).catch((err) => {
                    console.log(err);

            }); 
        },

        /*
        |--------------------------------------------------------------------------
        | @Renders
        |--------------------------------------------------------------------------
        */

        /*
        * Render online status of a doctor
        */
        renderOnlineStatus(status ,isClass) {
            if(status == 1) {
                if(isClass) {
                    return 'online--status online';
                }
                return 'Online';
            } else if (status == 2) {
                if(isClass) {
                    return 'online--status busy';
                }
                return 'Busy';
            } else {
                if(isClass) {
                    return 'online--status offline';
                }
                return 'Offline';
            }
            return;
        },

        /*
        |--------------------------------------------------------------------------
        | @Checkers
        |--------------------------------------------------------------------------
        */

        /**
         * Check if user can book
         * 
         * @param  int fee
         */
        hasData(text) {
            if(text) {
              return text;       
            }
            return 'The information is not available'
        },

    }
}
</script>