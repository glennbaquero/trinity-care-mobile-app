<template>
  <v-container fill-height pa-0 class="backgroundColor--white">
    <v-layout row wrap mx-0 align-content-start>
      <v-container column align-center justify-space-between pa-10 class="article__con">
        <v-layout row wrap mx-auto>
          <v-flex xs12 mb-12 text-center>
            <h2 class="mb-1 type-1">Terms And Condition</h2>
          </v-flex>
          <v-flex xs12 mb-2>
            <p class="mb-1" v-html="terms"></p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    computed: {
      terms() {
        return this.getItem('terms_and_condition');
      },
    },
  }
</script>
