<template>
  <v-container px-0 pt-0  class="cartCheckout__con backgroundColor--white cstm-height-100">

    <!-- Frame 1 -->
    <v-layout row wrap mx-auto px-5 pt-5 align-center class="cart--buttonBelow">
      <v-flex xs6 mb-5>
        <h3 class="type-1">Bank Deposit</h3>
      </v-flex>
      <v-flex xs6 mb-5 text-right>
        <h2 class="type-1">P {{ grandTotal }}</h2>
      </v-flex>
      <v-flex xs12 mb-5>
        <h3 class="type-1">Bank details to deposit</h3>
      </v-flex>

      <!-- COMPONENT_BANK_DETAILS -->
      <v-layout row wrap mx-auto px-5 my-3 v-for="(bankDetail, i) in bankDetails" :key="i">
        <v-flex xs12 mb-4>
          <h4>{{ bankDetail.branch }}</h4>
        </v-flex>
        <v-flex xs4 mb-4>
          <p class="mb-0">Account No.</p>
        </v-flex>
        <v-flex xs8 text-right mb-4>
          <p class="mb-0 type-darkerGray">{{ bankDetail.account_number }}</p>
        </v-flex>
        <v-flex xs4 mb-4>
          <p class="mb-0">Account Name</p>
        </v-flex>
        <v-flex xs8 text-right mb-4>
          <p class="mb-0 type-darkerGray">{{ bankDetail.name }}</p>
        </v-flex>
      </v-layout>
      <!-- END_COMPONENT_BANK_DETAILS -->
    </v-layout>

    <v-btn
      class="button cartCheckout__checkoutConBtn"
      height="60px"
      depressed
      block
      large
      color="#FABF24"
      dark
      @click="confirmDialog = true"
      style="margin-left: 0px"
    >
      Confirm Mode of Payment
    </v-btn>

    <!-- COMPONENT_DIALOG_CONFIRM -->
    <ConfirmationDialog
      :show="confirmDialog"
      message="Do you really want this mode of payment?"
      image="icons/cash.svg"
      @cancel="confirmDialog = false"
      @proceed="proceed"
    />
    <!-- END_COMPONENT_DIALOG_CONFIRM -->
  </v-container>
</template>

<script>
import ConfirmationDialog from '@/components/ConfirmationDialog';

export default {
  data () {
    return {
      confirmDialog: false
    }
  },
  components: { ConfirmationDialog },
  
  computed: {
    bankDetails() {
      return this.getItem('bankDetails');
    },
    grandTotal() {
      return this.$store.state.user.grandTotal;
    }
  },

  mounted() {
    this.$store.commit('setTopNav/set', 'Bank Deposit')
  },

  methods: {
    proceed() {
      this.$store.commit('user/setData', { name: 'paymentMethod', payload: 4 });
      this.$PRXRouter().goTo('cartCheckoutSummary');
    },
  }
}
</script>
