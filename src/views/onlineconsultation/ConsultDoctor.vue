<template>
    <vue-pull-refresh :on-refresh="onRefresh" :config="pullToRefreshConfig"> 
    <v-container fill-height pa-0 class="bg-lightGray">
        <v-layout row wrap mx-0 align-content-start>
            <v-container column align-center justify-space-between px-5 pt-5 pb-0 class="help__con">
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
                                v-model="params.search"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs2 class="search__icon" @click="search">
                                <i class="fas fa-search"></i>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs2 text-center class="button__icon--right pl-4">
                        <v-btn class="button cstm-button-radius text-small elevation-0" min-height="56" color="transparent" dark @click.stop="drawer = !drawer">
                            <v-img class="ml-3" :src="$PRXConfig().staticUrl('icons/filter.svg')" max-width="25" width="25" height="20" contain></v-img>
                        </v-btn>
                    </v-flex>
                    </v-layout>
                </form>
                <!-- END_SEARCH_COMPONENT -->
            </v-container>

            <v-container coloumn px-5 py-0 mt-8>
                <v-layout row wrap mx-auto>

                    <v-flex xs12 class="mb-3">
                        <h3>Instant Chat</h3>
                    </v-flex>

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
                                        :disabled="doctor.online == 1 ? false : true"
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

                    <template v-if="doctors.length < 1">
                        <v-flex xs12 text-center my-10>
                            <p class="general__text color-gray mb-0">No Doctors Available</p>
                        </v-flex>
                    </template>

                </v-layout>

                <CreditsDeductionDialog 
                @openChat="openChat"
                ref="confirmation">
                </CreditsDeductionDialog>

                <!-- <BookAppointment ref="calendar">
                </BookAppointment> -->

            </v-container>



            <v-container coloumn px-5 pt-0 pb-10>

                <v-layout row wrap mx-auto>
                    <v-flex xs12 class="mb-6 mt-7">
                        <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs6 class="mb-3">
                        <h3>Specializations</h3>
                    </v-flex>
                    <v-flex xs6 class="mb-3" align-self-end text-right @click="openSpecialization('all')">
                        <h5 class="color-doc-primary1">See All Doctors</h5>
                    </v-flex>
                </v-layout>

                <v-layout row wrap mx-auto>
                    <v-flex 
                        xs6 
                        v-for="specialization in specializations" 
                        class="mb-2 elevation-1 cstm-border-radius-10 backgroundColor--white px-6 py-5 specialization_con" 
                        :key="specialization.id">

                        <v-layout row wrap mx-auto @click="openSpecialization(specialization)">
                            <v-flex xs12 mb-5>
                                <v-img :lazy-src="specialization.full_image" :src="specialization.full_image" class="v-btn--round" width="80px" height="80px">
                                    <template v-slot:placeholder>
                                        <v-row class="fill-height ma-0" align="center" justify="center">
                                            <v-progress-circular indeterminate color="#3B823E"></v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                            </v-flex>
                            <v-flex xs12>
                                <p class="font-weight-bold mb-0">{{ specialization.name }}</p>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <template v-if="!specializations.length">
                        <v-flex xs12 text-center my-10>
                            <p class="general__text color-gray mb-0">No Specialization Available</p>
                        </v-flex>
                    </template>

                </v-layout>

            </v-container>
        </v-layout>

        <!-- Filter View -->
        <v-navigation-drawer
            v-model="drawer"
            fixed
            temporary
            right
            class="filter__view"
            width="100%"
        >
            <v-list-item class="px-1 py-2 elevation-0 backgroundColor--white">
                <v-layout row wrap mx-auto class="filter__viewList">
                    <v-flex xs2>
                    </v-flex>
                    <v-flex xs8 align-self-center text-center>
                        <h2>Filter Options</h2>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn @click.stop="drawer = !drawer" icon readonly>
                            <v-icon color="#D52E29">fa-times</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-list-item>
            <v-list-item class="pa-0 backgroundColor--white">
                <v-container pa-0 class="cstm-height-100">
                    <v-layout row wrap mx-auto pa-5 class="filter__viewList">

                        <!-- NEW_FILTER_LIST -->
                        <v-flex xs12 mb-2>
                            <h3>Specialization</h3>
                        </v-flex>
                        <v-flex xs12>
                            <v-select
                                label="All"
                                dense
                                solo
                                class="cstm-button-radius form__input--select"
                                text
                                outlined
                                hide-details
                                min-height="42"
                                max-height="42" 
                                color="red"
                                item-text="name"
                                item-value="id"
                                :items="filter_specializations"
                                v-model="params.specialization_id"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 mt-7 mb-6>
                            <v-divider></v-divider>
                        </v-flex>
                        <!-- END_NEW_FILTER_LIST -->
                        <v-flex xs12 my-10 text-center>
                            <v-btn  
                            class="button cstm-button-radius text-small bg-doc-primary2" 
                            @click="applyFilter()"
                            min-height="42" 
                            min-width="165" 
                            depressed 
                            large dark >
                            Apply Filter
                            </v-btn>
                        </v-flex>

                    </v-layout>
                </v-container>
            </v-list-item>

        </v-navigation-drawer>

    <Loader
    ref="loader"
    ></Loader>  

    <Ewallet
    ref="ewallet"
    ></Ewallet>

    </v-container>
    </vue-pull-refresh>
