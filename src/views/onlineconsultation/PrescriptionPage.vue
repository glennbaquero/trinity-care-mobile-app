<template>
<v-navigation-drawer
v-model="prescriptionView"
fixed
left
class="chat__pageCon prescription__Holder"
width="100%"
style="position: fixed;"
>
    <v-card class="chat__headerCon">
        <v-toolbar 
        style="height: auto !important;"
        class="px-5 py-3 justify-space-between">
            <v-btn icon dark @click="prescriptionView = false">
                <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
            </v-btn>
            <v-toolbar-title>Dr. {{ doctor.fullname }}</v-toolbar-title>
            <v-img 
            @click="openReview()"
            :src="doctor.full_image" class="chat__profileImg" max-width="30px" width="30px" height="30px"></v-img>
        </v-toolbar>
    </v-card>

    <v-container class="prescription__Con frm-elevation pa-0">

        <MedicalInformation
        :consultation-status="consultationStatus"
        :consultation="consultation"
        @cancheckprice="setCheckPrice"
        ref="medical-information"

        ></MedicalInformation>

        <v-layout row wrap mx-auto px-5 my-12>

            <v-flex xs12 mb-9>
                <h5>Dr.{{ doctor.fullname }}</h5>
                <h5 class="font-weight-normal">{{ doctor.specialization_name }}</h5>
                <h5 class="font-weight-normal">License No. {{ doctor.license_number }}</h5>
            </v-flex>

            <v-flex xs12 class="text-center mb-4 frm-btn">
                <v-btn
                    rounded large outlined elevation="elevation-0" min-width="180" min-height="42" class="px-4"
                    @click="download()"
                    >
                    Download and Save RX
                </v-btn>
            </v-flex>

            <v-flex xs12 class="text-center frm-btn">
                <template v-if="allowCheckPrice">
                    <v-btn
                        rounded large elevation="elevation-0" min-width="180" min-height="42" class="type-doc-2 px-4"
                        @click="checkPrice()"
                        >
                        Check Price
                    </v-btn>
                </template>
            </v-flex>
        </v-layout>
    </v-container>

    <Loader
    ref="loader"
    ></Loader>

</v-navigation-drawer>
</template>

<script>
    
import MedicalInformation from './MedicalInformation.vue';
import Loader from '@/components/Loader';
import { bus } from '@/assets/js/EventBus.js';

export default {

    props: {
        consultationStatus: {
            type: String,
            default: null
        },
    },

    components: {
        Loader,
        MedicalInformation,
    },

    data () {
        return {
            prescriptionView: false,
            prescPopup: false,
            doctor: {},
            consultation: {},

            allowCheckPrice: false,
        }
    },

    methods: {

        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        show(consultation, doctor) {
            this.consultation = consultation;
            this.doctor = doctor;
            this.prescriptionView = true;
        },

        setCheckPrice() {
            this.allowCheckPrice = true
        },


        /**
         * Check price function
         * Note: this also runs like add to cart
         * 
         */
        checkPrice() {
            this.$refs['loader'].show();
            
            let data = {
                consultation_id: this.consultation.id
            };

            axios.post(this.routes['api.care.medical-prescriptions.check-price'], data)
                .then((response) => {
                    this.$refs['loader'].hide();
                    this.$PRXRouter().goTo('cartSummary');
                }).catch((err) => {
                    this.$refs['loader'].hide();
                });
        },

        /**
        * Download prescription
        * 
        */
        download() {
            this.$refs['loader'].show();
            let data = {
                consultation_id: this.consultation.id
            };
            axios.post(this.routes['api.care.medical-prescriptions.download'], data)
            .then((response) => {
                this.$refs['loader'].hide();
                window.cordova.InAppBrowser.open(response.data.path, '_system');
            }).catch((err) => {
                this.$refs['loader'].hide();
            });

        },

        /**
         * Open review page
         * 
         */
        openReview() {
            bus.$emit('review');
        },
    }

}
</script>