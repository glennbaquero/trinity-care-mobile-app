<template>
    <v-row justify="center">
        <v-dialog
        v-model="height"
        max-width="290"
        >
        <v-card class="health__dialogCon pt-5">
            <!-- <div class="text-right"> -->
                
            <!-- </div> -->
            <v-btn icon dark class="close--dialog" @click="height = false">
                    <v-icon >{{ 'fa-times' }}</v-icon>
            </v-btn>
            <div class="text-center mb-5">
                <h3>Height</h3>
            </div>

            <v-form v-model="isFormValid">
                <v-layout class="px-5">
                    <v-flex xs6>
                        <v-col cols="12" sm="6" md="3" class="align-self-center mb-0">
                            <v-text-field
                            v-model="post.personal_information.height_feet"
                            name="height_feet"
                            :rules="[rules.required, rules.number]"
                            type="number"
                            label="Solo"
                            placeholder="Height (feet)"
                            solo
                            ></v-text-field>
                        </v-col>
                    </v-flex>

                    <v-flex xs6>
                        <v-col cols="12" sm="6" md="3" class="align-self-center mb-0">
                            <v-text-field
                            v-model="post.personal_information.height_inches"
                            name="height_inches"
                            :rules="[rules.required, rules.number]"
                            type="number"
                            label="Solo"
                            placeholder="Height (inches)"
                            solo
                            ></v-text-field>
                        </v-col>
                    </v-flex>
                </v-layout>

                <v-card-actions class="text-center">
                    <v-btn
                    color="#3b823e" 
                    height="25px" 
                    dark class="health__dialogBtn mx-auto" 
                    :disabled="!isFormValid"
                    @click="submitPersonalInformation();">
                    save
                    </v-btn>

                </v-card-actions>
            </v-form>

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
                height: false,
            }
        },

        watch: {
            show(val) {
                this.post.personal_information.height_feet = this.value.personal_information ? this.value.personal_information.height_feet : '';
                this.post.personal_information.height_inches = this.value.personal_information ? this.value.personal_information.height_inches : ''; 
                this.height = val
            }
        }, 
    }
</script>