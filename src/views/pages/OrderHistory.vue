<template>
    <v-container pa-0 class="orderHistory__con bg-lightGray">
        <v-layout 
        v-if="!invoice.cancelled"
        row wrap mx-auto my-6 px-5>
            <v-flex xs12>
                <v-card pa-0 class="cstm-elevation-2 cstm-border-radius-10">
                    <v-layout row wrap>
                        <v-flex xs4 my-6 text-center :class="`orderHistory__thumbCon${checkStatus(invoice.status, ['Cancelled']) ? '' : ' active'}`">
                            <v-img :src="$PRXConfig().staticUrl('icons/orvw-processed.svg')" class="mx-auto orderHistory__thumb mb-2" width="50px" height="50px"></v-img>
                            <h5 class="font-weight-regular type-lighterGray">Processing</h5>
                        </v-flex>
                        <v-flex xs4 my-6 text-center class="orderHistory__thumbCon"
                        :class="checkStatus(invoice.status, ['Ready to Ship', 'Order has been Shipped', 'Delivery Completed', 'Completed']) ? 'active': ''"
                        >
                            <template v-if="!checkStatus(invoice.status, ['Ready to Ship', 'Order has been Shipped', 'Delivery Completed', 'Completed'])">
                                <v-img :src="$PRXConfig().staticUrl('icons/orvw-out-delivery-dis.svg')" class="mx-auto orderHistory__thumb mb-2" width="50px" height="50px"></v-img>
                                <h5 class="font-weight-regular type-lighterGray">Out for Delivery</h5>
                            </template>
                            <template v-else>
                                <v-img :src="$PRXConfig().staticUrl('icons/orvw-out-delivery.svg')" class="mx-auto orderHistory__thumb mb-2" width="50px" height="50px"></v-img>
                                <h5 class="font-weight-regular type-lighterGray">Out for Delivery</h5>
                            </template>
                        </v-flex>
                        <v-flex xs4 my-6 text-center class="orderHistory__thumbCon last">
                            <template v-if="!checkStatus(invoice.status, ['Delivery Completed', 'Completed'])">
                                <v-img :src="$PRXConfig().staticUrl('icons/orvw-delivered-dis.svg')" class="mx-auto orderHistory__thumb mb-2" width="50px" height="50px"></v-img>
                                <h5 class="font-weight-regular type-lighterGray">Delivered</h5>
                            </template>
                            <template v-else>              
                                <v-img :src="$PRXConfig().staticUrl('icons/orvw-delivered.svg')" class="mx-auto orderHistory__thumb mb-2" width="50px" height="50px"></v-img>
                                <h5 class="font-weight-regular type-lighterGray">Delivered</h5>
                            </template>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>

        <!-- Frame 2 -->
        <template v-if="(paymentMethod.id == 4 || paymentMethod.id == 6 ) && !invoice.cancelled">
            <v-layout row wrap mx-auto my-6 px-5>
                <v-flex xs12>
                    <v-card class="cstm-elevation-2 cstm-border-radius-10 pa-4">
                        <v-layout row wrap mx-auto>
                            <v-flex xs6 mb-3>
                                <h3>Proof of Payment</h3>
                            </v-flex>

                            <template v-if="invoice.deposit_slip_path && !changeSlip">
                                <v-flex xs6 text-right align-self-end mb-3>
                                    <h5 
                                    @click="change()"
                                    class="color-light-green">Change</h5>
                                </v-flex>
                            </template>

                            <template v-else>
                                <v-flex xs6 text-right align-self-end mb-3>
                                    <h5 
                                    @click="submit()"
                                    class="color-light-green">Submit</h5>
                                </v-flex>
                            </template>

                            <template v-if="!invoice.deposit_slip_path || changeSlip">
                                <v-flex xs12>
                                    <div class="frm-inpt-file d-flex align-center">
                                        <label for="fileupload" class="frm-inpt-file__lbl">{{ fileName }}</label>
                                        <div class="frm-inpt-file__btn">
                                            <input 
                                            @change="uploadFile"
                                            type="file" id="fileupload" name="file" required>
                                            <p>Browse</p>
                                        </div>
                                    </div>
                                </v-flex>
                            </template>

                            <template v-if="invoice.deposit_slip_path && !changeSlip">
                                <v-flex xs2>
                                    <v-img 
                                    @click="previewImage(invoice.deposit_slip_path)"                                    
                                    :src="invoice.deposit_slip_path" class="cstm-border-radius-5" width="45px" height="45px"></v-img>
                                </v-flex>
                            </template>

                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </template>

        <template v-if="invoice.cancelled">
            <v-layout row wrap mx-auto mb-2 py-4 px-4 class="backgroundColor--white elevation-3">
                <v-flex xs12 mb-3>
                    <h3 class="type-red">Status: {{ invoice.status }}</h3>
                </v-flex>
                <v-flex xs12 mb-3>
                    <label>Reason: <span class="type-red"><b>{{ invoice.reason }}</b></span></label>
                </v-flex>
            </v-layout>
        </template>

        <v-layout row wrap mx-auto mb-6 px-5>
            <v-flex xs12>
                <h3>Order Summary</h3>
            </v-flex>
            <template v-for="(product, p) in products">
                <v-flex :key="p" xs12 my-2>
                    <v-card class="cstm-elevation-2 cstm-border-radius-10 px-2 py-5" @click="goToProduct(product.data)">
                        <v-list class="pa-0">
                            <v-list-item class="px-0">
                                <v-list-item-avatar style="border-radius: 5px" class="ma-0" min-width="85px" width="85px" height="85px">
                                    <v-img :src="product.data.image_path" class="mx-auto" width="85px" height="85px"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content class="px-2 py-0 align-self-start slider_con">
                                    <h3 class="mb-2 slider__text--2">{{ product.data.name }}</h3>
                                    <v-layout row wrap mx-auto mt-4>
                                        <v-flex xs6>
                                            <h5 class="font-weight-regular">{{ product.quantity }} x P {{ product.price }}</h5>
                                        </v-flex>
                                        <v-flex xs6 text-right>
                                            <h5>P {{ currencyFormatter(product.total_price) }}</h5>
                                        </v-flex>
                                    </v-layout>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-flex>
            </template>
        </v-layout>

        <!-- Frame 4 -->
        <template v-if="invoice.discount_card_path">
            <v-layout row wrap mx-auto mb-2 py-8 px-5 class="backgroundColor--white elevation-3">
                <v-flex xs12 mb-3>
                    <h3>Document</h3>
                </v-flex>
                <v-flex xs2>
                    <v-img 
                    @click="previewImage(invoice.discount_card_path)"
                    :src="invoice.discount_card_path" class="cstm-border-radius-5" width="45px" height="45px"></v-img>
                </v-flex>
            </v-layout>
        </template>

        <v-layout row wrap mx-auto mb-2 py-8 px-5 class="backgroundColor--white elevation-3">
            <v-flex xs12 mb-3>
                <h3>Deliver to</h3>
            </v-flex>
            <v-flex xs12 pl-4>
                <h3 class="mb-1">{{ invoice.deliver_to.first_name }} {{ invoice.deliver_to.last_name }}</h3>
                <p class="mb-1 font-size-small">{{ invoice.deliver_to.email }}</p>
            </v-flex>
            <v-flex xs6 pl-4>
                <p class="mb-1 font-size-small">Mobile Number</p>
            </v-flex>
            <v-flex xs6 text-right>
                <p class="mb-1 font-size-small">{{ invoice.deliver_to.mobile_number }}</p>
            </v-flex>
        </v-layout>

        <!-- Frame 5 -->
        <v-layout row wrap mx-auto mb-2 py-8 px-5 class="backgroundColor--white elevation-3">
            <v-flex xs12 mb-3>
                <h3>Shipping Address</h3>
            </v-flex>

            <v-flex xs6 pl-4>
                <p class="mb-1 font-size-small">Unit & Floor #</p>
            </v-flex>
            <v-flex xs6 text-right>
                <p class="mb-1 font-size-small">{{ invoice.shipping_unit }}</p>
            </v-flex>

            <v-flex xs6 pl-4>
                <p class="mb-1 font-size-small">Street</p>
            </v-flex>
            <v-flex xs6 text-right>
                <p class="mb-1 font-size-small">{{ invoice.shipping_street }} St.</p>
            </v-flex>

            <v-flex xs6 pl-4>
                <p class="mb-1 font-size-small">BLDG / Subdivision</p>
            </v-flex>
            <v-flex xs6 text-right>
                <p class="mb-1 font-size-small">N/A</p>
            </v-flex>

            <v-flex xs6 pl-4>
                <p class="mb-1 font-size-small">Region</p>
            </v-flex>
            <v-flex xs6 text-right>
                <p class="mb-1 font-size-small">{{ invoice.shipping_region }}</p>
            </v-flex>

            <v-flex xs6 pl-4>
                <p class="mb-1 font-size-small">Province</p>
            </v-flex>
            <v-flex xs6 text-right>
                <p class="mb-1 font-size-small">{{ invoice.shipping_province }}</p>
            </v-flex>

            <v-flex xs6 pl-4>
                <p class="mb-1 font-size-small">City</p>
            </v-flex>
            <v-flex xs6 text-right>
                <p class="mb-1 font-size-small">{{ invoice.shipping_city }} City</p>
            </v-flex>

            <v-flex xs6 pl-4>
                <p class="mb-1 font-size-small">Zip Code</p>
            </v-flex>
            <v-flex xs6 text-right>
                <p class="mb-1 font-size-small">{{ invoice.zip }}</p>
            </v-flex>

            <v-flex xs6 pl-4>
                <p class="mb-1 font-size-small">Landmark</p>
            </v-flex>
            <v-flex xs6 text-right>
                <p class="mb-1 font-size-small">{{ invoice.landmark }}</p>
            </v-flex>

        </v-layout>

        <!-- Frame 7 -->
        <v-layout row wrap mx-auto mb-2 py-8 px-5 class="backgroundColor--white elevation-3">
            <v-flex xs6>
                <h5 class="mb-2">PAYMENT METHOD</h5>
            </v-flex>
            <v-flex xs6 text-right>
                <h5 class="mb-2">{{ paymentMethod.name }}</h5>
            </v-flex>
            <v-flex xs6>
                <h5 class="mb-2">SUB TOTAL</h5>
            </v-flex>
            <v-flex xs6 text-right>
                <h5 class="mb-2">P {{ currencyFormatter(invoice.sub_total) }}</h5>
            </v-flex>

            <v-flex xs6>
                <h5 class="mb-2">DISCOUNT</h5>
            </v-flex>
            <v-flex xs6 text-right>
                <h5 class="mb-2">P {{ currencyFormatter(invoice.total_discount) }}</h5>
            </v-flex>

            <v-flex xs6>
                <h5 class="mb-1">SHIPPING FEE</h5>
            </v-flex>
            <v-flex xs6 text-right>
                <h5 class="mb-1">P {{ invoice.shipping_fee }}</h5>
            </v-flex>

            <v-flex xs6>
                <h3 class="color-light-green">GRAND TOTAL</h3>
            </v-flex>
            <v-flex xs6 text-right>
                <h3 class="color-light-green">P {{ currencyFormatter(invoice.grand_total) }}</h3>
            </v-flex>
        </v-layout>


    <v-dialog v-model="uploadSuccess" persistent max-width="290">
        <v-card class="cstm-border-radius pa-5 dialog__con">
            <v-img :src="$PRXConfig().staticUrl('icons/Check.svg')" class="mx-auto text-center" width="70px" height="70px"></v-img>
            <v-card-title class="px-2 py-5 text-center justify-center">
                <h4 class="mb-0">Deposit Slip is uploaded!</h4>
                <h5 class="type-darkerGray font-weight-default mb-0">Please wait while processing your order</h5>
            </v-card-title>
            <v-card-actions class="pa-0 justify-center">
                <v-btn
                class="button cstm-button-radius v-btn--small"
                color="#3B823E"
                dark
                flat
                min-height="42"
                depressed
                @click="uploadSuccess = false"
                min-width="130px">
                    OK
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <Loader
    ref="loader"
    ></Loader>

