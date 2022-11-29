<template>
    <div>
        <v-layout 
        v-if="consultation.doctor"
        row wrap mx-auto class="pa-5 consultation__information">
            <v-flex xs12>
                <v-card class="pt-4 px-5 pb-6 cstm-border-radius-10">
                  <v-layout no-gutters row wrap>
                    <v-flex xs12 class="mb-4">
                        <h3>Consultation Information</h3>
                    </v-flex>
                    <v-flex xs6 class="mb-2">
                        <h5>Doctor</h5>
                    </v-flex>
                    <v-flex xs6 class="mb-2">
                        <p class="mb-0 color-darkerGray">Dr. {{ consultation.doctor.fullname }}</p>
                    </v-flex>
                    <v-flex xs6 class="mb-2">
                        <h5>Specialization</h5>
                    </v-flex>
                    <v-flex xs6 class="mb-2">
                        <p class="mb-0 color-darkerGray">{{ consultation.doctor.specialization_name }}</p>
                    </v-flex>
                    <v-flex xs6 class="mb-2">
                        <h5>Date</h5>
                    </v-flex>
                    <v-flex xs6 class="mb-2">
                        <p class="mb-0 color-darkerGray">{{ consultation.date | format_date }}</p>
                    </v-flex>
                    <v-flex xs6 class="mb-2">
                        <h5>Time</h5>
                    </v-flex>
                    <v-flex xs6 class="mb-2">
                        <p class="mb-0 color-darkerGray">{{ consultation.start_time }} - {{ consultation.end_time }}</p>
                    </v-flex>
                    <v-flex xs6 class="mb-2">
                        <h5>Consultation Fee</h5>
                    </v-flex>
                    <v-flex xs6 class="mb-2">
                        <p class="mb-0 color-darkerGray">{{ consultation.fee }} credits</p>
                    </v-flex>
                  </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap mx-auto class="px-5 py-8">
            <v-flex xs12 class="mb-5">
                <h3>Medical Recommendation</h3>
            </v-flex>

            <template v-for="med in meds">

                <template v-if="med.product_id">
                    <v-flex xs12 class="mb-3">
                        <h5 class="type-black color-doc-primary1">Available in Trinity Health Pharmacy</h5>
                    </v-flex>
                </template>

                <!-- presction result table -->
                <v-flex xs12 @click="viewDetails(med)">
                    <v-layout row wrap mx-auto>
                        <v-flex xs6 class="mb-4">
                            <p class="mb-0 font-weight-bold type-black">Medicine Name</p>
                        </v-flex>
                        <v-flex xs6 class="mb-4">
                            <p class="mb-0">{{ med.name }}</p>
                        </v-flex>
                        <v-flex xs6 class="mb-4">
                            <p class="mb-0 font-weight-bold type-black">Dosage</p>
                        </v-flex>
                        <v-flex xs6 class="mb-4">
                            <p class="mb-0">{{ med.dosage }}</p>
                        </v-flex>
                        <v-flex xs6 class="mb-4">
                            <p class="mb-0 font-weight-bold type-black">Duration</p>
                        </v-flex>
                        <v-flex xs6 class="mb-4">
                            <p class="mb-0">{{ med.duration }}</p>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap mx-auto class="mt-3">
                        <v-flex xs8>
                            <h5 class="font-weight-normal color-blue mb-0 font-italic">Note: {{ med.notes }}</h5>
                        </v-flex>
                        <v-flex xs4 class="text-right">
                            <a href="#"><h5 class="color-doc-primary2 font-weight-bold">Details</h5></a>
                        </v-flex>
                        <v-flex xs12 class="mt-8 mb-8">
                            <v-divider></v-divider>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </template>

            <template v-if="!meds.length">
                <v-flex xs12 text-center>
                    <p class="type-black font-weight-normal mb-0">No medicines</p>
                </v-flex>
            </template>

            <PrescriptionPopup 
            :med="selectedMed"
            ref="view-details"
            ></PrescriptionPopup>

        </v-layout>

        <v-layout row wrap mx-auto px-5>
            <v-flex xs12>
                <h5 class="font-weight-bold mb-2">Additional Notes</h5>
                <h5 class="font-weight-normal mb-0">{{ prescription.notes ? prescription.notes : 'N/A'}}</h5>
            </v-flex>
            <v-flex xs12>
                <p class="font-weight-bold type-black">Next Action</p>
                <p class="font-weight-normal mb-0">{{ prescription.next_action ? prescription.next_action : 'N/A'}}</p>
            </v-flex>
            <v-flex xs12>
                <p class="font-weight-bold type-black">Date of validity</p>
                <p class="font-weight-normal mb-0">{{ prescription.date_validity | format_date }}</p>
            </v-flex>
        </v-layout> 

        <Loader
        ref="loader"
        ></Loader>
        
        <v-dialog 
        v-model="review" 
        persistent
        width="300">
            <v-card class="frm-dialog br-10 px-4 py-12 text-center">
                <div class="frm-dialog__close-btn"
                @click="review = false"><i class="fa fa-times"></i></div>
                <v-card-text class="clr--black regular text-center">
                    <p class="mb-0">How would you rate</p>
                    <p class="mb-0 type-black font-weight-semibold">Dr. {{ consultation.doctor ? consultation.doctor.fullname : '' }}?</p>
                </v-card-text>
                <div class="text-center">
                    <v-rating 
                    :disabled="loading"
                    size="18" background-color="#bbb" color="#FABF24" empty-icon="fa fa-star" v-model="postReview.ratings"></v-rating>
                </div>
                <div class="px-7">
                    <div class="form__input--text my-2 text-center">
                        <v-text-field
                        :disabled="loading"
                        v-model="postReview.description"
                        type="text"
                        color="#FABF24"
                        placeholder="Write a review"
                        class="text-center"
                        ></v-text-field>
                    </div>
                </div>
                <div class="px-12">
                    <div class="frm-btn mt-2">
                        <v-btn
                        :disabled="!loading && postReview.ratings == 0"
                        class="type-doc-2 px-4"
                        @click="submit()"
                        rounded
                        block
                        elevation="elevation-0"
                        min-height="42"
                        >Send</v-btn>
                    </div>              
                </div>
            </v-card>
        </v-dialog>
    </div> 
