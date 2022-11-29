<template>
  <!-- Filter View -->
    <v-navigation-drawer
      v-model="payment"
      fixed
      left
      width="100%"
      touchless
    >
      <v-card class="consultation__historyCon">
        <v-toolbar class="consultation__historyTitle type-shdw-gray">
          <v-btn icon dark @click="payment = false; $emit('paymentClose')">
            <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
          </v-btn>
          <v-toolbar-title>Payment</v-toolbar-title>
        </v-toolbar>
      </v-card>
      <v-container class="pa-4">
        <v-layout row wrap mx-auto class="pb-5">
          <v-flex xs12>
            <v-card class="mb-5 py-5 px-7">
              <h3 class="font-weight-normal type-black mb-5">Top up Wallet</h3>
              <p class="mb-2"><span class="font-weight-bold">Current Balance</span> {{ currentCredit }} credits</p>
              <p class="mb-2"><span class="font-weight-bold">Add Credits</span> + {{ selectedPackage.credits }} credits</p>
              <p class="mb-2"><span class="font-weight-bold">Amount</span> P {{ selectedPackage.price }}</p>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card class="py-5 px-7 payment--option">
              <h3 class="font-weight-normal type-black mb-5">Payment Method</h3>
              <v-radio-group v-model="paymentMethod" :mandatory="false">
                <v-radio label="Paynamics" color="black" value="paynamics"></v-radio>
              </v-radio-group>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout row wrap mx-auto>
          <v-flex xs12 v-if="hasPaymentMethod">
          <v-btn width="100%" class="button type-green type-1 text-small py-2" @click="payAndContinue">Pay and Continue</v-btn>
          </v-flex>
        </v-layout>  
      </v-container>
      

      <Loader
      ref="loader"
      ></Loader>
      
    </v-navigation-drawer>
</template>

<script>
  import Loader from '../../components/Loader.vue'

  export default {
  
    props: {
       show: Boolean
    },

    components: {
        Loader
    },

    data () {
      return {
        paymentMethod: false,
        payment: false,
        loading: false
      }
    },


     watch: {
       show(val) { 
          this.payment = val
       }
    },

    computed: {
      hasPaymentMethod() {
        return this.paymentMethod == 'paynamics';
      },
      selectedPackage() {
        return this.$parent.$parent.selectedPackage
      },

      currentCredit() {
        return this.$parent.$parent.currentCredit;
      }
    },

    methods: {

      payAndContinue() {
        this.$refs['loader'].show();
        const data = new FormData();
        data.append('credit_package_id', this.selectedPackage.id);

        axios.post(this.routes['api.care.credit-package.checkout'], data)
          .then(response => {
            // this.$PRXRouter().goTo('home');
            this.processPaynamics(response.data.form);
          })
      },
      
      processPaynamics(form) {
        var returnUrl = this.$PRXConfig().api.url+"/admin/credit-package/checkout/paynamicsReturn";
        var cancelUrl = this.$PRXConfig().api.url+"/admin/credit-package/checkout/paynamicsCancel";

        this.$refs['loader'].hide();
        const pageContentUrl = `data:text/html;base64,${btoa(form)}`;
        const browser = cordova.InAppBrowser.open(pageContentUrl, '_blank', 'hidden=no,location=no,clearsessioncache=yes,clearcache=yes');

        browser.addEventListener('loadstart', (event) => {
          if (event.url.match(returnUrl) || event.url.match(cancelUrl)) {
            browser.close();
            axios.get(this.routes['api.care.credit-package.return'])
              .then(response => {
                console.log(response.data);
                this.payment = false;

                if(!event.url.match(cancelUrl)) {
                  this.$emit('completed');
                }
              });
          }

          browser.executeSript({ code: form }, (html) => {
            browser.close();
            this.payment = false;
            if(!event.url.match(returnUrl)) {
              this.$emit('completed');
            }
          });
        });
      },
    },
  }
</script>