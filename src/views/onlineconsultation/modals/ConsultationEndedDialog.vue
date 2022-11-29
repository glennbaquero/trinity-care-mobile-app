<template>
  <v-row justify="center">
    <v-dialog
      v-model="consultationEnded"
      width="290"
    >
      <v-card class="health__dialogCon pt-3 pb-5">
        <v-btn icon dark  class="close--dialog" @click="hide">
          <v-icon>{{ 'fa-times' }}</v-icon>
        </v-btn>
        <v-layout row wrap mx-auto class="py-5 px-5">
          <v-flex xs3 class="">
            <v-img :src="$PRXConfig().staticUrl('icons/consult-doctor.svg')" class="mx-auto" width="30px" height="30px"></v-img>
          </v-flex>
          <v-flex xs9 class="text-left align-self-center">
            <p class="mb-1 font-weight-bold type-black">This consultation has ended</p> 
          </v-flex>
          <v-flex xs12 class="px-5 pt-3">
            <p class="font-weight-normal type-black mb-0"><span class="font-weight-black">Dr. {{ doctor }}</span> has been added to your linked doctors</p> 
          </v-flex>
        </v-layout>

        <v-layout row wrap mx-auto class="px-7 pt-3">
          <v-flex xs12 class="text-center">
            <v-btn
              class="button cstm-button-radius type-green font-weight-bold mx-auto text-small"
              @click="hide"
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

  export default {

    data () {
      return {
        doctor: null,
        consultationEnded: false,
      }
    },

    methods: {
      show(doctor) {
       this.doctor = doctor;
       this.consultationEnded = true;
      },

      hide() {
        this.consultationEnded = false;
      }
    },

  }
</script>