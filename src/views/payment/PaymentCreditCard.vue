<template>
  <v-container px-0 pt-0  class="cartCheckout__con backgroundColor--white cstm-height-100">

    <!-- Frame 1 -->
    <v-layout row wrap mx-auto px-5 pt-5 align-center>
      <v-flex xs6 mb-5>
        <h3 class="type-1">Visa / Mastercard</h3>
      </v-flex>
      <v-flex xs6 mb-5 text-right>
        <h2 class="type-1">P 750.00</h2>
      </v-flex>
    </v-layout>

    <v-layout row wrap mx-auto px-10 py-5 class="cart--buttonBelow">
      <v-flex xs12>
        <h5 class="type-gray">Card Number</h5>
      </v-flex>
      <v-flex xs12 mb-4>
        <v-text-field
          v-model="cardNumber"
          placeholder="0000 - XXXX - XXXX - XX"
          color="#FABF24"
          class="form__input--text"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <h5 class="type-gray">Account Name</h5>
      </v-flex>
      <v-flex xs12 mb-4>
        <v-text-field
          v-model="accName"
          placeholder="type here..."
          color="#FABF24"
          class="form__input--text"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <h5 class="type-gray">Expiration Date</h5>
      </v-flex>
      <v-flex xs6 mb-4 pr-6 class="cstm-divider">
        <v-select
          v-model="month"
          placeholder="MM"
          color="#FABF24"
          class="form__input--text"
        ></v-select>
      </v-flex>
      <v-flex xs6 mb-4 pl-6>
        <v-select
          v-model="Year"
          placeholder="YYYY"
          color="#FABF24"
          class="form__input--text"
        ></v-select>
      </v-flex>
      <v-flex xs12>
        <h5 class="type-gray">CVC Code</h5>
      </v-flex>
      <v-flex xs6 mb-4 pr-6>
        <v-text-field
          v-model="month"
          placeholder="3 digit Number"
          color="#FABF24"
          class="form__input--text"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 mb-4 align-self-center>
        <v-layout row wrap mx-auto>
          <v-flex xs6 text-left>
            <v-img :src="$PRXConfig().staticUrl('icons/card.png')" class="mr-auto" width="45px" height="25px" contain></v-img>
          </v-flex>
          <v-flex xs6 text-right class="cstm-info">
            <i class="fas fa-info-circle"></i>
          </v-flex>
        </v-layout>
      </v-flex>
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
      Pay Now
    </v-btn>

    <!-- COMPONENT_DIALOG_UPDATE -->
    <ConfirmationDialog
      :show="confirmDialog"
      message="Are you sure to pay the order now?"
      image="icons/black-and-white-credit-cards.svg"
      @cancel="confirmDialog = false"
      @proceed="$PRXRouter().goTo('cartCheckoutSummary')"
    />
    <!-- <v-dialog v-model="confirmDialog" persistent max-width="290">
      <v-card class="cstm-border-radius pa-5 dialog__con">
        <v-img :src="$PRXConfig().staticUrl('icons/black-and-white-credit-cards.svg')" class="mx-auto text-center" width="45px" height="45px"></v-img>
        <v-card-title class="px-7 py-5 text-center justify-center">
          <h4 class="mb-0">Are you sure to pay the order now?</h4>
        </v-card-title>
        <v-card-actions class="pa-0 justify-center">
          <v-btn
            class="button cstm-button-radius v-btn--small type-shdw-gray"
            color="#A8A8A8"
            dark
            @click="confirmDialog = false"
            min-width="100px">
            No, Cancel
          </v-btn>

          <v-btn
            class="button cstm-button-radius v-btn--small"
            color="#FABF24"
            dark
            @click="$PRXRouter().goTo('cartCheckoutSummary')"
            min-width="100px">
            Yes, Pay Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <!-- END_COMPONENT_DIALOG_UPDATE -->
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
