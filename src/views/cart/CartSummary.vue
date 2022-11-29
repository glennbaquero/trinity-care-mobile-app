<template>
    <div>
        <v-row 
        v-if="disclaimer"
        class="pa-0" no-gutters>
        <v-col cols="12">
            <div class="frm-info text-center">
                <i 
                @click="hideDisclaimer()"
                class="fa fa-times close-btn"></i>
                <p class="mb-1 text-white font-size-small font-weight-semibold">Disclaimer</p>
                <p class="mb-0 text-white font-size-small">Kindly provide required prescriptions to avoid cancellation of orders.</p>
            </div>
        </v-col>
    </v-row>
    <v-row class="px-0 py-5" no-gutters>
        <v-col cols="12" v-if="cartItems && cartItems.length">
            <swipe-list
            ref="list"
            :disabled="!enabled"
            :items="cartItems"
            item-key="id"
            >
                <template v-slot="{ item, index, revealRight, close }">

                    <v-card class="frm-card border-radius--10 box-shadow--10 mx-4 mb-3">
                        <v-list two-line>
                            <v-list-item>
                                <v-list-item-avatar width="70" height="120" tile class="my-0">
                                    <v-img
                                    class="elevation-0"
                                    contain
                                    :src="item.image_path"
                                    @click="navigateToProductView(item)"
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content class="py-0">
                                    <v-list-item-title class="font-weight-semibold text-clamp">{{ item.product_name }}</v-list-item-title>
                                    <v-list-item-subtitle class="font-size-small">P {{ item.total_per_item }}</v-list-item-subtitle>
                                    <template v-if="item.linked_md">
                                        <p class="font-size-small text-darkgreen font-italic my-2">Recommended by {{ item.linked_md.fullname }}</p>
                                    </template>
                                    <v-list-item-subtitle>
                                        <div class="d-flex align-center">
                                            <div class="frm-btn">                 
                                                <v-btn icon @click="quantityChanged(item, 'decrement')">
                                                    <v-icon color="#3B823E">fa fa-minus</v-icon>
                                                </v-btn>
                                            </div>
                                            <p class="mb-0 mx-2 font-weight-semibold">{{ item.quantity }}</p>
                                            <div class="frm-btn">
                                                <v-btn icon @click="quantityChanged(item, 'increment')">
                                                    <v-icon color="#3B823E">fa fa-plus</v-icon>
                                                </v-btn>
                                            </div>
                                        </div>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn 
                                    @click="showButtons(index)"
                                    icon class="mt-8">
                                        <v-icon color="grey lighten-1">fa fa-ellipsis-v</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                        <template v-if="item.product.prescriptionable && (!item.prescription && !item.prescription_path)">
                            <p class="font-size-small font-italic text-yellow px-4 pb-4 mb-0">No prescription uploaded yet</p>
                        </template>
                    </v-card>
                </template>
                <!-- right swipe side template and v-slot:right"{ item }" is the item clearly -->
                <template v-slot:right="{ item }">
                    <v-btn icon small class="mr-3" @click="showRemoveDialog(item)">
                        <v-icon color="#EB5757">fa fa-trash</v-icon>
                    </v-btn>
                    <v-btn icon small @click="editCartItem(item)">
                        <v-icon color="#3B823E">fa fa-pen</v-icon>
                    </v-btn>
                </template>
            </swipe-list>
        </v-col>
        <EmptyCart v-else />
    </v-row>
    <v-row class="pa-0" no-gutters>
        <div class="frm-border"></div>
    </v-row>
    <v-row class="px-4 py-6" no-gutters>
        <v-col cols="12" class="mb-6">
            <div class="frm-inpt-group d-flex align-center">
                <input 
                v-model="voucher_code"
                type="text" placeholder="Enter Voucher Code" name="">
                <button
                @click="applyVoucher()"
                :disabled="!voucher_code"
                >Apply Code</button>
            </div>
        </v-col>
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
            <p class="font-size-small font-weight-semibold type-lighterGray mb-1">P 0.00</p>
        </v-col>
        <v-col cols="6">
            <p class="font-size-small font-weight-semibold text-darkgreen mb-1">GRAND TOTAL</p>
        </v-col>
        <v-col cols="6" class="text-right">
            <p class="font-size-small font-weight-semibold text-darkgreen mb-1">Php {{ grandTotal }}</p>
        </v-col>
        <v-col cols="12" class="mt-4">
            <div class="frm-btn frm-btn--outline">
                <v-btn
                class="btn--green"
                block
                large
                dark
                rounded
                min-height="60"
                :disabled="!cartItems.length"
                @click="proceedDialog = true"
                >
                    Proceed to Checkout
                </v-btn>
            </div>
        </v-col>
    </v-row>

    <ConfirmationDialog
    :show="removeDialog"
    :message="'Remove ' +  item.product_name + ' from cart?'"
    image="icons/shopping-purse-icon.svg"
    @cancel="removeDialog = false"
    @proceed="removeItem"
    @close="removeDialog = false"
    />

    <ConfirmationDialog
    :show="proceedDialog"
    message="Do you wish to Checkout these items?"
    image="icons/help-web-button.svg"
    @cancel="proceedDialog = false"
    @proceed="checkout"
    @close="proceedDialog = false"
    />

    <SuccessDialog
    :show="successDialog"
    message="Item successfully removed from cart!"
    image="icons/Check2.svg"
    @close="successDialog = false"
    />

    <Loader
    ref="loader"
    ></Loader>
    
</div>
</template>

