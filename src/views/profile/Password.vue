<template>
    <v-tab-item value="tab2">
        <v-layout pa-5 mb-2 wrap class="backgroundColor--white frm-elevation">
            <v-flex xs12 mb-2>
                <v-text-field
                v-model="payload.old_password"
                label="Old Password"
                color="#3B823E"
                class="form__input--text"
                type="password"
                :error-messages="errors.old_password"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 mb-2>
                <v-text-field
                v-model="payload.new_password"
                label="New Password"
                color="#3B823E"
                class="form__input--text"
                type="password"
                :error-messages="errors.new_password"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 mb-2>
                <v-text-field
                v-model="payload.new_password_confirmation"
                label="Retype Password"
                color="#3B823E"
                class="form__input--text"
                type="password"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <!-- END_PASSWORD -->

        <v-layout px-4 mt-4 py-4 wrap>
            <v-flex xs12 text-center mb-4>
                <v-btn
                class="button cstm-button-radius text-small cstm-width type-gradient-l-r v-btn--large"
                depressed
                large
                dark
                @click="updatePassword">
                Save
            </v-btn>
        </v-flex>
    </v-layout>
    
    <Loader
    ref="loader"
    ></Loader>    

</v-tab-item>
</template>


<script>

import Loader from '@/components/Loader.vue';

export default {

    components: { 
        Loader,
    },
    
    data: () => ({
        payload: {
            old_password: null,
            new_password: null,
            new_password_confirmation: null
        },
        errors: {}
    }),

    methods: {
        updatePassword() {
            this.$refs['loader'].show();

            axios.post('/api/care/password/update', this.payload)
            .then(response => {

                this.$refs['loader'].hide();

                if(response.data.message != 'error') {

                    this.payload = {
                        old_password: null,
                        new_password: null,
                        new_password_confirmation: null
                    };
                    this.$emit('showSuccessDialog', response.data.message);
                } else {
                    this.errors.old_password = response.data.old_password;
                }
            })
            .catch(error => {
                this.$refs['loader'].hide();                
                this.errors = { ...error.response.data.errors };
                this.$emit('showErrorDialog', this.parseResponse(this.errors))
            });
        }
    }
}
</script>