<template>
  <v-container px-0 pt-0  class="reward__con">
    <v-layout row wrap mx-auto px-5 pt-5>
      <v-flex xs5 mb-4 class="button__icon--left align-self-center">
        <v-btn class="button cstm-button-radius text-small type-shdw-type2" width="150" color="#FCCA46" dark @click.stop="drawer = !drawer">
          <v-img class="mr-3" :src="$PRXConfig().staticUrl('icons/sort2.svg')" max-width="25" width="25" height="20" contain></v-img>
          Sort by
        </v-btn>
      </v-flex>
      <v-flex xs7 mb-4 pl-8>
        <v-list class="cstm-bg-transparent py-0">
          <v-list-item class="frm-elevation backgroundColor--white cstm-border-radius-5 py-0">
            <v-list-item-avatar height="20px" min-width="20px" width="20px" class="mr-2">
              <v-img :src="profileImage" class="mx-auto" width="20px" height="20px"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title><h4 class="type-gray">Total</h4></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-subtitle><h3>{{ totalPoints }}</h3></v-list-item-subtitle>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>
      <v-flex v-if="!invoices.length" xs12>
        <EmptyFrame message="You have no redeemed rewards yet" />
      </v-flex>
      <v-flex v-else xs12 mb-2>
        <v-list class="cstm-bg-transparent">
          <!-- COMPONENT_LIST_REWARDS -->
            <v-list-item v-for="(item, i) in invoices"  :key="i" class="mb-2 frm-elevation backgroundColor--white cstm-border-radius-5 px-6 py-3 mb-4">
              <v-list-item-content>
                <v-list-item-title><h3>{{ JSON.parse(item.data).name }}</h3></v-list-item-title>
                <v-list-item-title><h5 class="type-2">{{ item.invoice_number }}</h5></v-list-item-title>
                <v-list-item-title><h5 class="type-2">{{ item.created_at }}</h5></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-subtitle><h2 class="type-1">{{ JSON.parse(item.data).client_points * item.quantity }}</h2></v-list-item-subtitle>
              </v-list-item-action>
            </v-list-item>
          <!-- END_COMPONENT_LIST_REWARDS -->
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout row wrap mx-auto pa-5>
    </v-layout>

    <!-- Filter View -->
    <v-navigation-drawer v-model="drawer" fixed temporary right class="filter__view" width="100%">
      <v-list-item class="px-1 py-2 frm-elevation backgroundColor--white">
        <v-btn @click.stop="drawer = !drawer" icon readonly>
            <v-icon>fa-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="pa-0">
        <v-container pa-0 class="cstm-height-100">
          <v-layout row wrap mx-auto pa-5 class="filter__viewList">
            <v-flex xs12 mb-4>
              <h3 class="type-1">Sort By</h3>
            </v-flex>
            <!-- COMPONENT_FILTER_LIST -->
            <v-flex xs11 mb-3 align-self-center>
              <p class="mb-0">Highest Points</p>
            </v-flex>
            <v-flex xs1 mb-3>
              <v-checkbox
                v-model="filter"
                height="0"
                color="#DA8924"
                value="0"
                @change="filterRewards"
                mt-0
              ></v-checkbox>
            </v-flex>
            <!-- END_COMPONENT_FILTER_LIST -->
            <!-- DELETE_ME -->
            <v-flex xs11 mb-3 align-self-center>
              <p class="mb-0">Lowest Points</p>
            </v-flex>
            <v-flex xs1 mb-3>
              <v-checkbox
                v-model="filter"
                height="0"
                color="#DA8924"
                value="1"
                @change="filterRewards"
                mt-0
              ></v-checkbox>
            </v-flex>
            <v-flex xs11 mb-3 align-self-center>
              <p class="mb-0">Recent</p>
            </v-flex>
            <v-flex xs1 mb-3>
              <v-checkbox
                v-model="filter"
                height="0"
                color="#DA8924"
                value="2"
                @change="filterRewards"
                mt-0
              ></v-checkbox>
            </v-flex>
            <!-- DELETE_ME -->
          </v-layout>
          <v-layout row wrap mx-auto pa-5 mb-12 class="filter__viewBtn">
            <v-flex xs12>
              <v-btn class="button cstm-button-radius text-small cstm-width type-gradient-l-r v-btn--large" depressed large dark>Display Result</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-list-item>
    </v-navigation-drawer>
    <v-dialog
      v-model="loading"
      persistent
      width="300"
    >
      <v-card
        color="#FABF24"
        dark
      >
        <v-card-text>
          Please wait
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import EmptyFrame from '@/components/substitute/EmptyFrame';

export default {
  data () {
    return {
      drawer: null,
      loading: false,
      // merchants: [],
      merchant_items: [],
      redeems: [],
      filter: null,
      displayRedeems: [],
      invoices: []
    }
  },

  mounted() {
    this.$store.commit('setTopNav/set', 'Points Earned');
    this.invoices = this.invoiceItems;
    // this.getRedeem();
  },

  components: { EmptyFrame }, 

  computed: {
    points() {
      return this.getItem('points');
    },
    totalPoints() {
      return this.getItem('points');
    },
    merchants() {
      return this.$store.state.merchants.items;
    },

    invoiceItems() {
      var invoices = this.$store.getters['api/invoices'];
      var invoiceItems = [];

      invoices.forEach((invoice) => {
        invoice.products.forEach((product) => {
          invoiceItems.push(product);
        })
      });

      return invoiceItems;
    },

    getInvoices() {
      return this.$store.getters['api/invoices'];
    },

    profileImage() {
      const localImage = JSON.parse(window.localStorage.getItem('user')).image_path;
      const storeImage = this.$store.getters['user/info'].image_path;

      if (!storeImage && !localImage) {
        return this.$PRXConfig().staticUrl('images/default.png');
      }
      else {
        return storeImage || localImage;
      }
    },

  },

  methods: {
    redeemableRewards() {
      this.loading = true;
      this.merchants.forEach((merchant) => {
        var data = {
          merchant_id: merchant.merchant_id
        }
        axios.post(this.routes['api.care.merchant.details'], data)
          .then(response => {
            var denominations = response.data.merchant.denominations;

            denominations.forEach((denomination) => {
              if(denomination.price <= this.totalPoints) {
                this.merchant_items.push(denomination)
              }
            })

            this.loading = false;
          })
      })
    },

    getRedeem() {
      this.loading = true;
      axios.post(this.routes['api.care.history.redeem'])
        .then(response => {
          this.redeems = response.data.redeems;
          this.displayRedeems = response.data.redeems;
          this.loading = false;
        })
    },

    filterRewards() {
      if(this.filter == 0) {
        this.invoices = this.invoiceItems.slice().sort(function(a, b) {
          var sideB = parseInt(b.quantity) * JSON.parse(b.data).client_points;
          var sideA = parseInt(a.quantity)  * JSON.parse(a.data).client_points;
          return sideB - sideA;
        });
      } else if(this.filter == 1) {
        this.invoices = this.invoiceItems.slice().sort(function(a, b) {
          var sideB = parseInt(b.quantity) * JSON.parse(b.data).client_points;
          var sideA = parseInt(a.quantity)  * JSON.parse(a.data).client_points;
          return sideA - sideB;
        });
      } else {
        this.invoices = this.invoiceItems.sort( ( a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
      }
    },

    parseDate(date) {
      return moment(date).format('MMMM DD, YYYY');
    },
  }
}
</script>
