<template>
    <v-navigation-drawer
      v-model="booking"
      fixed
      left
      class="bg-lightGray"
      width="100%"
      touchless
    >
      <v-card class="consultation__historyCon pb-3 type-shdw-gray">
        <v-container class="pt-3 pb-4 px-5">
          <v-layout row wrap mx-auto class="Doctor__profileHeader">
            <v-btn icon dark @click="$PRXRouter().goBack()" class="back--icon">
              <v-icon>{{ 'fa-chevron-left' }}</v-icon>
            </v-btn>

            <v-flex xs12 class="px-3">
              <MonthlyCalendar
              @date-changed="dateChanged"
              ></MonthlyCalendar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>

      <v-container class="pt-7">
        <v-layout row wrap mx-auto class="px-3">
          <v-flex xs6>
            <p class="mb-0 font-weight-bold type-black">{{ renderDate.day }}</p>
          </v-flex>
          <v-flex xs6 class="text-right">
            <p class="mb-0 font-weight-bold type-black">{{ currentCreds }} credits</p>
          </v-flex>
          <v-flex xs12>
            <small class="font-weight-normal type-gray">{{ renderDate.date }}</small>
          </v-flex>
          <v-flex xs12>
            <small class="font-weight-normal type-black">Available time slots</small>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container>
        <v-layout row wrap mx-auto class="px-3">
          <v-flex xs12>
            <BookingSlots
            :date="date"
            :schedules="schedules"
            @selected="openSummary"
            ></BookingSlots>
            <BookingSummary ref="summary"></BookingSummary>            
          </v-flex>
        </v-layout>
      </v-container>

    <Loader
    ref="loader"
    ></Loader>

    </v-navigation-drawer>
</template>

<script>
import MonthlyCalendar from './MonthlyCalendar.vue';
import BookingSlots from './BookingSlots.vue';
import BookingSummary from './BookingSummary.vue';
import Loader from '@/components/Loader.vue';

  export default {
    components: {
      Loader,
      MonthlyCalendar,
      BookingSlots,
      BookingSummary
    },

    computed: {
      currentCreds() {
        return this.$store.state.api.credits;
      },

      renderDate() {
        if(this.date) {
          return {
            day: moment(this.date).format('dddd'),
            date: moment(this.date).format('MMMM DD, YYYY')
          }; 
        } else {
          return {
            day: moment().format('dddd'),
            date: moment().format('MMMM DD, YYYY')
          };
        }
      }

    },
  
    data () {
      return {
        booking: true,
        doctorID: null,
        date: null,

        schedules: []

      }
    },

    watch: {
      doctorID() {
        this.fetchSchedules();
      },
    },

    mounted() {
      this.doctorID = this.$route.params.doctor;
      this.fetchSchedules();
    },

    methods: {

      /*
      |--------------------------------------------------------------------------
      | @Initialize
      |--------------------------------------------------------------------------
      */

      /**
       * Fetch schedules
       * 
       */
      fetchSchedules() {

        this.$refs['loader'].show();

        let data = {
          doctor_id: this.doctorID,
          date: this.date 
        };
        axios.post(this.routes['api.care.schedules.fetch'], data)
          .then((response) => {
            this.$refs['loader'].hide();
            this.schedules = response.data.schedules;
          }).catch((err) => {
            this.$refs['loader'].hide();
          }); 

      },


      /*
      |--------------------------------------------------------------------------
      | @Methods
      |--------------------------------------------------------------------------
      */

      /**
       * Event handler when date changed
       * 
       * @param  date date
       */
      dateChanged(date) {
        this.date = date;
        this.fetchSchedules();
      },


      /**
       * Show adding of credits
       * 
       */
      show(doctorID) {
          this.booking = true;
          this.doctorID = doctorID;
      },

      /**
       * Hide adding of credits
       * 
       */
      hide() {
          this.booking = false;
      },

      openSummary(data) {
        this.$refs['summary'].show(data);
      },
      
    },
  }
</script>