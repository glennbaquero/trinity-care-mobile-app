<template>
    <v-row justify="center">
        <v-dialog
        v-model="success"
        max-width="290"
        >
        <v-card class="health__dialogCon pa-7">
            <!-- <v-icon class="close--dialog" @click="height = false">{{ 'fa-times' }}</v-icon> -->
            <div class="text-center mb-5">
                <h3>{{ message }}</h3>
            </div>

            <v-card-actions class="text-center">
                <v-btn class="button mx-auto v-btn--small type-green" @click="hide">Okay</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-row>
</template>


<script>
    export default {

        data () {
            return {
                success: false,
                message: "The refund request Successfully Sent!",
            }
        },

        methods: {


            show(message) {
                this.message = message;
                this.success = true;
            },

            hide() {
                this.success = false;
            },         
            
        }

    }
</script>