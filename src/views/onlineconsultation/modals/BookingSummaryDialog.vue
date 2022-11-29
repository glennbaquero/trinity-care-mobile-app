<template>
  <v-row justify="center">
    <v-dialog
      v-model="bookingSummaryDialog"
      width="290"
      persistent
    >
      <v-card class="health__dialogCon pt-3 pb-5">
        <v-btn icon dark class="close--dialog" @click="hide">
            <v-icon>{{ 'fa-times' }}</v-icon>
          </v-btn>
        <v-layout row wrap mx-auto class="py-5 px-7">
          <v-flex xs3 class="align-self-center">
            <v-img :src="$PRXConfig().staticUrl('icons/chat.svg')" class="mx-auto" width="30px" height="30px"></v-img>
          </v-flex>
          <v-flex xs9 class="text-left align-self-center">
            <p class="mb-0 font-weight-bold type-black">Are you sure you want to book this consultation</p>  
          </v-flex>
        </v-layout>

        <v-layout row wrap mx-auto class="px-7 pt-3">
          <v-flex xs6 class="text-center">
            <v-btn
              @click="hide()"
              class="button cstm-button-radius type-white type-shdw-type1-gray type-2 font-weight-bold text-small">
              Cancel
            </v-btn>
          </v-flex>
          <v-flex xs6 class="text-center">
            <v-btn
              class="button cstm-button-radius type-green font-weight-bold mx-auto text-small"
              @click="submit()"
            >
            Proceed
            </v-btn>

            <BookingRequestDialog ref="success"></BookingRequestDialog>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <Loader
    ref="loader"
    ></Loader>

  </v-row>
</template>


<script>
import BookingRequestDialog from './BookingRequestDialog.vue';
import Loader from '@/components/Loader.vue';

  export default {
    components: {
      Loader,
      BookingRequestDialog,
    },

    props: {
      scheduleId: {
        type: Number,
        default: null,
      },
    },

    data () {
      return {
        bookingSummaryDialog: false,
        bookingRequest: false,
      }
    },

    methods: {

      /*
      |--------------------------------------------------------------------------
      | @Methods
      |--------------------------------------------------------------------------
      */
        
      /**
       * Submit consultation request
       * 
       */
      submit() {

        this.$refs['loader'].show();

        let data = {
          schedule_id: this.scheduleId,
          type: 0
        };

        axios.post(this.routes['api.care.consultations.store'], data)
          .then((response) => {
            this.$refs['loader'].hide();
            this.hide();
            this.$refs['success'].show(response.data);
          }).catch((err) => {
            this.$refs['loader'].hide();
          });
      },

      /**
       * Show modal
       * 
       */
      show() {
        this.bookingSummaryDialog = true;
      }, 

      /**
       * Hide modal
       * 
       */
      hide() {
        this.bookingSummaryDialog = false;
      }
    },

  }
</script>