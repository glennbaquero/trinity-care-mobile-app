<template>
	<v-dialog v-model="show" persistent max-width="100%">
      <v-card class="frm-dialog br-10 px-5 py-8 text-center">
          <div class="frm-dialog__close-btn"
          @click="close()"><i class="fa fa-times"></i></div>
          <v-img :src="$PRXConfig().staticUrl(image)" class="mx-auto" width="42px" height="42px"></v-img>
          <v-card-title class="pb-1 mt-2">
              <h3 class="clr--black mx-auto">{{ message }}</h3>
          </v-card-title>
          <div class="px-12" v-if="defaultSlot">
              <template v-if="rightButton">
                  <div class="frm-btn mt-2">
                      <v-btn 
                      rounded 
                      block 
                      dark
                      elevation="elevation-0" 
                      min-height="42" 
                      @click="$emit('proceed')"
                      class="btn--green">{{ rightButtonText }}</v-btn>
                  </div>
              </template>
              <template v-if="leftButton">
                  <div class="frm-btn mt-2 frm-btn--outline">
                      <v-btn 
                      block 
                      rounded
                      outlined
                      elevation="elevation-0"
                      min-height="42"
                      outlined
                      @click="$emit('cancel')"
                      class="">{{ leftButtonText }}</v-btn>
                  </div>  
              </template>
          </div>
          <slot v-else></slot>
      </v-card>
  </v-dialog>
</template>


<script>
	export default {
    props: {
      show: { type: Boolean },
      defaultSlot: {
        type: Boolean,
        default: true
      },
      message: { type: String },
      image: { type: String },
      leftButton: {
        type: Boolean,
        default: true
      },
      rightButton: {
        type: Boolean,
        default: true
      },
      leftButtonText: {
        type: String,
        default: 'No'
      },
      rightButtonText: {
        type: String,
        default: 'Yes'
      }
    },

    methods: {
      close() {
        this.$emit('close');
      },
    },
	}
</script>