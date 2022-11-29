<template>
  <v-container px-0 pt-0  class="cartCheckout__con backgroundColor--white cstm-height-100">

    <!-- Frame 1 -->
    <v-layout row wrap mx-auto px-5 pt-5 align-center class="cart--buttonBelow">
      <v-flex xs6 mb-5>
        <h3 class="type-1">Dragonpay</h3>
      </v-flex>
      <v-flex xs6 mb-5 text-right>
        <h2 class="type-1">P 750.00</h2>
      </v-flex>
      <v-layout row wrap mx-auto px-5>
        <!-- COMPONENT_DRAGONPAY_DETAILS -->
        <v-flex xs4 mb-4>
          <h4>BDO</h4>
        </v-flex>
        <v-flex xs8 text-right mb-4>
          <p class="mb-0">Internet Banking ATM</p>
          <p class="mb-0">ATM</p>
        </v-flex>
        <!-- END_COMPONENT_DRAGONPAY_DETAILS -->
        <!-- DELETE_ME -->
        <v-flex xs4 mb-4>
          <h4>BPI</h4>
        </v-flex>
        <v-flex xs8 text-right mb-4>
          <p class="mb-0">ExpressOnline/Mobile</p>
        </v-flex>
        <v-flex xs4 mb-4>
          <h4>Metrobank</h4>
        </v-flex>
        <v-flex xs8 text-right mb-4>
          <p class="mb-0">Direct</p>
          <p class="mb-0">Over-the-Counter</p>
        </v-flex>
        <v-flex xs4 mb-4>
          <h4>Chinabank</h4>
        </v-flex>
        <v-flex xs8 text-right mb-4>
          <p class="mb-0">Online</p>
          <p class="mb-0">Over-the-Counter</p>
          <p class="mb-0">ATM</p>
        </v-flex>
        <v-flex xs4 mb-4>
          <h4>Unionbank</h4>
        </v-flex>
        <v-flex xs8 text-right mb-4>
          <p class="mb-0">EON</p>
          <p class="mb-0">Internet Banking</p>
          <p class="mb-0">ATM</p>
          <p class="mb-0">Over-the-Counter</p>
        </v-flex>
        <v-flex xs4 mb-4>
          <h4>RCBC</h4>
        </v-flex>
        <v-flex xs8 text-right mb-4>
          <p class="mb-0">AccessOne</p>
          <p class="mb-0">Over-the-Counter</p>
          <p class="mb-0">ATM</p>
        </v-flex>
        <v-flex xs4 mb-4>
          <h4>LBC</h4>
        </v-flex>
        <v-flex xs8 text-right mb-4>
          <p class="mb-0"><a href="" target="_blank" class="type-blue">See Branches</a></p>
        </v-flex>
        <v-flex xs4 mb-4>
          <h4>Bayad Center</h4>
        </v-flex>
        <v-flex xs8 text-right mb-4>
          <p class="mb-0"><a href="" target="_blank" class="type-blue">See Branches</a></p>
        </v-flex>
        <!-- END_DELETE_ME -->
      </v-layout>
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
    >
      Confirm Mode of Payment
    </v-btn>

    <!-- COMPONENT_DIALOG_CONFIRM -->
    <ConfirmationDialog
      :show="confirmDialog"
      message="Do you really want this mode of payment?"
      image="icons/cash.svg"
      @cancel="confirmDialog = false"
      @proceed="$PRXRouter().goTo('cartCheckoutSummary')"
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
  components: { ConfirmationDialog }
}
</script>
