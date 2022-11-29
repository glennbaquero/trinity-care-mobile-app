<template>
    <v-container fill-height pa-0 class="backgroundColor--white product__con">
        <v-layout row wrap mx-0 align-content-start>
            <v-img :src="product.full_image" height="250" contain>
                <v-img
                v-if="product.prescriptionable"
                :src="$PRXConfig().staticUrl('icons/rx.svg')"
                class="mx-auto product__prxLogo inner"
                width="40px"
                height="40px"
                contain>
            </v-img>
        </v-img>
        <v-container column align-center justify-space-between py-8 px-6 pb-12 mb-8 class="article__con">
            <v-layout row wrap mx-auto>
                <v-flex xs12 mb-4>
                    <h2 class="trigger">{{ product.name }}</h2>
                </v-flex>
                <template v-if="product.description">
                    <h3 class="type-lighterGray trigger">Description</h3>		  
                    <v-flex xs12 mb-12 class="general__text" v-html="product.description"></v-flex>
                </template>

                <template v-if="product.ingredients">
                    <h3 class="type-lighterGray trigger">Ingredients</h3>		  
                    <v-flex xs12 mb-12 class="general__text" v-html="product.ingredients"></v-flex>
                </template>

                <template v-if="product.nutritional_facts">
                    <h3 class="type-lighterGray trigger">Nutrional Facts</h3>		  
                    <v-flex xs12 mb-12 class="general__text" v-html="product.nutritional_facts"></v-flex>
                </template>

                <template v-if="product.directions">
                    <div style="margin-bottom: 20%;">
                        <h3 class="type-lighterGray trigger">Directions</h3>		  
                        <v-flex xs12 class="general__text" v-html="product.directions"></v-flex>
                    </div>
                </template>		  

            </v-layout>
        </v-container>

        <v-flex
        xs12 class="product__addCon product__addInnerCon">
            <v-layout row wrap mx-auto align-center>
                <v-flex xs6 pl-5>
                    <div class="d-flex align-center">
                        <div class="frm-btn">                 
                            <v-btn
                            :disabled="product.stocks <= 0"
                            icon small @click="decrementQuantity">
                                <v-icon color="#3B823E">fa fa-minus</v-icon>
                            </v-btn>
                        </div>
                        <p class="mb-0 mx-2 font-weight-semibold">{{ quantity }}</p>
                        <div class="frm-btn">
                            <v-btn 
                            :disabled="product.stocks <= 0"
                            icon small @click="incrementQuantity">
                                <v-icon color="#3B823E">fa fa-plus</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </v-flex>
                <v-flex xs6 pr-5 text-right>
                    <h2 class="text-darkgreen">P {{ totalPrice }}</h2>
                </v-flex>
                <v-flex xs12 px-5 my-4>
                    <div class="frm-btn">
                        <v-btn
                        class="btn--green"
                        block
                        rounded
                        elevation="elevation-0"
                        min-height="60"
                        :color="product.stocks ? '#FABF24' : '#CFCFCF'"
                        :dark="product.stocks > 0"
                        :disabled="product.stocks <= 0"
                        @click="addToCart"
                        >
                        {{ product.stocks > 0 ? 'Add to Cart' : 'Out of stock' }}
                        </v-btn>
                    </div>
                </v-flex>
                
            </v-layout>
        </v-flex>

    </v-layout>

    <ConfirmationDialog
    :show="successDialog"
    message="Product succesfully added to cart"
    image="icons/shopping-purse-icon-check.svg"
    left-button-text="Go to cart"
    right-button-text="Continue shopping"
    @cancel="$PRXRouter().goTo('cartSummary')"
    @proceed="$PRXRouter().goBack()"
    @close="successDialog = false"
    />

    <ErrorDialog
    :show="errorDialog"
    :message="errorMessage"
    @close="errorDialog = false"
    />

    <Loader
      ref="loader"
    ></Loader>
    
    </v-container>

</template>

<script>
import ConfirmationDialog from '@/components/ConfirmationDialog';
import ErrorDialog from '@/components/ErrorDialog';
import Loader from '@/components/Loader.vue';

export default {

    components: { ConfirmationDialog, ErrorDialog, Loader, },

    computed: {

        renderFormattedPrice() {
            if(this.product.price) {
                return this.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },

        totalPrice() {
            let product,
            total = 0;	
            product = this.product;
            total = this.quantity * parseInt(product.price);
            return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        product() {
            const product = this.$store.state.selectedProduct.item;
            return product;
        },
    },

    data () {
        return {
            scanDialog: false,
            successDialog: false,
            errorDialog: false,
            errorMessage: null,
            loading: false,
            quantity: 1,
            quantityForm: false,
        }
    },

    mounted () {
        this.$store.commit('setTopNav/set', this.product.name);
    },

    methods: {

        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        /**
        * Add item to cart
        * 
        */
        addToCart() {

           this.$refs['loader'].show();

            const data = {
                product_id: this.product.id,
                quantity: this.quantity,
                parent_id: this.product.parent_id
            };

            axios.post(this.routes['api.care.cart.add'], data)
            .then(response => {

                const { id, bought, ...request } = this.product;
                const payload = { bought: true, ...request };

                if (response.data.new_item) {
                    const body = {
                        id: response.data.new_item.id,
                        bought: this.product.bought,
                        price: this.product.price,
                        product_price: this.product.price,
                        product_name: this.product.name,
                        quantity: this.product.stocks,
                        image_path: response.data.new_item.full_image,
                        total_per_item: this.product.price * response.data.new_item.quantity
                    };
                    this.$store.commit('api/add', { key: 'cartItems', payload: body });
                }
                this.$refs['loader'].hide();

                this.$store.commit('api/update', { key: 'products', id: this.product.id, payload });
                this.closeQuantityForm();
                this.$store.commit('cart/set', response.data.total_cart_items);
                this.quantity = 1;
                this.successDialog = true;
            }).catch((err) => {
                this.$refs['loader'].hide();              
                console.log(err);
            })
        },

        /**
        * Increment quantity
        * 
        */
        incrementQuantity() {
            this.quantity += 1;
        },

        /**
        * Decrement quantity
        * 
        */
        decrementQuantity() {
            if (this.quantity != 1) {
                this.quantity -= 1;
            }
        },

        /**
        * Set status of quantity form
        * 
        */
        closeQuantityForm() {
            this.quantityForm = false;
        },
    }
}
</script>
