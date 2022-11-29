<template>
    <v-row justify="center">
        <v-dialog v-model="specialization" fullscreen hide-overlay transition="dialog-right-transition">
            <v-card class="consultation__historyCon bg-lightGray">
                <v-toolbar class="consultation__historyTitle type-shdw-gray">
                    <v-btn icon dark @click="back()">
                        <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ filter.specialization.name }}</v-toolbar-title>
                </v-toolbar>

                <v-container pa-5 class="specialization--ConFr1 elevation-3">
                    <v-layout row wrap mx-auto>
                        <v-flex xs6 class="align-self-center">
                            <p class="font-size-small mb-0 type-white">Credit Balance</p>
                            <h2 class="type-white">{{ credits }} Credits</h2>
                        </v-flex>
                        <v-flex xs6 class="text-right align-self-center">
                            <v-btn class="button cstm-button-radius type-white text-small font-weight-bold type-shdw-gray mx-auto" min-width="165" min-height="42" @click="ewalletShow()"><p class="mb-0 type-black">Add Credits</p></v-btn> 
                        </v-flex>
                    </v-layout>
                </v-container>

                <v-container column align-center justify-space-between px-5 pt-8 pb-0 class="help__con">
                    <!-- SEARCH_COMPONENT -->
                    <form @submit.prevent="search">
                        <v-layout row wrap mx-auto>
                        <v-flex xs10 class="search__con cstm-button-radius">
                            <v-layout row wrap mx-auto>
                                <v-flex xs10 class="search__form">
                                    <v-text-field
                                    label="Search Doctor"
                                    single-line
                                    solo
                                    text
                                    class="py-1"
                                    v-model="doctor_name"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="search__icon" @click="search">
                                    <i class="fas fa-search"></i>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs2 text-right class="button__icon--right pl-4">
                            <v-img @click="trigSpecializationFilter()" class="mt-5 ml-3" :src="$PRXConfig().staticUrl('icons/filter.svg')" max-width="25" width="25" height="20" contain></v-img>
                        </v-flex>
                        </v-layout>
                    </form>
                    <!-- END_SEARCH_COMPONENT -->
                </v-container>

                <v-container coloumn pa-5>
                    <v-layout row wrap mx-auto>
                        <v-flex xs12 class="mb-5" v-for="doctor in doctors" :key="doctor.id">
                            <v-card 
                            class="consultation__drCard cstm-border-radius-10 cstm-elevation-2">
                                <v-layout 
                                @click="showDoctor(doctor)"
                                class="px-4 py-5">
                                    <v-flex xs3 class="align-self-center">
                                        <div class="text-center consultation__drImgHolder consult__imgHolder">
                                            <v-img :src="doctor.full_image" class="ml-0 mb-3 consultation__drImg" width="70px" height="70px"></v-img>
                                            <div 
                                            :class="renderOnlineStatus(doctor.online, true)"
                                            class="online--status"></div> 
                                        </div>
                                    </v-flex>
                                    <v-flex xs10 ml-2>
                                        <h3>Dr. {{ doctor.fullname }}</h3>
                                        <p class="mb-0 font-size-small">{{ doctor.specialization_name }}</p>
                                        <p class="mb-0 mt-3 font-size-small type-green">{{ doctor.consultation_fee }} credits</p>
                                    </v-flex>
                                    <v-flex xs4 align-self-end>
                                        <template v-if="doctor.ratings">
                                            <h3 class="type-1 text-center"><i class="fa fa-star font-size-small mr-2"></i>{{ doctor.ratings }}</h3>
                                        </template>
                                        <template v-else>
                                            <h5 class="type-1 text-center">No ratings</h5>
                                        </template>
                                    </v-flex>
                                </v-layout>
                                <v-layout class="px-5 pt-3 pb-5">
                                    <v-flex xs7>
                                        <v-btn
                                        @click="viewCalendar(doctor.id)"
                                        outlined text depressed
                                        min-height="30"
                                        class="button cstm-button-radius font-weight-bold appointment"
                                        >
                                        Book Appointment
                                    </v-btn>
                                    </v-flex>
                                    <v-flex xs5 class="text-right">
                                        <v-btn
                                            v-if="canBook(doctor.consultation_fee)"
                                            text depressed
                                            min-height="30"
                                            class="button cstm-button-radius type-green font-weight-bold mx-auto px-4 ml-2"
                                            :disabled="doctor.online == 2 || doctor.online == 3  ? true : false"
                                            @click="confirmChatRequest(doctor)"
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
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-flex>
                        <template v-if="!doctors.length">
                            <v-flex xs12 class="mb-5 text-center">
                                <p class="font-weight-bold mb-0 type-gray">No Doctors</p>
                            </v-flex>
                        </template>
                    </v-layout>
                </v-container>

                <SpecializationFilter 
                :show="specializationFilter" 
                @drawer="drawer(...arguments)" 
                :specializations="specializations" 
                @specializationId="specializationFilterChanged(...arguments)"
                @availability="availability(...arguments)"
                @status="status(...arguments)"
                @clear="clearFilter()"
                ></SpecializationFilter>

                <!-- E-wallet Component -->
                <Ewallet
                ref="ewallet"
                ></Ewallet>
                <!-- End of E-wallet Component -->

                <CreditsDeductionDialog 
                @openChat="openChat"
                ref="confirmation">
                </CreditsDeductionDialog>  

            </v-card>

        </v-dialog>

        <Loader
        ref="loader"
        ></Loader>
        
    </v-row>
