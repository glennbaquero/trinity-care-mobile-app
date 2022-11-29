<template>
  <v-row justify="center">
    <v-dialog
      v-model="prescription"
      width="290"
    >
      <v-card class="health__dialogCon py-3">
        <v-layout class="pa-5">
          <v-flex xs12>
            <p class="type-black"><span class="font-weight-bold type-black">Medicine Name:</span> {{ med.name }}</p>
            <p class="type-black"><span class="font-weight-bold type-black">Dosage:</span> {{ med.dosage }}</p>
            <p class="type-black"><span class="font-weight-bold type-black">Duration:</span> {{ med.duration }}</p>
            <p class="type-black"><span class="font-weight-bold type-black">Notes:</span> {{ med.notes }}</p>
          </v-flex>

        </v-layout>

        <v-card-actions class="text-center">
          <v-btn class="button mx-auto v-btn--small type-green" @click="hide()">Okay</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-row>
</template>


<script>

  export default {

    props: {
      med: {
        type: Object,
        default: {}
      },
    },

    data () {
      return {
        prescription: false,
      }
    },

    methods: {
      show() {
        this.prescription = true;
      },
      hide() {
        this.prescription = false;
      }
    },

  }
</script>