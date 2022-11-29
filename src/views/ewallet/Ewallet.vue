<template>

    <!-- Filter View -->
    <v-navigation-drawer
    v-model="ewallet"
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
                <v-toolbar-title>E-Wallet</v-toolbar-title>
            </v-toolbar>
        </v-card>
        <v-container class="pa-4">
            <v-layout row wrap mx-auto class="pb-5">
                <v-flex xs12>
                    <v-card class="py-5 px-8">
                        <v-layout row wrap mx-auto>
                            <v-flex xs6 class="align-self-center">
                                <small class="font-weight-normal">Credit Balance</small>
                                <p class="font-weight-bold type-black">{{ credits }} credit(s)</p>
                            </v-flex>
                            <v-flex xs6 class="text-right align-self-center">
                                <v-btn @click="trigAddCreditsView()" class="button type-green type-1 text-small">Add Credits</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>

                <v-flex xs12 class="my-5">
                    <h3 class="type-black font-weight-normal mb-5">Transaction History</h3>

                    <template v-for="transaction in transactions">
                        <v-layout row wrap mx-auto class="ewallet__HistoryCon">
                            <v-flex xs7>
                                <small class="type-black font-weight-normal">Add Credits</small> | <small 
                                :class="renderStatus(transaction).class"
                                class="font-weight-normal"> {{ renderStatus(transaction).label }} </small>
                                <p>{{ renderTransactionDate(transaction) }}</p>
                            </v-flex>
                            <v-flex xs5 class="text-right">
                                <p class="font-weight-bold mb-0 type-black">+ {{ renderCredits(transaction) }} credit(s) </p>
                                <a @click="trigTransactionHistoryDialog(transaction)" class="text-decoration-underline">Details</a>
                            </v-flex>
                        </v-layout>
                    </template>

                    <template v-if="!transactions.length">
                        <v-layout row wrap mx-auto>
                            <v-flex xs12 text-center>
                                <p class="font-weight-bold mb-0 type-gray">No transaction history</p>                                
                            </v-flex>
                        </v-layout>
                    </template>

                </v-flex>

                <AddCredits
                ref="addCredits"
                @completed="transactionCompleted"
                ></AddCredits>
                
                <TransactionHistoryDialog
                ref="transaction"
                ></TransactionHistoryDialog>


            </v-layout>  

            <Loader
            ref="loader"
            ></Loader>


            <SuccessDialog
              :show="successDialog"
              message="Checkout success!"
              image="icons/Check2.svg"
              @close="successDialog = false"
            />

        </v-container>

    </v-navigation-drawer>
</template>

<script>
    import TransactionHistoryDialog from './TransactionHistoryDialog.vue';
    import AddCredits from './AddCredits.vue';
    import Loader from '../../components/Loader.vue'
    import SuccessDialog from '@/components/SuccessDialog';

    import Renders from './renders.js';

    export default {
        components: {
            TransactionHistoryDialog,
            AddCredits,
            Loader,
            SuccessDialog
        },

        watch: {
            ewallet(val) {
                if(this.ewallet) {
                    this.init();
                }
            }
        },

        data () {
            return {

                credits: 0,
                transactions: [],

                ewallet: false,
                addCredits: false,
                transactionHistory: false,

                successDialog: false
            }
        },

        mixins: [ Renders ],

        methods: {
          
            /*
            |--------------------------------------------------------------------------
            | @Initialize
            |--------------------------------------------------------------------------
            */
           
            init() {
                this.fetchHistory();
            },

            /*
            |--------------------------------------------------------------------------
            | @Methods
            |--------------------------------------------------------------------------
            */
           
            transactionCompleted() {
                this.fetchHistory();
                this.successDialog = true;
            },

            /**
             * Fetch credit history
             * 
             */
            fetchHistory() {

                this.$refs['loader'].show();
                axios.post(this.routes['api.care.credit-packages.history'])
                    .then((response) => {
                        this.$refs['loader'].hide();
                        this.credits = response.data.credits;
                        this.transactions = response.data.transactions;                        
                    }).catch((err) => {
                        this.$refs['loader'].hide();
                    });

            },

            /**
             * Show e wallet
             * 
             */
            show() {
                this.ewallet = true;
            },

            /**
             * Hide e wallet
             * 
             */
            hide() {
                this.ewallet = false;
            },

            trigTransactionHistoryDialog(transaction) {
                this.$refs['transaction'].show(transaction);
            },

            trigAddCreditsView() {
                this.$refs['addCredits'].show();
            },

        },
    }
</script>