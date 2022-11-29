<template>
    <div class="product__con">
        <v-row class="px-4 py-5 pb-0" no-gutters>
            <v-col cols="12" class="mb-5">
                <p class="font-weight-semibold">Payment Method</p>
                <v-radio-group v-model="paymentMethod" class="cart--radio px-4">
                    <div class="mb-2" @change="$PRXRouter().goTo('paymentDragonPay')">
                        <v-radio :key="2" label="Paynamics" :value="2" color="#FABF24"></v-radio>
                    </div>
                    <div class="mb-2">
                        <v-radio :key="4" label="Bank Deposit" :value="4" color="#FABF24" @change="$PRXRouter().goTo('paymentBankDeposit')"></v-radio>
                    </div>
                    <div class="mb-2">
                        <v-radio :key="5" label="Cash on Delivery" :value="5" color="#FABF24"></v-radio>
                    </div>
                    <div class="mb-2">
                        <v-radio :key="6" label="GCash" :value="6" color="#FABF24"></v-radio>
                    </div>
                    <div class="mb-2">
                        <v-radio 
                        :disabled="!canUseEwallet"
                        label="E-Wallet" 
                        :key="7"
                        :value="7" color="#FABF24"></v-radio>
                    </div>
                </v-radio-group>
                <template v-if="paymentMethod == 6">
                    <div class="mt-6 mb-2">
                        <v-card class="frm-card border-radius--10 box-shadow--10" width="100%">
                            <v-card-text>
                                <h3 class="text--primary mb-2">GCash Method</h3>
                                <p class="mb-0 text--primary font-size-small">Transfer payment through this GCASH number:</p>
                                <p class="text-darkgreen font-weight-semibold">09170000000</p>
                                <div class="text--primary font-size-small">
                                    Once successfully transferred, upload your proof of payment on the app.
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                </template>
            </v-col>
        </v-row>
        <v-row class="pa-0" no-gutters>
            <v-divider></v-divider>
        </v-row>
        <v-row class="px-4 py-5" no-gutters>
            <v-col cols="6">
                <p class="font-size-small font-weight-semibold type-lighterGray mb-1">SUB TOTAL</p>
            </v-col>
            <v-col cols="6" class="text-right">
                <p class="font-size-small font-weight-semibold type-lighterGray mb-1">P {{ subTotal }}</p>
            </v-col>
            <v-col cols="6">
                <p class="font-size-small font-weight-semibold type-lighterGray mb-1">DISCOUNT</p>
            </v-col>
            <v-col cols="6" class="text-right">
                <p class="font-size-small font-weight-semibold type-lighterGray mb-1">P {{ discount }}</p>
            </v-col>
            <v-col cols="6">
                <p class="font-size-small font-weight-semibold type-lighterGray mb-1">SHIPPING FEE</p>
            </v-col>
            <v-col cols="6" class="text-right">
                <p class="font-size-small font-weight-semibold type-lighterGray mb-1">P {{ shippingFee }}.00</p>
            </v-col>
            <v-col cols="6">
                <p class="font-size-small font-weight-semibold text-darkgreen mb-1">GRAND TOTAL</p>
            </v-col>
            <v-col cols="6" class="text-right">
                <p class="font-size-small font-weight-semibold text-darkgreen mb-1">P {{ grandTotal }}</p>
            </v-col>
            <v-col class="mt-12">
                <div class="frm-btn">
                    <v-btn
                    block
                    large
                    dark
                    rounded
                    min-height="60"
                    class="btn--green"
                    :dark="paymentMethod != null"
                    :disabled="paymentMethod == null"
                    @click="confirmDialog = true"
                    >
                        {{ paymentMethod == null ? 'Please select a payment method' : 'Review details' }}
                    </v-btn>
                </div>
            </v-col>
        </v-row>

        <ConfirmationDialog
        :show="confirmDialog"
        message="Do you really want this mode of payment?"
        image="icons/cash.svg"
        @cancel="confirmDialog = false"
        @proceed="next"
        @close="confirmDialog = false"
        />
    </div>
</template>

<script>

import ConfirmationDialog from '@/components/ConfirmationDialog';

export default {
    
    components: { ConfirmationDialog },

    computed: {
        subTotal() {
            const sub_total = this.$store.getters['user/subTotal'];
            return sub_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        shippingFee() {
            return this.$store.getters['user/shippingFee'];
        },
        grandTotal() {
            let total = this.$store.state.user.grandTotal;
            return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");      
        },
        discount() {
            return this.$store.getters['user/discount'];
        },
        canUseEwallet() {
            if(parseInt(this.$store.state.api.credits) >= parseInt(this.$store.state.user.grandTotal)) {
                return true;
            }
        },
    },
    
    data () {
        return {
            paymentMethod: null,
            confirmDialog: false
        }
    },    

    mounted() {
        this.$store.commit('setTopNav/set', 'Payment Method')
    },

    methods: {

        /*
        |--------------------------------------------------------------------------
        | @Initialize
        |--------------------------------------------------------------------------
        */        

        /**
         * Redirect to cart checkout summary
         * 
         */
        next() {
            this.$store.commit('user/setData', { name: 'paymentMethod', payload: this.paymentMethod });
            this.$PRXRouter().goTo('cartCheckoutSummary');
        }
    }
}
</script>
