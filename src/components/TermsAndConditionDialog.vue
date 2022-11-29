<template>
	<v-dialog v-model="show" persistent max-width="290">
      <v-card class="cstm-border-radius pa-5 dialog__con">
        <v-img :src="$PRXConfig().staticUrl(image)" class="mx-auto text-center" width="45px" height="45px"></v-img>
        <v-card-title class="justify-center"><h3 class="text-center">Terms And Condition</h3></v-card-title>
        <v-card-title class="px-7 py-5 justify-center"><h4 class="mb-0 text-center" v-html="term"></h4></v-card-title>
        <v-card-title class="justify-center"><h3 class="text-center">Privacy</h3></v-card-title>
        <v-card-body class="px-7 py-5 justify-center"><h4 class="mb-0 text-center" v-html="privacy"></h4></v-card-body>
        <v-card-actions v-if="defaultSlot" class="pa-0 justify-center">
          <v-btn
            class="button cstm-button-radius v-btn--small type-shdw-gray"
            color="#A8A8A8"
            dark
            @click="$emit('cancel')"
            min-width="100px">
            {{ leftButtonText }}
          </v-btn>

          <v-btn
            class="button cstm-button-radius v-btn--small"
            color="#3b823e"
            dark
            @click="$emit('proceed')"
            min-width="100px">
            {{ rightButtonText }}
          </v-btn>
        </v-card-actions>
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
      term: { type: String },
      privacy: { type: String },
      image: { type: String },
      leftButtonText: {
        type: String,
        default: 'Cancel'
      },
      rightButtonText: {
        type: String,
        default: 'Proceed'
      }
    }
	}
</script>