</template>

<script>

// import BookAppointment from './BookAppointment.vue';
import CreditsDeductionDialog from './modals/CreditsDeductionDialog.vue';
import Loader from '@/components/Loader.vue';
import Ewallet from '@/views/ewallet/Ewallet.vue';
import VuePullRefresh from 'vue-pull-refresh';
import ConsultationMixin from '@/assets/js/mixins/consultations/consultations.js';

export default {
    components: {
        Loader,
        CreditsDeductionDialog,
        Ewallet,
        VuePullRefresh, 
    },

    data () {
        return {
            drawer: false,
            specializationView: false,
            bookAppointmentView: false,
            creditsDeduction: false,
            specializations: [],
            filter_specializations : [],
            specialization: 0,
            selectedSpecialization: {},
            doctors: [],
            params: {
                search: null,
                specialization_id: null,
            }
        }

    },

    mounted() {
        this.init(this.routes['api.care.specializations.fetch']);
        this.init(this.routes['api.care.doctors.list'], false, this.params);
    },

    mixins: [
        ConsultationMixin
    ],

    methods: {


        /*
        |--------------------------------------------------------------------------
        | @Initialize
        |--------------------------------------------------------------------------
        */


        /**
         * Initialize
         * 
         * @param  string  route              
         * @param  {Boolean} forSpecializations 
         * @param  {Object}  parameter
         */
        init(route, forSpecializations = true, parameter = {}) {
            this.$refs['loader'].show();
            axios.post(route, parameter)
            .then(response => {
                this.$refs['loader'].hide();

                if(forSpecializations) {
                    this.specializations = response.data.specializations;
                    this.filter_specializations = [{id : 0, name: 'All'}];
                    this.filter_specializations.push(... response.data.specializations);
                    this.filter_specializations.sort((a, b) => (a.id > b.id) ? 1 : -1);
                } else {
                    this.doctors = response.data.doctors;
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
         * Refresh data
         * 
         */
        onRefresh() {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                this.init(this.routes['api.care.specializations.fetch']);
                this.init(this.routes['api.care.doctors.list'], false);
                resolve();
              }, 1000);
          });
        },

        /**
         * Search specific doctor
         * 
         */
        search() {
            this.init(this.routes['api.care.doctors.list'], false, this.params)
        },

        /**
         * Open specializaton page
         * 
         * @param  object specialization
         */
        openSpecialization(specialization) {
            let data = specialization;
            if(specialization == 'all') {
                data = {
                    id: 0,
                    name: 'All Doctors'
                };
            }

            this.$store.commit('setSpecialization/set', data);
            this.$PRXRouter().goTo('specialization');

        },

        applyFilter() {
            this.init(this.routes['api.care.doctors.list'],false,this.params);
            this.drawer = false;
        },


        /*
        |--------------------------------------------------------------------------
        | @Render
        |--------------------------------------------------------------------------
        */

        /*
        * Render online status of a doctor
        * 
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
    }
}
</script>