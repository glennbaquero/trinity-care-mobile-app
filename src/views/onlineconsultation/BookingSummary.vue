<template>
    <!-- Filter View -->
    <v-navigation-drawer
    v-model="bookingSummary"
    fixed
    left
    width="100%"
    touchless
    >
        <v-card class="consultation__historyCon">
            <v-toolbar 
            class="consultation__historyTitle type-shdw-gray">
                <v-btn 
                style="z-index: 7;"
                icon dark @click="hide">
                    <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
                </v-btn>
                <v-toolbar-title>Booking Summary</v-toolbar-title>
            </v-toolbar>
        </v-card>
        <v-container class="pa-4">
            <v-layout row wrap mx-auto>
                <v-flex xs12>
                  <v-card class="pa-5">
                    <v-layout row wrap mx-auto>
                      <v-flex xs12>
                        <h3 class="font-weight-normal mb-2">Consultation Information</h3>
                      </v-flex>
                      <v-flex xs12>
                        <v-layout row wrap mx-auto class="mb-2">
                            <v-flex xs4>
                                <small>Doctor</small>
                              </v-flex>
                              <v-flex xs8>
                                <small class="font-weight-normal">Dr. {{ schedule.doctor_name }}</small>
                              </v-flex>
                          </v-layout>  
                      </v-flex>
                
                      <v-flex xs12>
                        <v-layout row wrap mx-auto class="mb-2">
                            <v-flex xs4>
                                <small>Date</small>
                              </v-flex>
                              <v-flex xs8>
                                <small class="font-weight-normal">{{  renderDate  }}</small>
                              </v-flex>
                          </v-layout>
                      </v-flex>
                    
                    <v-flex xs12>
                      <v-layout row wrap mx-auto class="mb-2">
                        <v-flex xs4>
                            <small>Time</small>
                          </v-flex>
                          <v-flex xs8>
                            <small class="font-weight-normal">{{ renderTime }}</small>
                          </v-flex>
                      </v-layout>
                    </v-flex>
                
                      <v-flex xs12>
                        
                      </v-flex>
                      <v-layout row wrap mx-auto class="mb-2">
                        <v-flex xs4>
                            <small>Consultation Fee</small>
                        </v-flex>
                        <v-flex xs8>
                            <small class="font-weight-normal">{{ renderConsultationFee }} credit(s)</small>
                        </v-flex>
                      </v-layout>
                    </v-layout>
                  </v-card>
                </v-flex>
            </v-layout>
            

            <v-layout row wrap mx-auto class="mt-5">
              <v-flex xs12 class="text-right">
                <v-btn
                  class="button cstm-button-radius type-green font-weight-bold mx-auto text-small"
                  @click="confirmation()"
                >
                Pay and Confirm
                </v-btn>
              </v-flex>
            </v-layout>

            <BookingSummaryDialog 
            :schedule-id="schedule.id"
            ref="confirmation"
            ></BookingSummaryDialog>
 
        </v-container>
    </v-navigation-drawer>
</template>

<script>
import BookingSummaryDialog from './modals/BookingSummaryDialog.vue';

import { bus }from '@/assets/js/EventBus.js';

    export default {

        components: {
            BookingSummaryDialog,
        },

        computed: {

          renderDate() {
            if(this.schedule.date) {
              return moment(this.schedule.date).format('MMMM DD, YYYY')
            }
          },

          renderTime() {
            if(this.schedule.start_time && this.schedule.end_time) {
              let start = moment(moment(this.schedule.date).format('MM/D/YYYY') +' '+  this.schedule.start_time).format('hh:mm'),
                end = moment(moment(this.schedule.date).format('MM/D/YYYY') +' '+  this.schedule.end_time).format('hh:mm');
              
              if(this.schedule.type == 'am') {
                if(this.schedule.start_time == "11:30" && this.schedule.end_time == "12:00") {
                  return start +' AM - ' + end + ' PM';
                }
                return start +' AM - ' + end + ' AM';
              }
              if(this.schedule.type == 'pm') {
                if(this.schedule.start_time == "11:30" && this.schedule.end_time == "12:00") {
                  return start +' PM - ' + end + ' AM';
                }
              } 
              return start +' PM - ' + end + ' PM'; 
            }
          },

          renderConsultationFee() {
            if(this.schedule.doctor) {
              return this.schedule.doctor.consultation_fee;
            }
          }

        },

        data () {
          return {
            bookingSummary: false,
            bookingSummaryDialog: true,

            schedule: {},

          }
        },

        mounted() {
          this.initEventHandler();
        },

        methods: {

          /**
           * Initialize event handler
           * 
           */
          initEventHandler() {
            bus.$on('closeBookingModal', () => {
              this.hide();
            })
          },         

          /**
           * Show confirmation modal
           * 
           */
          confirmation() {
            this.$refs['confirmation'].show();
          },

          /**
           * Show summary modal
           * 
           * @param  object schedule
           */
          show(schedule) {
            this.schedule = schedule;
            this.bookingSummary = true;
          },

          /**
           * Hide summary modal
           * 
           */
          hide() {
            this.bookingSummary = false;
          }

        }

    }
</script>
