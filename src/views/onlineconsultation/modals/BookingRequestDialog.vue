<template>
  <v-row justify="center">
    <v-dialog
      v-model="bookingRequest"
      width="290"
      persistent
    >
      <v-card class="health__dialogCon pt-3 pb-5">
        <v-btn icon dark class="close--dialog" @click="hide"> 
            <v-icon>{{ 'fa-times' }}</v-icon>
          </v-btn>
        <v-layout row wrap mx-auto class="py-5 px-7">
          <v-flex xs3 class="">
            <v-img :src="$PRXConfig().staticUrl('icons/chat.svg')" class="mx-auto" width="30px" height="30px"></v-img>
          </v-flex>
          <v-flex xs9 class="text-left align-self-center">
            <p class="mb-1 font-weight-bold type-black">{{ message.title }}</p> 
            <small class="font-weight-normal type-black">{{ message.message }}</small> 
          </v-flex>
        </v-layout>

        <v-layout row wrap mx-auto class="px-7 pt-3">
          <v-flex xs12 class="text-center">
            <v-btn
              class="button cstm-button-radius type-green font-weight-bold mx-auto text-small"
              @click="hide()"
            >
            Okay
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>

import { bus } from '@/assets/js/EventBus.js';

  export default {
    data () {
      return {
        bookingRequest: false,
        message: {}
      }
    },

    methods: {
      show(message) {
        this.message = message;
        this.bookingRequest = true;
      },

      hide() {
        bus.$emit('closeBookingModal');
        this.bookingRequest = false;
      }
    },


  }
</script>