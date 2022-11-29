<template>
<v-layout column class="backgroundColor--white auth__login">
    <v-container pa-5 mx-auto class="auth__login-TopCon">
        <v-flex xs12 mb-4>
            <h1 class="mb-4">Hi, we're here to help you!</h1>
            <h3 class="type-lighterGray">Please input your email address.</h3>
        </v-flex>
    </v-container>

    <form @submit.prevent="login">
        <v-container pa-5 row wrap mx-auto class="auth__login-Content">
            <v-flex xs12 mb-2>
                <v-text-field
                v-model="email"
                label="Email"
                type="email"
                color="#FABF24"
                class="form__input--text"
                :error-messages="errors.email"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 text-center mt-4 mb-6>
                <v-btn 
                :disabled="!email"
                :dark="email ? true : false"
                class="button cstm-button-radius text-small cstm-width type-gradient-l-r v-btn--large" depressed large @click="forgotPassword">Send</v-btn>
            </v-flex>
            <v-flex xs12 text-center mb-2>
                <p class="type-darkerGray mb-0">Back to <span @click="$PRXRouter().goTo('login')" class="color-primary1 bold">Login?</span></p>
            </v-flex>
            <v-flex xs12 class="mt-2 mb-3">
                <v-divider></v-divider>
            </v-flex>
            <v-flex xs12 text-center mb-2>
                <p class="type-darkerGray mb-0">Don't have an account yet? <span @click="$PRXRouter().goTo('signup')" class="color-primary1 bold">Sign up</span></p>
            </v-flex>            
        </v-container>
    </form>


    <Loader
    ref="loader"
    ></Loader>

    <!-- COMPONENT_DIALOG_SUCCESS -->
    <SuccessDialog
    :show="successDialog"
    message="Reset password link is sent, please check your email."
    image="icons/Check2.svg"
    @close="successDialog = false"
    />
    <!-- END_COMPONENT_DIALOG_SUCCESS -->
</v-layout>
</template>


<script>

import Loader from '@/components/Loader';
import SuccessDialog from '@/components/SuccessDialog';

export default {

    components: { 
        SuccessDialog,
        Loader
    },

    data() {
        return {
            email: null,
            successDialog: false,
            errors: {}        
        }
    },

    methods: {
        forgotPassword() {
            if(this.email) {
                this.loading = true;

                var data = {
                    email: this.email
                };

                this.$refs['loader'].show();

                axios.post(this.routes['api.care.password.email'], data)
                .then(response => {
                    this.$refs['loader'].hide();              
                    this.successDialog = true;
                    this.errors = {};
                    this.email = null;
                }).catch((err) => {
                    console.log(err)
                    if(err.response) {
                        const errors = err.response.data.errors;
                        this.errors = { ...errors };
                        this.$refs['loader'].hide();                                      
                    }

                });

            }
        }
    }
}
</script>
