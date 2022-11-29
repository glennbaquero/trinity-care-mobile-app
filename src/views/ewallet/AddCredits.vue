<template>
    <!-- Filter View -->
    <v-navigation-drawer
    v-model="credits"
    fixed
    left
    width="100%"
    touchless
    >
        <v-card class="consultation__historyCon">
            <v-toolbar class="consultation__historyTitle type-shdw-gray">
                <v-btn icon dark @click="hide()">
                    <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
                </v-btn>
                <v-toolbar-title>Add Credits</v-toolbar-title>
            </v-toolbar>
        </v-card>
        <v-container class="pa-4">
            <v-layout row wrap mx-auto class="pb-5">
                <template v-for="creditPackage in packages">
                    <v-flex xs6>
                        <v-card
                        @click="selectPackage(creditPackage)"
                        :class="selectedPackage.id == creditPackage.id ? 'selected' :''"
                        :ripple="false"
                        class="addCredits__cardCon py-7 px-2 text-center">
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-semibold text--ellipsis">{{ creditPackage.credits }} credit(s)</v-list-item-title>
                                    <v-list-item-subtitle class="text--ellipsis">P {{ creditPackage.price }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-flex>
                </template>
                
                <template v-if="!packages.length">
                    <v-layout row wrap mx-auto class="px-3">
                        <v-flex xs12 text-center>
                            <p class="mb-0 font-weight-bold type-gray">No wallet packages</p>
                        </v-flex>
                    </v-layout>                    
                </template>
            </v-layout>

            <v-layout row wrap mx-auto>
                <v-flex xs12 v-if="selectedPackageIsEmpty">
                    <v-btn width="100%" class="button type-green type-1 text-small py-2" @click="trigPaymentView()">Next</v-btn>
                </v-flex>
            </v-layout>

            <PaymentView 
            @completed="completed()"
            :show="paymentView" @paymentClose="paymentView = false"></PaymentView> 

            <Loader
            ref="loader"
            ></Loader>
        </v-container>
    </v-navigation-drawer>
</template>

<script>
    import PaymentView from './Payment.vue'
    import Loader from '../../components/Loader.vue'

    export default {

        components: {
            PaymentView,
            Loader
        },

        watch: {
            credits(val) {
                if(this.credits) {
                    this.init();
                } 
            }
        },

        computed: {
            selectedPackageIsEmpty() {
                return !_.isEmpty(this.selectedPackage)
            },

            currentCredit() {
                return this.$parent.$parent.credits;
            }

        },

        data () {
            return {
                packages: [],
                selectedPackage: {},

                credits: false,
                paymentView: false,
            }
        },


        methods: {

            /*
            |--------------------------------------------------------------------------
            | @Initialize
            |--------------------------------------------------------------------------
            */

            init() {
                this.fetchPackages();
            },


            /*
            |--------------------------------------------------------------------------
            | @Methods
            |--------------------------------------------------------------------------
            */

            completed() {
                this.hide();
                this.$emit('completed');
            },

            /**
             * Fetch packages
             * 
             */
            fetchPackages() {
                this.$refs['loader'].show();
                axios.post(this.routes['api.care.credit-packages.fetch'])
                    .then((response) => {
                        this.$refs['loader'].hide();                        
                        this.packages = response.data.packages;
                    }).catch((err) => {
                        this.$refs['loader'].hide();
                    });
            },

            /**
             * Select package
             * 
             * @param object creditPackage
             */
            selectPackage(creditPackage) {
                this.selectedPackage = creditPackage;
            },

            /**
             * Show adding of credits
             * 
             */
            show() {
                this.credits = true;
            },

            /**
             * Hide adding of credits
             * 
             */
            hide() {
                this.credits = false;
                this.selectedPackage = {};
            },

            trigPaymentView() {
                this.paymentView = this.paymentView ? false: true;
            },
        },
    }
</script>