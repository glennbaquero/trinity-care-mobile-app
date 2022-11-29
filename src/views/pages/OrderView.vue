<template>
  <v-container pa-0 class="orderHistory__con bg-lightGray">
    <!-- Frame 1 ('icons/processing.svg') -->
    <v-layout wrap xs-12 class="bg-lightGray pa-5">
      <v-flex xs12>
        <v-card class="px-2 py-3 order--card mb-4 frm-elevation cstm-border-radius">
          <v-layout row class="mx-auto">
            <v-flex xs4 class="text-center orderHistory__thumbCon active">
              <v-img :src="$PRXConfig().staticUrl('icons/processing.svg')" class="mx-auto orderHistory__thumb" width="55px" height="55px"></v-img>
              <small>Processed</small>
            </v-flex>
            <v-flex xs4 class="text-center orderHistory__thumbCon">
              <v-img :src="$PRXConfig().staticUrl('icons/processing.svg')" class="mx-auto orderHistory__thumb" width="55px" height="55px"></v-img>
              <small>Out for Delivery</small>
            </v-flex>
            <v-flex xs4 class="text-center orderHistory__thumbCon">
              <v-img :src="$PRXConfig().staticUrl('icons/processing.svg')" class="mx-auto orderHistory__thumb" width="55px" height="55px"></v-img>
              <small>Delivered</small>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="px-3 py-3 order--card mb-4 frm-elevation cstm-border-radius">
          <v-layout row class="mx-auto">
            <v-flex xs12 class="text-left">
              <p class="font-weight-bold">Proof of Payment</p>
                <div class="file--upload">
                  <input type="file" class="custom-file-input">
                </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>


      <v-flex xs-12>
        <p class="font-weight-bold">Order Summary</p>
        
        <!-- ORDER CARD SUMMARY (loop this card) -->
        <v-card class="px-3 py-3 order--card mb-4 frm-elevation cstm-border-radius">
          <v-layout row class="mx-auto">
            <v-flex xs4>
              <v-img :src="$PRXConfig().staticUrl('icons/processing.svg')" width="70px" height="90px"></v-img>
            </v-flex>
            <v-flex xs7>
              <p class="font-weight-bold mb-1">Cardio Pro (M)</p>
              <v-layout row wrap class="mx-auto">
                <v-flex xs6>
                  <h5 class="font-weight-normal">2 x P 3980</h5>
                </v-flex>
                <v-flex 6 class="text-right">
                  <h5 class="font-weight-bold">P 3980</h5>
                </v-flex>  
              </v-layout>
              
            </v-flex>
          </v-layout>
        </v-card>
        <!-- END OF ORDER CARD SUMMARY -->

        <!-- SAMPLE OF LOOPED CARDS (removed this once the card is looped) -->
        <v-card class="px-3 py-3 order--card mb-4 frm-elevation cstm-border-radius">
          <v-layout row class="mx-auto">
            <v-flex xs4>
              <v-img :src="$PRXConfig().staticUrl('icons/processing.svg')" width="70px" height="90px"></v-img>
            </v-flex>
            <v-flex xs7>
              <p class="font-weight-bold mb-1">Cardio Pro (M)</p>
              <v-layout row wrap class="mx-auto">
                <v-flex xs6>
                  <h5 class="font-weight-normal">2 x P 3980</h5>
                </v-flex>
                <v-flex 6 class="text-right">
                  <h5 class="font-weight-bold">P 3980</h5>
                </v-flex>  
              </v-layout>
              
            </v-flex>
          </v-layout>
        </v-card>

        <v-card class="px-3 py-3 order--card mb-4 frm-elevation cstm-border-radius">
          <v-layout row class="mx-auto">
            <v-flex xs4>
              <v-img :src="$PRXConfig().staticUrl('icons/processing.svg')" width="70px" height="90px"></v-img>
            </v-flex>
            <v-flex xs7>
              <p class="font-weight-bold mb-1">Cardio Pro (M)</p>
              <v-layout row wrap class="mx-auto">
                <v-flex xs6>
                  <h5 class="font-weight-normal">2 x P 3980</h5>
                </v-flex>
                <v-flex 6 class="text-right">
                  <h5 class="font-weight-bold">P 3980</h5>
                </v-flex>  
              </v-layout>
              
            </v-flex>
          </v-layout>
        </v-card>
        <!-- END OF SAMPLE CARDS -->
      </v-flex>
    </v-layout>

    <v-layout wrap class="mx-auto mb-5 frm-elevation bg-white">
      <v-flex xs12 class="pa-5">
        <p class="font-weight-bold">Deliver to</p>
        <v-layout wrap class="mx-auto pl-3">
          <v-flex xs12>
            <h5>Sisa Longalong</h5>
            <h5 class="font-weight-normal">sisalongalong@gmail.com</h5>  
          </v-flex>
          <v-flex xs6>
            <h5 class="font-weight-normal">Mobile #</h5>
          </v-flex>
          <v-flex xs6 class="text-right">
            <h5 class="font-weight-normal">N/A</h5>
          </v-flex>
          
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout wrap class="mx-auto mb-8 frm-elevation bg-white">
      <v-flex xs12 class="pa-5">
        <p class="font-weight-bold">Deliver to</p>
        <v-layout wrap class="mx-auto pl-3">
          <v-flex xs6>
            <h5 class="font-weight-normal">Unit & Floor #</h5>
          </v-flex>
          <v-flex xs6 class="text-right">
            <h5 class="font-weight-normal">Unit 426</h5>
          </v-flex>
        </v-layout>
        <v-layout wrap class="mx-auto pl-3">
          <v-flex xs6>
            <h5 class="font-weight-normal">Street</h5>
          </v-flex>
          <v-flex xs6 class="text-right">
            <h5 class="font-weight-normal">T Lane</h5>
          </v-flex>
        </v-layout>
        <v-layout wrap class="mx-auto pl-3">
          <v-flex xs6>
            <h5 class="font-weight-normal">BLDG/Subdv</h5>
          </v-flex>
          <v-flex xs6 class="text-right">
            <h5 class="font-weight-normal">N/A</h5>
          </v-flex>
        </v-layout>
        <v-layout wrap class="mx-auto pl-3">
          <v-flex xs6>
            <h5 class="font-weight-normal">Region</h5>
          </v-flex>
          <v-flex xs6 class="text-right">
            <h5 class="font-weight-normal">NCR National Capital Region</h5>
          </v-flex>
        </v-layout>
        <v-layout wrap class="mx-auto pl-3">
          <v-flex xs6>
            <h5 class="font-weight-normal">Province</h5>
          </v-flex>
          <v-flex xs6 class="text-right">
            <h5 class="font-weight-normal">Albay</h5>
          </v-flex>
        </v-layout>
        <v-layout wrap class="mx-auto pl-3">
          <v-flex xs6>
            <h5 class="font-weight-normal">City</h5>
          </v-flex>
          <v-flex xs6 class="text-right">
            <h5 class="font-weight-normal">Legazpi</h5>
          </v-flex>
        </v-layout>
        <v-layout wrap class="mx-auto pl-3">
          <v-flex xs6>
            <h5 class="font-weight-normal">Zip Code</h5>
          </v-flex>
          <v-flex xs6 class="text-right">
            <h5 class="font-weight-normal">4500</h5>
          </v-flex>
        </v-layout>
        <v-layout wrap class="mx-auto pl-3">
          <v-flex xs6>
            <h5 class="font-weight-normal">landmark</h5>
          </v-flex>
          <v-flex xs6 class="text-right">
            <h5 class="font-weight-normal"></h5>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>      
  </v-container>