<script>
import ConfirmationDialog from '@/components/ConfirmationDialog';
import SuccessDialog from '@/components/SuccessDialog';
import EmptyCart from '@/components/substitute/EmptyCart';
import Loader from '@/components/Loader.vue';
import { SwipeList, SwipeOut } from 'vue-swipe-actions';
import 'vue-swipe-actions/dist/vue-swipe-actions.css';

export default {
    data () {
        return {
            removeDialog: false,
            proceedDialog: false,
            successDialog: false,
            sub_total: 0,
            shipping_fee: 1,
            item: {},
            enabled: true,
            disclaimer: true,
            cartItems: [],
            voucher_code: null,

            voucher: null
        }
    },

    components: { 
        ConfirmationDialog, 
        SuccessDialog, 
        EmptyCart, 
        Loader, 
        SwipeOut, 
        SwipeList 
    },

    computed: {
        subTotal() {
            let subTotal = this.sub_total;
            return subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        discount() {
            let discount = 0;
            if(this.voucher) {
                if(this.voucher.type == 0) {
                    discount = this.voucher.discount;
                } else {
                    discount = parseFloat(this.sub_total) * (parseInt(this.voucher.discount) / 100);
                }
            }
            return parseFloat(discount).toFixed(2);
        },

        grandTotal() {
            let total = 0,
                subTotal = this.sub_total, 
                discount = this.discount

            total = parseFloat(subTotal) - parseFloat(discount);
            return total;
        }
    },

    mounted() {
        this.$store.commit('setTopNav/set', 'My Cart');
        this.init();
    },

    methods: {

        /*
        |--------------------------------------------------------------------------
        | @Initialize
        |--------------------------------------------------------------------------
        */

        init() {
            this.fetchCart();
        },

        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        /**
         * Fetch cart
         * 
         */
        fetchCart() {
            this.$refs['loader'].show();
            axios.get(this.routes['api.care.cart.fetch'])
            .then(response => {
                this.cartItems = response.data.items;
                this.sub_total = response.data.sub_total;
                this.$store.commit('user/setData', { name: 'subTotal', payload: response.data.sub_total });
                this.$store.commit('api/fetchData', { key: 'cartItems', payload: [ ...response.data.items] });
                this.$refs['loader'].hide();
            }).catch((err) => {
                this.$refs['loader'].hide();
            });
        },

        /**
         * Updating of quantity for specific cart item
         * 
         * @param  object item
         * @param  string type
         */
        quantityChanged(item, type) {
            var quantity = item.quantity;

            if(type == 'decrement') {
                quantity--;
            } else {
                quantity++;
            }

            var data = {
                id: item.id,
                quantity: parseInt(quantity),
                type: type
            };

            this.$refs['loader'].show();

            axios.post(this.routes['api.care.cart.item.update'], data)
            .then(response => {
                this.fetchCart();
                this.$refs['loader'].hide();      
            }).catch((err) => {
                this.$refs['loader'].hide();
            });
        },  

        /**
         * Show remove dialog
         * 
         * @param  object item
         */
        showRemoveDialog(item) {
            this.removeDialog = true;
            this.item = item;
        },

        /**
         * Remove item from cart
         * 
         */
        removeItem() {
            var data = {
                id: this.item.id
            };
            this.$refs['loader'].show();

            axios.post(this.routes['api.care.cart.delete'], data)
            .then(response => {
                this.removeDialog = false;
                this.successDialog = true;
                this.$refs['loader'].hide();
                this.fetchCart();
            }).catch((err) => {
                this.$refs['loader'].hide();          
            })
        },

        /**
         * Apply voucher
         * 
         */
        applyVoucher() {

            let data = {
                code: this.voucher_code
            };
            this.$refs['loader'].show();

            axios.post(this.routes['api.care.my-vouchers.redeem'], data)
                .then((response) => {
                    this.$refs['loader'].hide();
                    if(response.data.status == 'verified') {
                        this.voucher = response.data.voucher;
                        this.$alert.show("Voucher Applied", response.data.message, this.$PRXConfig().staticUrl('icons/home/ic-hm-voucher.svg'))
                    } else {
                        this.$alert.show("Voucher failed to apply", response.data.message, )
                    }
                }).catch((err) => {
                    this.$refs['loader'].hide();
                });
        },

        /**
         * Redirect to checkout page
         * 
         */
        checkout() {
            this.$store.commit('user/setData', { name: 'voucher', payload: this.voucher });
            this.$store.commit('user/setData', { name: 'discount', payload: this.discount });
            this.$store.commit('user/setData', { name: 'grandTotal', payload: this.grandTotal });

            this.$store.commit('user/setData', { name: 'cartItems', payload: [ ...this.cartItems ] });
            this.$PRXRouter().goTo('cartCheckout');
        },

        /**
         * Show buttons (swipe action)
         * 
         * @param  int index
         */
        showButtons(index) {
            this.$refs.list.revealRight(index);
        },

        /**
         * Edit cart item
         * 
         * @param  object item
         */
        editCartItem(item) {
            this.$store.commit('cart/setSelected', item);
            this.$PRXRouter().goTo('cartEdit');
        },

        /**
         * Hide disclaimer banner
         * 
         */
        hideDisclaimer() {
            this.disclaimer = false;
        },

        /**
         * Navigate to productview page
         * 
         * @param  object product 
         */
        navigateToProductView(item) {
            let product = item.product;
            product.stocks = item.stocks;
            this.$store.commit('selectedProduct/set', product);      
            this.$PRXRouter().goTo('productView');
        },


    }
}
</script>
