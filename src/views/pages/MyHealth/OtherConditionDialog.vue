<template>
    <v-row justify="center">
        <v-dialog
        v-model="condition"
        max-width="290"
        >
        <v-card class="health__dialogCon pt-5">
            <v-btn icon dark class="close--dialog" @click="condition = false">
                <v-icon>{{ 'fa-times' }}</v-icon>
            </v-btn>
            <div class="text-center mb-5">
                <h3>Other Conditions</h3>
            </div>

            <v-layout class="px-7 weight__contentCol">
                <v-flex xs12>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field
                        v-model="post.personal_information.condition"
                        :rules="[rules.required]"
                        label="Name of Condition"
                        placeholder="Condition"
                        ></v-text-field>
                    </v-col>
                </v-flex>
            </v-layout>
            <v-card-actions class="text-center">
                <v-btn
                color="#3b823e" 
                height="25px" 
                dark class="health__dialogBtn mx-auto" 
                :disabled="!post.personal_information.condition" 
                @click="submitPersonalInformation();">
                save
            </v-btn>

        </v-card-actions>
    </v-card>
</v-dialog>

<Loader
ref="loader"
></Loader>

<SuccessDialog
:show="successDialog"
:message="message"
image="icons/Check.svg"
@close="setSuccessDialog()"
/>

</v-row>
</template>

<script>
    import Personal from './extensions/personal.js';

    export default {
        mixins: [ Personal ],

        props: {
            show: Boolean,

            value: {
                type: Object,
                default: {}
            },            
        },

        data () {
            return {
                condition: false,
            }
        },

        watch: {
            show(val) { 
                this.post.personal_information.condition =  this.value.personal_information ? this.value.personal_information.condition: '';
                this.condition = val
            }
        }, 
    }
</script>