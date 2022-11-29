<template>
  <v-row justify="center">
    <v-dialog
      v-model="personalInfo"
      width="290"
    >
      <v-card class="health__dialogCon pt-3 pb-5">
        <v-btn icon dark class="close--dialog" @click="hide">
          <v-icon>{{ 'fa-times' }}</v-icon>
        </v-btn>
        <v-layout row wrap mx-auto class="py-5 px-7">
          <v-flex xs12 class="align-self-center mb-2">
            <v-img :src="$PRXConfig().staticUrl('icons/my-health.svg')" class="mx-auto" width="40px" height="40px"></v-img>
          </v-flex>
          <v-flex xs12 class="text-center align-self-center">
            <p class="mb-0 type-black">Personal Information on MyHealth Record has empty records, Do you wish to edit them?</p>  
          </v-flex>
        </v-layout>

        <v-layout row wrap mx-auto class="px-7 pt-3">
          <v-flex xs5 class="text-center frm-btn">
            <v-btn
              @click="hide"
              block rounded outlined elevation="elevation-0" min-height="42" class="">
              No
            </v-btn>
          </v-flex>
          <v-flex xs2>
          </v-flex>
          <v-flex xs5 class="text-center frm-btn">
            <v-btn
              @click="redirect()"
              rounded block elevation="elevation-0" min-height="42" class="type-doc-2">
              Yes
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>

  export default {
    props: {

    },

    data () {
      return {
        personalInfo: false,
      }
    },

    methods: {
      redirect() {
        this.$emit('hide');
        this.$PRXRouter().goTo('health');
      },
      show() {
        this.personalInfo = true;
      },

      hide() {
        this.personalInfo = false;        
      }

    },

  }
</script>