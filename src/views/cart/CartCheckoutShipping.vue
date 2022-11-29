<template>
    <div class="product__con">
        <v-row class="px-4 py-5" no-gutters v-if="shippingMatrixes.length">
            <v-col cols="6" class="mb-12">
                <p class="font-weight-semibold">Shipping Area</p>
                    <v-select
                    label="Select Shipping area"
                    dense
                    solo
                    class="cstm-button-radius form__input--select"
                    flat
                    outlined
                    hide-details
                    item-text="area_name"
                    item-value="id"
                    v-model="shipping_id"
                    :items="shippingMatrixes"
                    min-height="42"
                    max-height="42"
                    color="red"
                  ></v-select>
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
                <p class="font-size-small font-weight-semibold type-lighterGray mb-1">P {{ withComma(subTotal) }}</p>
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
                <p class="font-size-small font-weight-semibold type-lighterGray mb-1">P {{ withComma(shippingFee) }}</p>
            </v-col>
            <v-col cols="6">
                <p class="font-size-small font-weight-semibold text-darkgreen mb-1">GRAND TOTAL</p>
            </v-col>
            <v-col cols="6" class="text-right">
                <p class="font-size-small font-weight-semibold text-darkgreen mb-1">P {{ grandTotal.display }}</p>
            </v-col>
            <v-col class="mt-12">
                <div class="frm-btn">
                    <v-btn
                    class="btn--green"
                    block
                    large
                    dark
                    rounded
                    min-height="60"
                    :dark="shippingMethod !== null"
                    :disabled="shippingMethod === null"
                    @click="next"
                    >
                        Select Shipping Method
                    </v-btn>
                </div>
            </v-col>
        </v-row>

    <Loader
    ref="loader"
    ></Loader>

</div>
</template>

<script>

import Loader from '@/components/Loader.vue';
import NumberJS from '@/assets/js/mixins/number.js';

export default {

    components: {
        Loader
    },

    computed: {
        subTotal() {
            const sub_total = this.$store.getters['user/subTotal'];

            return Number.isInteger(sub_total) ? `${sub_total}.00` : sub_total;
        },

        grandTotal() {
            const subTotal = parseFloat(this.$store.getters['user/subTotal']) - parseFloat(this.discount);
            const total = subTotal + parseFloat(this.shippingFee);
            return  {
                display: total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                noformat: total   
            };        
        },

        discount() {
            return this.$store.getters['user/discount'];
        },

        standardShippingFees() {
            return this.getItem('standards');
        },

        expressShippingFees() {
            return this.getItem('express');
        }
    },

    watch: {

        shipping_id() {
            let shippingMatrixes = this.shippingMatrixes;
            shippingMatrixes = shippingMatrixes.filter((data) => {
                return this.shipping_id == data.id;
            });

            if(shippingMatrixes.length) {
                let selectedShipping = shippingMatrixes[0],
                subTotal = this.$store.getters['user/subTotal'];
                if(selectedShipping.quantity || selectedShipping.price) {
                    if(this.countTotalItems() >= selectedShipping.quantity_minimum && subTotal >= selectedShipping.price_minimum) {
                        this.shippingFee = 0;
                    } else {
                        this.shippingFee = selectedShipping.fee;
                    }
                } else {
                    this.shippingFee = selectedShipping.fee;
                }
                this.shippingMethod = selectedShipping;
            }
        }

    },


    data () {
        return {
            shippingMethod: null,
            shippingFee: 0,
            address:{},

            shippingMatrixes: [],
            shipping_id: null,

        }
    },

    mounted() {
        this.$store.commit('setTopNav/set', 'Shipping Info')
        this.init();
    },

    mixins: [NumberJS],

    methods: {

        /*
        |--------------------------------------------------------------------------
        | @Initialize
        |--------------------------------------------------------------------------
        */


        init() {
            this.setAddress();
            this.getShippingMatrix();
        },

        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        /**
         * Get shipping matrix
         * 
         */
        getShippingMatrix() {
            this.$refs['loader'].show();
            axios.post(this.routes['api.care.shipping-matrixes.fetch'])
                .then((response) => {
                    this.$refs['loader'].hide();
                    this.shippingMatrixes = response.data.shippingMatrixes;
            }).catch((err) =>{
                this.$refs['loader'].hide();
            });
        },

        /**
         * Count total items in cart
         * 
         */
        countTotalItems() {
            let items = this.$store.getters['api/cartItems'],
            total = 1;

            items.forEach((item) => {
                total = total + item.quantity;
            });
            return total;
        },

        /**
         * Set address
         * 
         */
        setAddress() {
            const addresses = this.$store.getters['api/addresses'];
            const address = addresses.find(a => a.defaultAddress == true);

            this.address = address;
        },

        /**
         * Redirect to cart payment
         * 
         */
        next() {
            this.$store.commit('user/setData', { name: 'shippingMethod', payload: this.shippingMethod });
            this.$store.commit('user/setData', { name: 'shippingFee', payload: parseInt(this.shippingFee) });
            this.$store.commit('user/setData', { name: 'grandTotal', payload: this.grandTotal.noformat });
            this.$PRXRouter().goTo('cartPayment');
        },

    }
}
</script>