</v-container>
</template>


<script>

import Loader from '@/components/Loader.vue';

export default {

    components: {
        Loader
    },

    computed: {
        invoice() {
            const invoice = this.$store.getters['user/selectedInvoice'];

            return invoice;
        },

        products() {
            const products = this.invoice.products;
            return products.map(product => {
                const { image_path, ...rest } = JSON.parse(product.data);

                return {
                    quantity: product.quantity,
                    price: product.price,
                    total_price: product.total_price,
                    data: {
                        image_path: `${this.$PRXConfig().api.url}/${image_path.replace('public/', 'storage/')}`,
                        stocks: product.stocks,
                        ...rest
                    }
                };
            });
        },
        paymentMethod() {
            const methods = this.$store.getters['user/paymentMethods'];
            return methods.find(method => method.id === Number(this.invoice.payment_method));
        }
    },

    data() {
        return {
            uploadSuccess: false,

            changeSlip: false,

            fileName: 'Upload here..',
            file: null,
        }
    },

    mounted() {
        this.$store.commit('setTopNav/set', 'Orders');
        this.deposit_slip = this.$PRXConfig().api.url+'/storage/'+this.invoice.deposit_slip_path;
    },

    methods: {

        /*
        |--------------------------------------------------------------------------
        | @Initialize
        |--------------------------------------------------------------------------
        */

        /**
         * Submit slip
         * 
         */
        submit() {
            if(this.file) {
                let data = new FormData();

                data.append('deposit_slip_path', this.file);
                data.append('id', this.invoice.id);

                this.$refs['loader'].show();

                axios.post(this.routes['api.care.upload.deposit'], data)
                .then((response) => { 
                    this.$refs['loader'].hide();
                    this.changeSlip = false;
                    this.invoice.deposit_slip_path = response.data.link;
                    this.uploadSuccess = true;
                    this.fileName = 'Upload here..';
                    this.file = null;
                }).catch((err) => {
                    this.$refs['loader'].hide();
                });
            }
        },

        /**
         * Upload file
         * 
         * @param e
         */
        uploadFile(e) {
            let file = e.target.files;
            if(file.length) {
                this.fileName = file[0].name.length > 15 ? (file[0].name.substring(0, 15) + '...') : file[0].name;
                this.file = file[0]; 
            }
        },

        /**
         * Change slip status
         * 
         */
        change() {
            this.changeSlip = true;
        },

        /**
         * Navigate to product view
         * 
         * @param  object product
         */
        goToProduct(product) {
            this.$store.commit('selectedProduct/set', product);
            this.$PRXRouter().goTo('productView')
        },

        previewImage(image) {
            PhotoViewer.show(image);
        },        

        /*
        |--------------------------------------------------------------------------
        | @Renders
        |--------------------------------------------------------------------------
        */
       
        /**
         * Rendering time
         * 
         * @param datetime time
         */
        parseTime(time) {
            return moment(time).format('h:mm a');
        },

        /**
         * Rendering date
         * 
         * @param  datetime date
         */
        parseDate(date) {
            return moment(date).format('MMMM DD, YYYY');
        },

        /*
        |--------------------------------------------------------------------------
        | @Checkers
        |--------------------------------------------------------------------------
        */

        /**
         * Check invoice status
         * 
         * @param  string text
         * @param  validations
         */
        checkStatus(text, validations) {
            const pattern = new RegExp(`^(${validations.join('|')})$`);
            return pattern.test(text);
        },        

    }
}
</script>