</template>


<script>
  import moment from 'moment';

  export default {
    data() {
      return {
        deposit_slip: null,
        loading: false,
        confirmDialog: false
      }
    },

    computed: {
      invoice() {
        const id = this.$store.getters['user/selectedInvoice'];
        const invoices = this.$store.getters['api/invoices'];

        return invoices.find(invoice => invoice.id === id);
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
    
    mounted() {
      this.$store.commit('setTopNav/set', 'Orders');
      this.deposit_slip = this.$PRXConfig().api.url+'/storage/'+this.invoice.deposit_slip_path;
    },

    methods: {
      parseTime(time) {
        return moment(time).format('h:mm a');
      },
      parseDate(date) {
        return moment(date).format('MMMM DD, YYYY');
      },
      checkStatus(text, validations) {
        const pattern = new RegExp(`^(${validations.join('|')})$`);
        return pattern.test(text);
      },
      upload(e) {
        // this.deposit_slip = e
        var files = e.target.files || e.dataTransfer.files;
        // console.log(e.target.files[0]);

        var data = new FormData();

        if (!files.length) {
          return;
        }

        this.deposit_slip = files[0];

        data.append('deposit_slip_path', files[0]);
        data.append('id', this.invoice.id);

        axios.post(this.routes['api.care.upload.deposit'], data)
          .then(response => { })
      },

      goToProduct(product) {
        this.$store.commit('selectedProduct/set', product);
        this.$PRXRouter().goTo('productView')
      }
    }
  }
</script>