</template>

<script>

import { bus } from '@/assets/js/EventBus.js';    
import PrescriptionPopup from './modals/PrescriptionPopup.vue';
import Loader from '@/components/Loader'

export default {
    props: {
        consultation: {
            type: Object,
            default: {}
        },

        consultationStatus: {
            type: String,
            default: null
        },

    },

    components: {
        Loader,
        PrescriptionPopup,
    },

    watch: {
        consultation: {
            handler() {
                this.fetchPrescription();
            }, deep: true
        }
    },

    data () {
        return {
            prescPopup: false,

            prescription: {},
            meds: [],

            selectedMed: {},

            review: false,
            postReview: {
                ratings: 0,
                description: null,
            },

            reviewable: true,

            loading: false,
        }
    },

    mounted() {
        this.eventWatcher();
    },

    methods: {

        /*
        |--------------------------------------------------------------------------
        | @Initialize
        |--------------------------------------------------------------------------
        */

        /**
         * Fetch consultation prescription
         * 
         */
        fetchPrescription() {

            this.$refs['loader'].show();

            let data = {
                consultation_id: this.consultation.id
            };

            axios.post(this.routes['api.care.medical-prescriptions.fetch'], data)
            .then((response) => {
                this.$refs['loader'].hide();
                if(response.data.prescription.medical_prescription) {
                    this.prescription = response.data.prescription.medical_prescription;
                }
                this.meds = response.data.prescription.meds;
                this.reviewable = response.data.review;
                if(this.reviewable) {
                    if(this.consultationStatus == 'Completed') {
                        this.review = true;
                    }
                }
                
                let medsChecker = this.meds;
                medsChecker = medsChecker.filter((med) => {
                    return med.product_id;
                });

                if(medsChecker.length) {
                    this.$emit('cancheckprice');
                }
            }).catch((err) => {
                this.$refs['loader'].hide();
            });

        },

        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        /**
         * View med details
         * 
         * @param object med
         */
        viewDetails(med) {
            this.selectedMed = med;
            this.$refs['view-details'].show();
        },

        /**
         * Submit patient review
         * 
         */
        submit() {

            this.postReview.consultation_id = this.consultation.id;
            this.postReview.doctor_id = this.consultation.doctor.id;

            this.$refs['loader'].show();

            axios.post(this.routes['api.care.doctor-reviews.store-review'], this.postReview)
            .then((response) => {
                this.$refs['loader'].hide();
                this.postReview = {
                    ratings: 0,
                    description: null
                };
                this.review = false;
                this.reviewable = false;
                this.$alert.show('Consultation Review', response.data.message, this.$PRXConfig().staticUrl('icons/Check.svg'));                    
            }).catch((err) => {
                this.$refs['loader'].hide();
                console.log(err);
            });
        },

        /**
         * Event review watcher
         * 
         */
        eventWatcher() {
            bus.$on('review', () => {
                // if(this.reviewable && this.consultationStatus == 'Completed') {
                    this.review = true;
                // }
            })
        },

    },

    filters: {
        format_date(date) {
            return moment(date).format('LL');
        }
    },
}
</script>
