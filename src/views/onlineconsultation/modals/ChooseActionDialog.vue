  <template>
  <v-row justify="center">
      <v-dialog
      v-model="action"
      max-width="290"
      >
          <v-card class="health__dialogCon pt-5 pb-5">
              <v-btn icon dark  class="close--dialog" @click="hide">
                  <v-icon>{{ 'fa-times' }}</v-icon>
              </v-btn>
              <div class="text-center mb-5">
                  <h3>Choose action</h3>
              </div>

              <template v-if="consultation.refundable">
                  <v-card class="consultation__actionCard py-4 px-9 mb-2" @click="openRefund()">
                      <v-layout>
                          <v-flex xs3 class="align-self-center">
                              <v-img :src="$PRXConfig().staticUrl('icons/back.svg')" class="ml-0" width="30px" height="30px"></v-img>
                          </v-flex>
                          <v-flex xs9 class="align-self-center">
                              <p class="mb-0">Request Refund</p>
                              <span>Send a refund request</span>
                          </v-flex>
                      </v-layout>
                  </v-card>
              </template>

              <template v-if="canChat()">
                <v-card class="consultation__actionCard py-4 px-9 mb-2" @click="viewDetails()">
                    <v-layout>
                        <v-flex xs3 class="align-self-center">
                            <v-img :src="$PRXConfig().staticUrl('icons/eye.svg')" class="ml-0" width="30px" height="30px"></v-img>
                        </v-flex>
                        <v-flex xs9 class="align-self-center">
                            <p class="mb-0">View Details</p>
                            <span>View Conusltation view</span>
                        </v-flex>
                    </v-layout>
                </v-card>

                <template v-if="consultation.chat">                
                    <v-card class="consultation__actionCard py-4 px-9 mb-2" @click="viewDetails()">
                        <v-layout>
                            <v-flex xs3 class="align-self-center">
                                <v-img :src="$PRXConfig().staticUrl('icons/chat.svg')" class="ml-0" width="30px" height="30px"></v-img>
                            </v-flex>
                            <v-flex xs9 class="align-self-center">
                                <p class="mb-0">Chat now</p>
                                <span>Consult doctor Now</span>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </template>
              </template>

              <RequestRefundDialog ref="refund"></RequestRefundDialog>

          </v-card>
      </v-dialog>
  </v-row>
</template>


<script>
    import RequestRefundDialog from './RequestRefundDialog.vue';

    export default {
        components: {
            RequestRefundDialog,
        },

        data () {
            return {
                action: false,
                refundDialog: false,
                chatDetailsView: false,

                consultation: {},
            }
        },

        methods: {


            /*
            |--------------------------------------------------------------------------
            | @Methods
            |--------------------------------------------------------------------------
            */

            openRefund() {
                if(this.consultation) {
                    this.$refs['refund'].show(this.consultation);
                }
            },

            show(consultation) {
                this.action = true;
                this.consultation = consultation;
            },

            hide() {
                this.action = false;
            },

            trigRefundDialog() {
                this.refundDialog = this.refundDialog ? false: true;
            },

            viewDetails() {
              this.$store.commit('onlineConsultation/setConsultation', this.consultation);                
              this.$PRXRouter().goTo('chats');
            },

            /*
            |--------------------------------------------------------------------------
            | @Checkers
            |--------------------------------------------------------------------------
            */
            canChat() {
              if(this.consultation) {

                if(this.consultation.status == "Completed") {
                  return true;
                }

                if(this.consultation.type === 0) {
                  if(this.consultation.end_time) {
                    let end = moment(moment(this.consultation.date).format('Y-MM-DD') +' '+ this.consultation.start_time),
                    now = moment();
                    let duration = end.diff(now, 'minutes');

                    if(duration <= 0) {
                      return true;
                    } else if (duration > 60) {
                      return false;
                    } else {
                      return true;
                    }
                  } 

                } else {

                  if(this.consultation.remaining) {
                    let now = moment();
                    let start = moment(moment(this.consultation.date).format('Y-MM-DD') +' '+ this.consultation.start_time);
                    start = start.add('seconds', this.consultation.remaining);
                    let left = start.diff(now, 'minutes');
                    if(left <= 0) {
                      return true;
                    } else if (left > 60) {
                      return false;
                    } else {
                      return true;
                    }           
                  }
                  
                }
              }
            }            
        },

    }
</script>