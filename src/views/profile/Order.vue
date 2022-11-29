<template>
<v-container>
    <v-layout pa-5 wrap>
        <v-flex xs12 mb-2 d-flex align-center justify-space-between>
            <h3>Ongoing Orders</h3>
            <h5 
                v-if="ongoing.length"
                class="color-doc-primary2" 
                @click="$PRXRouter().goTo('ongoingOrders')">
                View All
            </h5>
        </v-flex>
        <template v-if="!ongoing.length">
            <v-flex xs12 text-center my-10>
                <p class="general__text color-gray mb-0">No ongoing orders.</p>
            </v-flex>
        </template>
        <v-flex v-else xs12>
            <v-list two-line class="cstm-bg-transparent" v-for="(order, oi) in ongoing" :key="oi">
                <v-card class="pa-3 order--card cstm-border-radius frm-elevation"  
                @click="selectInvoice(order)">
                    <v-layout row class="mx-auto">
                        <v-flex xs4 py-3>
                           <v-img   :lazy-src="order.image_path"
                                    :src="order.image_path" height="90" contain>
                            </v-img>   
                        </v-flex>

                        <v-flex xs8>
                            <v-card-text class="text-left pb-0">
                                <p class="font-weight-bold type-black mb-0">Order No.{{ order.invoice_number }}</p>
                                <h5 class="font-weight-regular type-gray mb-0">Placed on: {{ renderDate(order.created_at) }}</h5>
                                <h5 class="font-weight-bold type-black">P {{ currencyFormatter(order.grand_total) }}</h5>
                            </v-card-text>  
                        </v-flex>
                    </v-layout> 

                    <template v-if="(order.payment_method == 4 || order.payment_method == 6) && !order.deposit_slip_path">
                        <v-layout row class="mx-auto py-4">
                            <v-flex xs12 pa-2>
                                <v-divider></v-divider>  
                            </v-flex>
                            <v-flex xs12 pa-2>
                                <h5 class="font-weight-regular mb-0"><span class="font-weight-bold color-light-green">Note:</span> upload your proof of payment to continue processing your order.</h5>
                            </v-flex>
                        </v-layout> 
                    </template>
                </v-card>
            </v-list>
        </v-flex>

        <v-flex v-if="ongoing > 2" xs12 text-center>
            <h5 class="color-doc-primary2">View All</h5>
        </v-flex> 

    </v-layout>

    <v-layout pa-5 wrap>
        <v-flex xs12 mb-2 d-flex align-center justify-space-between>
            <h3>Cancelled Orders</h3>
            <h5 
                v-if="cancelled.length"
                class="color-doc-primary2" 
                @click="$PRXRouter().goTo('cancelledOrders')">
                View All
            </h5>
        </v-flex>

        <template v-if="!cancelled.length">
            <v-flex xs12 text-center my-10>
                <p class="general__text color-gray mb-0">No cancelled orders.</p>
            </v-flex>
        </template>

        <v-flex v-else xs12>
            <v-list two-line class="cstm-bg-transparent" v-for="(order, oi) in cancelled" :key="oi">
                <v-card class="pa-3 order--card cstm-border-radius frm-elevation"  
                @click="selectInvoice(order)">
                    <v-layout row class="mx-auto">
                        <v-flex xs4 py-3>
                            <v-img  :lazy-src="order.image_path"
                                    :src="order.image_path" height="90" contain>
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="#3B823E"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>   
                        </v-flex>

                        <v-flex xs8>
                            <v-card-text class="text-left pb-0">
                                <p class="font-weight-bold type-black mb-0">Order No.{{ order.invoice_number }}</p>
                                <h5 class="font-weight-regular type-gray mb-0">Placed on: {{ renderDate(order.created_at) }}</h5>
                                <h5 class="font-weight-bold type-black">P {{ currencyFormatter(order.grand_total) }}</h5>
                            </v-card-text>  
                        </v-flex>
                    </v-layout> 
                </v-card>
            </v-list>
        </v-flex>

        <v-flex v-if="cancelled > 2" xs12 text-center>
            <h5 class="color-doc-primary2">View All</h5>
        </v-flex> 

    </v-layout>

        <!-- COMPLETED ORDERS -->
    <v-layout pa-5 wrap>
        <v-flex xs12 mb-2 d-flex align-items justify-space-between>
            <h3>Completed Orders</h3>
            <h5 v-if="completed.length" class="color-doc-primary2" @click="$PRXRouter().goTo('completedOrders')">View All</h5>
        </v-flex>

        <template v-if="!completed.length">
            <v-flex xs12 text-center my-10>
                <p class="general__text color-gray mb-0">No completed orders.</p>
            </v-flex>
        </template>

        <v-flex v-else xs12 mb-2>
            <v-list two-line class="cstm-bg-transparent">
                <v-flex xs12 mb-2 v-for="(order, ci) in completed" :key="ci">
                    <!-- COMPLETED CARD ORDER Note: add this card inside the v-else -->
                    <v-card class="pa-3 order--card cstm-border-radius frm-elevation" @click="selectInvoice(order)">
                        <v-layout row class="mx-auto">
                            <v-flex xs4 py-3>
                                <v-img 
                                    :lazy-src="order.image_path" 
                                    :src="order.image_path" height="90" contain>
                                </v-img>
                            </v-flex>
                            <v-flex xs8>
                                <v-card-text class="text-left pb-0">
                                    <p class="font-weight-bold type-black mb-0">Order No.{{ order.invoice_number }}</p>
                                    <h5 class="font-weight-regular type-gray mb-0">Placed on: {{ renderDate(order.created_at) }}</h5>
                                    <h5 class="font-weight-bold type-black">P {{ currencyFormatter(order.grand_total) }}</h5>
                                </v-card-text>   
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-list>
        </v-flex>

        <v-flex v-if="completed > 2" xs12 text-center>
            <h5 class="color-doc-primary2">View All</h5>
        </v-flex>
    </v-layout>

    <Loader
    ref="loader"
    ></Loader>

</v-container>
</template>

<script>
    
import Loader from '../../components/Loader.vue';

export default {

    data () {
        return {
            ongoing : [],
            completed : [],
            cancelled: [],
            loading : true,
        }
    },

    components: {
        Loader
    },

    mounted() {
        return new Promise((resolve, reject) => {
            setTimeout(() =>{
                this.init();
                resolve();
            }, 500);
        });
    },

    methods: {

        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */            

        init() {
            this.$refs['loader'].show();
            axios.post(this.routes['api.care.profile.orders.fetch'])
            .then((response) => {
                this.$refs['loader'].hide();
                if(response.data){
                    var invoices = response.data.invoices;
                    this.ongoing = invoices.filter(invoice => !invoice.completed && !invoice.cancelled).slice(0, 2);
                    this.cancelled = invoices.filter(invoice => !invoice.completed && invoice.cancelled).slice(0, 2);                   
                    this.completed = invoices.filter(invoice => invoice.completed).slice(0, 2);
                }
            }).catch((error)=>{
                this.$refs['loader'].hide();
                console.log(error);
            });
        },

        selectInvoice(invoice) {
            this.$store.commit('user/setData', { name: 'selectedInvoice', payload: invoice });
            this.$PRXRouter().goTo('orderHistory');
        },

        /*
        |--------------------------------------------------------------------------
        | @Render
        |--------------------------------------------------------------------------
        */
        renderDate(date) {
            return moment(date).format('MMMM DD, YYYY');
        },

    }
}
</script>
