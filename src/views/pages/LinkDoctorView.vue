<template>
<v-container pa-0 fill-height class="home__con">
    <v-layout column>
        <v-container pa-5>
            <v-layout row wrap mx-auto>
                <v-flex xs6 mb-4>
                    <h3 class="type-1">Linked Doctor</h3>
                </v-flex>
                <v-flex xs6 mb-4 text-right class="home__scanCon">
                    <h3 class="type-gray font-weight-default" @click="scan"><i class="fas fa-plus-circle"></i><span class="ml-2 font-weight-default">Scan new</span></h3>
                </v-flex>
                <v-flex xs12 class="home__doctorCon">
                    <v-list two-line class="cstm-bg-transparent">
                        <v-list-item class="px-0" v-for="(doctor, i) in doctors" :key="i">
                            <v-card 
                            @click="selectDoctor(doctor)"
                            class="frm-card border-radius--10 box-shadow--30 mb-2" width="100%">
                            <v-list-item two-line>
                                <v-list-item-avatar>
                                    <v-img
                                    class="elevation-0"
                                    :src="doctor.full_image"
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-semibold">{{ doctor.fullname }}</v-list-item-title>
                                    <v-list-item-subtitle class="font-size-small">{{ doctor.specialization_name }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                        </v-list-item>
                        <template v-if="!doctors.length">
                            <v-layout row wrap mx-auto>
                                <v-flex xs12 text-center>
                                    <p class="font-weight-bold mb-0 type-gray">No doctors</p>                                
                                </v-flex>
                            </v-layout>
                        </template>
                    </v-list>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>

    <Loader
      ref="loader"
    ></Loader>

</v-container>
</template>

<script>

import SuccessDialog from '@/components/SuccessDialog';
import ErrorDialog from '@/components/ErrorDialog';
import QrMixin from '@/assets/js/mixins/qr.js';
import Loader from '@/components/Loader.vue';

export default {

    components: { 
        SuccessDialog, 
        ErrorDialog,
        Loader
    },

    computed: {
        doctors() {
            return this.$store.getters['api/doctors'];
        }
    },

    data () {
        return {
            successDialog: false,
            successMessage: null,
            errorDialog: false,
            errorMessage: null,
            doctor: null
        }
    },

    mounted() {
        this.$store.commit('setTopNav/set', ' ');
    },

    mixins: [ QrMixin ],

    methods: {


        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        scan() {
            this.openQRReader(qr => {
                this.$refs['loader'].show();
                axios.post(this.routes['api.care.doctor.scan'], { qr_id: qr })
                .then(response => {
                    this.$refs['loader'].hide();
                    this.successMessage = response.data.message;
                    this.successDialog = true;
                    this.doctor = response.data.specialization;
                    this.$store.commit('api/updateDoctors', response.data.doctor);
                })
                .catch(error => {
                    this.$refs['loader'].hide();
                    this.errorMessage = error.response.data.errors.qr_id[0];
                    this.errorDialog = true;
                });
            });
        },

        /**
        * Select doctor
        * 
        * @param object doctor
        */
        selectDoctor(doctor) {
            this.$store.commit('viewDoctors/setSelected', doctor);
            this.$PRXRouter().goTo('doctor-profile');          
        },

    }
}
</script>
