<template>
    <v-row justify="center">
        <v-dialog
        v-model="modal"
        max-width="150"
        >
            <v-card class="health__dialogCon transaction--history pa-5" style="border-radius: 10px !important">
                <!-- <v-icon class="close--dialog" @click="height = false">{{ 'fa-times' }}</v-icon> -->
                <v-layout class="px-2">
                    <v-flex xs12>
                        <p class="mb-1"><span class="font-weight-bold type-black">Status:</span> 
                            <span 
                            :class="renderStatus(transaction).class"
                            class="font-weight-normal"> {{ renderStatus(transaction).label }}</span>
                        </p>
                        <p class="mb-1"><span class="font-weight-bold type-black">Date & Time:</span> {{ renderTransactionDate(transaction) }}</p>
                        <p class="mb-1"><span class="font-weight-bold type-black">Credit(s):</span> + {{ renderCredits(transaction) }}</p>
                        <p class="mb-1"><span class="font-weight-bold type-black">Amount:</span> P {{ transaction.total }}</p>
                        <p class="mb-1"><span class="font-weight-bold type-black">Reference No.:</span> {{ transaction.reference_code }}</p>
                    </v-flex>

                </v-layout>

                <v-card-actions class="text-center">
                    <v-btn class="button mx-auto v-btn--small type-green" @click="hide()">Okay</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </v-row>
</template>


<script>

    import Renders from './renders.js';

    export default {

        data() {
            return {
                modal: false,

                transaction: {},
            }
        },

        mixins: [ Renders ],

        methods: {

            /*
            |--------------------------------------------------------------------------
            | @Renders
            |--------------------------------------------------------------------------
            */

            /**
             * Open transaction
             * 
             * @param  object transaction
             */
            show(transaction) {
                this.modal = true;
                this.transaction = transaction;
            },

            /**
             * Hide transaction
             * 
             */
            hide() {
                this.modal = false;
            },

        },

    }
</script>