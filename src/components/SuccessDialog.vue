<template>
  <v-dialog v-model="show" max-width="300" persistent>
    <v-card class="frm-dialog br-10 px-2 py-5 text-center">
      <div class="frm-dialog__close-btn"
       @click="$emit('close')"><i class="fa fa-times"></i></div>
       <v-img :src="$PRXConfig().staticUrl(image)" class="mx-auto" width="42px" height="42px"></v-img>
       <v-card-title class="pb-1 mt-2">
        <h3 class="clr--black mx-auto">{{ title }}</h3>
      </v-card-title>
      <v-card-text class="clr--black regular">
        <p class="mb-0">{{ message }}</p>
      </v-card-text>
      <div class="px-5">
        <div class="frm-btn mt-2">
          <v-btn 
          rounded 
          block 
          elevation="elevation-0" 
          min-height="42" 
          @click="$emit('close')"
          class="type-doc-2">Okay</v-btn>
        </div>
      </div>
    </v-card>
    </v-dialog>
</template>


<script>
  export default {
    props: {
      show: {
        type: Boolean
      },
      title: {
        type: String,
        default: 'Success!'
      },
      message: {
        type: String
      },
      image: {
        type: String,
        default: 'icons/Check.svg' 
      }
    }
  }
</script>