</template>

<script>

import CreditsDeductionDialog from './modals/CreditsDeductionDialog.vue';        
import SpecializationFilter from './SpecializationFilter.vue';
import Loader from '@/components/Loader';
import ConsultationMixin from '@/assets/js/mixins/consultations/consultations.js';

export default {

    components: {
        Loader,
        SpecializationFilter,
        CreditsDeductionDialog                        
    },


    data () {
        return {
            filter: {
                specialization: {},
                status: null,
                availability: null,
            },
            specialization: true,
            specializationFilter: false,
            doctors: [],
            specializations: [],
            doctor_name: null
        }
    },

    computed: {

        credits() {
            return this.$store.state.api.credits;
        },

        selectedSpecialization() {
            return this.$store.state.setSpecialization.item;
        }

    },

    mounted() {
        this.filter.specialization = this.selectedSpecialization;
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

        init(doctor_name = null) {

            this.doctors = [];

            var payloads = {
                specialization_id: this.filter.specialization.id,
                name: doctor_name,
                status: this.filter.status,
                availability: this.filter.availability,
            }

            axios.post(this.routes['api.care.specialization-doctors.fetch'], payloads)
            .then(response => {
                this.$refs['loader'].hide();            
                this.doctors = response.data.doctors;
            }).catch((err) => {
                this.$refs['loader'].hide();
                this.$alert.show('Something went wrong', 'Something went wrong. Please try again');                    
            });
        },

        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        /**
        * Opening filter drawer
        * 
        */
        trigSpecializationFilter() {
            this.specializationFilter = !this.specializationFilter;
        },

        /**
        * Emit function from Specialization Filter 
        */
        drawer(val) {
            this.specializationFilter = val;
        },

        /**
        * Searching of doctor via first name or lastname
        * 
        */
        search() {
            this.$refs['loader'].show();
            this.init(this.doctor_name);
        },

        /**
        * List of function for filteration 
        * 
        */
        specializationFilterChanged(specialization) {
            this.filter.specialization = specialization;
            this.init(this.doctor_name);
        },

        status(value) {
            this.filter.status = value;
            this.filter.specialization = this.filter.specialization;
            this.init();
        },

        availability(value) {
            this.filter.availability = value;
            this.init();
        },

        clearFilter() {
            this.filter.status = null;
            this.filter.availability = null;
        },

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

        /**
         * Specialization form
         * 
         */
        back() {
            this.specialization = false; 
            this.doctor_name = null;
            this.filter.status = null;
            this.filter.availability = null;
            this.$PRXRouter().goBack()
        },

    } 
}
</script>

