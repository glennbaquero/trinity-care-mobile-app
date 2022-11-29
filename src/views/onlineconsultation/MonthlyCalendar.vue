<template>
  <v-row justify="center" class="month__calendarHolder">
    <v-date-picker 
    :min="minDate"
    v-model="date" color="orange"></v-date-picker>
  </v-row>
</template>
<script>
	
  export default {

    computed: {
      minDate() {
        return moment().format('Y-MM-DD');
      }
    },

    data: () => ({
      date: moment().format('Y-MM-DD'),      
    }),

    watch: {
      date() {
        this.dateChanged();
      },  
    },

    methods: {
      dateChanged() {
        this.$emit('date-changed', this.date);
      },
    },
  }

</script>