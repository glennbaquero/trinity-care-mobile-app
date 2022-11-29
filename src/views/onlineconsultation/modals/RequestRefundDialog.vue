<template>
    <v-row justify="center">
        <v-dialog
        v-model="refund"
        max-width="290"
        >
        <v-card class="health__dialogCon py-3">
            <v-btn icon dark class="close--dialog" @click="hide">
                <v-icon>{{ 'fa-times' }}</v-icon>
            </v-btn>
            <div class="text-center mb-5">
                <h3>Request Refund</h3>
            </div>

            <v-layout class="px-5">
                <v-flex xs12>
                    <p><span class="font-weight-bold type-black">Date:</span> {{ consultation.date | format_date }}</p>
                    <p><span class="font-weight-bold type-black">Credit:</span> {{ consultation.fee }}</p>
                    <p><span class="font-weight-bold type-black">Doctor:</span> Dr. {{ consultation.doctor_name }}</p>
                        <v-text-field
                        v-model="post.reason"
                        dense
                        label="Reason"
                        placeholder="State reason of refund"
                        ></v-text-field>
                    </v-flex>

                </v-layout>

                <v-card-actions class="text-center">
                    <v-btn 
                    :disabled="!post.reason"
                    class="button mx-auto v-btn--small type-green" @click="submit()">Okay</v-btn>
                </v-card-actions>
            </v-card>

            <SuccessRefundDialog ref="success"></SuccessRefundDialog>
        </v-dialog>


        <Loader
        ref="loader"
        ></Loader>

    </v-row>
</template>


<script>

    import Loader from '@/components/Loader';
    import SuccessRefundDialog from './SuccessRefundDialog.vue';

    export default {

        components: {
            Loader,
            SuccessRefundDialog,
        },

        computed: {
            renderConsumedTime() {
                if(this.consultation.start_time) {
                    if(moment() >= moment(this.consultation.date)) {
                        let start = moment(moment().format('Y-MM-DD') +' '+ this.consultation.start_time),
                            currentTime = moment();
                        let consumed = currentTime.diff(start, 'minutes');
                        if(consumed >= 30) {
                            return '30 Minutes';
                        } else {
                            return consumed + ' Minutes';
                        }
                    } else {
                        return 'Not yet started';
                    }
                }
            }
        },

        data() {
            return {
                refund: false,
                successRefund: false,
               
                consultation: {},

                post: {
                    reason: null
                }

            }
        },

        methods: {


            /*
            |--------------------------------------------------------------------------
            | @Methods
            |--------------------------------------------------------------------------
            */
            

            submit() {
                this.$refs['loader'].show();

                let data = {
                    consultation_id: this.consultation.id,
                    reason: this.post.reason
                };

                axios.post(this.routes['api.care.refunds.store'], data)
                    .then((response) => {
                        this.$refs['loader'].hide();
                        this.hide();
                        if(response.data.status == 1) {
                            this.$refs['success'].show(response.data.message);
                        } else {
                            this.$alert.show(response.data.title, response.data.message);                            
                        }
                        this.post.reason = null;
                    }).catch((err) => {
                        this.$refs['loader'].hide();
                        this.$alert.show('Something went wrong', 'Something went wrong. Please try again');
                    });
            },

            show(consultation) {
                this.refund = true;
                this.consultation = consultation;
            },

            hide() {
                this.refund = false;
            },

            trigSuccessDialog() {
                this.successRefund = this.successRefund ? false: true;
            },
        },

        filters: {
            format_date(date) {
                if(date) {
                   return moment(date).format('LL');
                }
            }
        },

    }
</script>