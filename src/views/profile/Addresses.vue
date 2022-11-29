<template>
  <div>
    <v-layout v-for="(address, index) in addresses" :key="index" px-5 py-10 mb-2 wrap class="backgroundColor--white frm-elevation auth__addressCon"
      @click="editAddress(address.id)">
      <v-flex xs12 mb-6>
        <h3 :class="address.defaultAddress ? 'color-doc-primary2' : ''">{{ `${address.defaultAddress ? 'Default ' : ''}Address #${index + 1}` }}</h3>
      </v-flex>
      <v-flex xs12>
        <p>{{ address.street }} St. {{ address.building }}</p>
        <p>{{ address.city.text }} City, {{ address.province.text }}</p>
        <p>{{ address.zip }}</p>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
  export default {
    computed: {
      addresses() {
        return this.$store.getters['api/addresses'];
      }
    },
    methods: {
      editAddress(id) {
        this.$PRXRouter().goTo('editAddress');
        this.$store.commit('user/setData', { name: 'editAddressId', payload: id });
      }
    }
  }
</script>