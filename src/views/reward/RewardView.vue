<template>
  <v-container px-0 pt-0  class="rewardView__con">
    <v-layout row wrap mx-auto px-5 pt-5>
      <v-flex xs12 mb-4>
        <h3 class="type-1">Redeemable Rewards</h3>
      </v-flex>
      <v-flex xs12 mb-4 v-for="(reward, ri) in rewards" :key="ri" @click="showDialog(reward)">
        <v-card flat tile class="cstm-border-radius frm-elevation">
          <v-img :src="reward.logo_url" height="150"></v-img>
          <v-card-text>
            <v-layout row wrap mx-auto>
              <v-flex xs6>
                <!-- <h2>P {{ reward.price }}</h2> -->
              </v-flex>
              <v-flex xs6 text-right>
                <v-img :src="$PRXConfig().staticUrl('icons/heart-2.svg')" height="20" contain position="right" class="rewardView__icon"></v-img>
                <h3 class="type-1 rewardView__points ml-3">{{ reward.value }} Points</h3>
              </v-flex>
              <v-flex xs12>
                <p class="font-italic mb-0">For use of any product/service purchase</p>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- COMPONENT_DIALOG_CONFIRM -->
    <ConfirmationDialog
      :show="confirmDialog"
      message="Are you sure you want to redeem this reward?"
      image="icons/help-web-button-2.svg"
      @cancel="confirmDialog = false"
      @proceed="redeemReward"
    />
    <!-- <v-dialog v-model="confirmDialog" max-width="290">
      <v-card class="cstm-border-radius pa-5 py-10 dialog__con">
        <v-img :src="$PRXConfig().staticUrl('icons/help-web-button-2.svg')" class="mx-auto text-center" width="70px" height="70px"></v-img>
        <v-card-title class="px-7 pt-3 pb-32 justify-center"><h2 class="mb-0">Are you Sure?</h2></v-card-title>
        <v-list-item-content class="text-center pt-0 pb-5">
          <p class="mb-2 type-darkerGray">Are you sure you want to redeem this reward?</p>
        </v-list-item-content>
        <v-card-actions class="pa-0 justify-center">
          <v-btn
            class="button cstm-button-radius v-btn--small type-shdw-gray"
            color="#A8A8A8"
            dark
            @click="confirmDialog = false"
            min-width="100px">
            Cancel
          </v-btn>

          <v-btn
            class="button cstm-button-radius v-btn--small"
            color="#FABF24"
            dark
            @click="redeemReward"
            min-width="100px">
            Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <!-- END_COMPONENT_DIALOG_CONFIRM -->

    <!-- COMPONENT_DIALOG_SUCCESS -->
    <ConfirmationDialog
      :show="successDialog"
      message="Rewards redeemed! Please check your email for details"
      image="icons/Check.svg"
      @cancel="$PRXRouter().goTo('reward')"
      @proceed="$PRXRouter().goTo('reward')"
    />

    <ErrorDialog
      :show="error"
      :message="message"
      @close="error = false"
    />
    <!-- <v-dialog v-model="successDialog" persistent max-width="290">
      <v-card class="cstm-border-radius pa-5 py-10 dialog__con">
        <v-img  v-if="!error" :src="$PRXConfig().staticUrl('icons/Check.svg')" class="mx-auto text-center" width="70px" height="70px"></v-img>
        <v-card-title class="px-7 pt-3 pb-32 justify-center"><h2 class="mb-0">{{ header }}</h2></v-card-title>
        <v-list-item-content class="text-center pt-0 pb-5">
          <p class="mb-2 type-darkerGray">{{ message }}</p>
        </v-list-item-content>
        <v-card-actions class="pa-0 justify-center" >
          <v-btn
            class="button cstm-button-radius v-btn--small type-shdw-gray"
            color="#FABF24"
            dark
            @click="showSuccessDialog = false"
            min-width="100px"
            v-if="error">
            Ok
          </v-btn>

          <v-btn
            class="button cstm-button-radius v-btn--small type-shdw-gray"
            color="#A8A8A8"
            dark
            @click="$PRXRouter().goTo('reward')"
            min-width="100px"
            v-if="!error">
            Rewards History
          </v-btn>

          <v-btn
            class="button cstm-button-radius v-btn--small"
            color="#FABF24"
            dark
            @click="$PRXRouter().goTo('reward')"
            min-width="100px"
            v-if="!error">
            Check Rewards
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <!-- END_COMPONENT_DIALOG_SUCCESS -->
    
    <v-dialog v-model="loading" persistent width="300">
      <v-card color="#FABF24" dark>
        <v-card-text>
          Please wait
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import ConfirmationDialog from '@/components/ConfirmationDialog';
  import ErrorDialog from '@/components/ErrorDialog';

export default {
  data () {
    return {
      confirmDialog: false,
      successDialog: false,
      showSuccessDialog: false,
      rewards: [],
      loading: false,
      selectedReward: {},
      message: null,
      header: 'Success!',
      error: false
    }
  },

  components: { ConfirmationDialog, ErrorDialog },

  computed: {
    merchant() {
      return this.$store.state.reward.item;
    }
  },

  mounted() {
    this.$store.commit('setTopNav/set', 'Rewards');
    this.init();
  },

  methods: {
    init() {
      this.getRewards();
    },

    getRewards() {
      var data = {
        merchant_id: this.merchant.merchant_id
      };

      axios.post(this.routes['api.care.merchant.details'], data)
        .then(response => {
          this.rewards = response.data.merchant.denominations;
          this.loading = false;
        })
    },

    showDialog(reward) {
      this.confirmDialog = true;
      this.selectedReward = reward;
    },

    redeemReward() {
      this.loading = true;
      this.confirmDialog = false;
      var points = this.getItem('points');

      var data = {
        denominationid: this.selectedReward.denomination_id,
        denomination_value: this.selectedReward.value,
        quantity: 1,
        merchant_id: this.merchant.merchant_id,
        image_path: this.selectedReward.logo_url,
        merchant_name: this.merchant.name,
        denomination_name: this.selectedReward.name,
        price: this.selectedReward.price,
        points: points,
      }

      axios.post(this.routes['api.care.reward.redeem'], data)
        .then(response => {
          this.loading = false;
          var success = true;
          if(response.data.error) {
            this.header = 'Ooops'
            this.error = true;
            success = false;
          }
          this.successDialog = success;
          this.message = response.data.message;
          this.setItem('points', response.data.points);
        }).catch(error => {
          this.loading = false;
          console.log(error)
        })
    }
  }
}
</script>
