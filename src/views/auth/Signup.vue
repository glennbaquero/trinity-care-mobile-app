<template>
<v-layout column class="backgroundColor--white auth__login">
    <v-container pa-5 mx-auto class="auth__login-TopCon">
        <v-flex xs12 mb-4>
            <h1 class="mb-4">Hi, sign up to be with us!</h1>
            <h3 class="type-lighterGray">Kindly put your details here</h3>
        </v-flex>
    </v-container>

    <form>
        <v-container pa-5 row wrap mx-auto class="auth__login-Content">
            <v-flex xs12 mb-2>
                <v-text-field
                v-model="item.first_name"
                label="First name *"
                color="#FABF24"
                class="form__input--text"
                :error-messages="errors.first_name"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 mb-2>
                <v-text-field
                v-model="item.last_name"
                label="Last name *"
                color="#FABF24"
                class="form__input--text"
                :error-messages="errors.last_name"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 mb-2>
                <v-text-field
                v-model="item.mobile_number"
                label="Mobile Number *"
                color="#FABF24"
                type="number"
                class="form__input--text"
                :error-messages="errors.mobile_number"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 mb-2>
                <v-text-field
                v-model="item.email"
                type="email"
                label="Email *"
                color="#FABF24"
                class="form__input--text"
                :error-messages="errors.email"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 mb-2>
                <v-text-field
                v-model="item.password"
                label="Password *"
                color="#FABF24"
                class="form__input--text"
                type="password"
                :error-messages="errors.password"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 mb-2>
                <v-text-field
                v-model="item.password_confirmation"
                label="Confirmation Password *"
                color="#FABF24"
                class="form__input--text"
                type="password"
                ></v-text-field>
            </v-flex>
            <v-flex xs6 mb-2 pr-2>
                <v-text-field
                v-model="item.unit"
                label="Unit & Floor #"
                color="#FABF24"
                class="form__input--text"
                ></v-text-field>
            </v-flex>
            <v-flex xs6 mb-2 pl-2>
                <v-text-field
                v-model="item.street"
                label="Street Name *"
                color="#FABF24"
                class="form__input--text"
                :error-messages="errors.street"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 mb-2>
                <v-text-field
                v-model="item.building"
                label="Bldg/Subdivision"
                color="#FABF24"
                class="form__input--text"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 mb-2>
                <v-select
                v-model="item.region_id"
                label="Region *"
                color="#FABF24"
                :items="computedRegions"
                item-text="name"
                item-value="id"
                class="form__input--text"
                :error-messages="errors.region_id"
                @change="getProvinces"
                ></v-select>
            </v-flex>
            <v-flex xs12 mb-2>
                <v-select
                :items="provinces"
                v-model="item.province_id"
                item-text="name"
                item-value="id"
                label="Province *"
                color="#FABF24"
                class="form__input--text"
                :disabled="!item.region_id"
                :error-messages="errors.province_id"
                @change="getCities"
                ></v-select>
            </v-flex>
            <v-flex xs12 mb-2>
                <v-select
                :items="cities"
                v-model="item.city_id"
                item-value="id"
                item-text="name"
                label="City *"
                color="#FABF24"
                :disabled="!item.province_id"
                :error-messages="errors.city_id"
                class="form__input--text"
                ></v-select>
            </v-flex>
            <v-flex xs6 mb-2 pr-2>
                <v-text-field
                v-model="item.zip"
                label="Zip Code *"
                color="#FABF24"
                class="form__input--text"
                :error-messages="errors.zip"
                ></v-text-field>
            </v-flex>
            <v-flex xs6 mb-2 pl-2>
                <v-text-field
                v-model="item.landmark"
                label="Landmark"
                color="#FABF24"
                class="form__input--text"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 mb-2>
                <v-text-field
                v-model="item.referrer_code"
                label="Referral Code *"
                color="#FABF24"
                class="form__input--text"
                :error-messages="errors.referrer_code"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 text-center mt-12 mb-6>
                <v-btn
                :class="`button cstm-button-radius text-small cstm-width v-btn--large ${loading ? 'type-3' : 'type-gradient-l-r'}`"
                depressed
                large
                :dark="!loading"
                :disabled="loading"
                @click="policyDialog = true"
                >
                <span v-if="!loading">Signup</span>
                    <Spinner v-else stroke-color="#afafaf" />
                </v-btn>
            </v-flex>
            <v-flex xs12 text-center mb-2>
                <p class="type-darkerGray mb-0">Already have an account? <span @click="$PRXRouter().goTo('login')" class="color-primary1 bold">Login</span></p>
            </v-flex>
        </v-container>
    </form>

    <!-- COMPONENT_DIALOG_UPDATE -->
    <v-dialog v-model="policyDialog" persistent max-width="290">
        <v-card class="cstm-border-radius pa-5 dialog__con">
            <v-card-title class="px-2 pt-0 pb-0 text-center justify-center policy__textCon">
                <h3 class="mb-4">Privacy Policy</h3>
                <h5 class="type-darkerGray text-left font-weight-default mb-0 line-height-small" v-html="pageItems.privacy"></h5>
            </v-card-title>
            <v-card-title class="px-2 pt-0 pb-5 text-center justify-center">
                <h5 class="type-2 font-weight-default mt-4 mb-0 text-deco-underline" @click="openTermsAndConditions">Read the full terms and conditions</h5>
            </v-card-title>
            <v-card-actions class="pa-0 justify-space-between">
                <v-btn
                class="button cstm-button-radius type-shdw-gray"
                color="#A8A8A8"
                dark
                @click="policyDialog = false"
                min-width="110px">
                    <i class="fas fa-times mr-1"></i> Cancel
                </v-btn>
                <v-btn
                class="button cstm-button-radius"
                color="#3b823e"
                dark
                @click="registerAccount()"
                min-width="110px">
                    <i class="fas fa-check mr-1"></i> I Agree
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="termsAndConditionsDialog" persistent max-width="290">
        <v-card class="cstm-border-radius pa-5 dialog__con">
            <v-card-title class="px-2 pt-0 pb-0 text-center justify-center policy__textCon">
                <h3 class="mb-4">Terms And Conditions</h3>
                <h5 class="type-darkerGray text-left font-weight-default mb-0 line-height-small" v-html="pageItems.terms"></h5>
            </v-card-title>
            <v-card-actions class="pa-0 mt-4 justify-space-between">
                <v-btn
                class="button cstm-button-radius type-shdw-gray"
                color="#A8A8A8"
                dark
                @click="termsAndConditionsDialog = false"
                min-width="110px">
                    <i class="fas fa-times mr-1"></i> Cancel
                </v-btn>
                <v-btn
                class="button cstm-button-radius"
                color="#3b823e"
                dark
                @click="registerAccount()"
                min-width="110px">
                    <i class="fas fa-check mr-1"></i> I Agree
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>    
    <!-- END_COMPONENT_DIALOG_UPDATE -->

    <ConfirmationDialog
    :show="verificationDialog"
    :message="verificationMessage"
    image="icons/prompt.svg"
    :default-slot="false"
    >
    <v-card-actions class="pa-0 justify-center flex-column">
    <v-btn
    class="button cstm-button-radius v-btn--small type-shdw-gray mt-3"
    color="#A8A8A8"
    dark
    width="200px"
    @click="cancel">
        OK
    </v-btn>
    </v-card-actions>
    </ConfirmationDialog>

    <ConfirmationDialog
    :show="loadingDialog"
    message="Verifying..."
    image="icons/prompt.svg"
    :default-slot="false"
    >
    <v-flex d-flex align-center justify-center>
    <Spinner stroke-color="#afafaf" />
    </v-flex>
    </ConfirmationDialog>

    <ErrorDialog
    :show="errorDialog"
    :message="errorMessage"
    @close="errorDialog = false"
    />

    <Loader
        ref="loader"
    ></Loader>

</v-layout>
</template>

<script>

import QrMixin from '@/assets/js/mixins/qr.js';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import TermsAndConditionDialog from '@/components/TermsAndConditionDialog';
import ErrorDialog from '@/components/ErrorDialog';
import Spinner from '@/components/Spinner';
import Loader from '@/components/Loader.vue';

export default {
    data() {
        return {
            policyDialog: false,
            termsAndConditionsDialog: false,

            verificationDialog: false,
            verificationMessage: null,
            errorDialog: false,
            errorMessage: null,
            loadingDialog: false,
            item:{},
            province: null,
            provinces: [],
            cities: [],
            loading: false,
            errors: {},

            pageItems: {},
        }
    },

    components: { 
        ConfirmationDialog, 
        ErrorDialog, 
        Spinner, 
        TermsAndConditionDialog,
        Loader
    },

    mixins: [ QrMixin ],

    computed: {
        computedRegions() {
            return JSON.parse(window.localStorage.getItem('regions'));
        },
    },

    mounted() {
        this.init();
    },

    methods: {

        init() {
            this.pageItems.privacy = window.localStorage.getItem('privacy'); 
            this.pageItems.terms = window.localStorage.getItem('terms_and_condition'); 
        },

        openTermsAndConditions() {
            this.policyDialog = false;
            this.termsAndConditionsDialog = true;
        },

        getProvinces() {
            var $this = this;
            this.computedRegions.forEach((region) => {
                if($this.item.region_id == region.id) {
                    $this.provinces = region.provinces
                }
            });
        },

        getCities() {
            var $this = this;
            this.provinces.forEach((province) => {
                if($this.item.province_id == province.id) {
                    $this.cities = province.cities
                }
            });
        },

        enterQr() {
            this.$store.commit('user/setData', { name: 'authEmail', payload: this.item.email });
            this.$PRXRouter().goTo('qrVerification');
        },

        uploadPrescription() {
            this.$store.commit('user/setData', { name: 'authEmail', payload: this.item.email });
            this.$PRXRouter().goTo('prescriptionVerification');
        },

        scan() {
            this.openQRReader(qr => {
                const body = {
                    qr_id: qr,
                    email: this.item.email
                };

                this.loadingDialog = true;

                axios.post('/api/care/verify/qr', body)
                .then(response => {
                    this.loadingDialog = false;
                    this.verificationDialog = false;
                    this.setToken(response.data.token, response.data.user);
                })
                .catch(error => {
                    this.loadingDialog = false;
                    this.verificationDialog = false;
                    this.errorMessage = error.response.data.errors.qr_id[0];
                    this.errorDialog = true;
                });
            })
        },

        cancel() {
            this.verificationDialog = false;
            this.$PRXRouter().goTo('login');
        },

        registerAccount() {
            this.$refs['loader'].show();
            const data = {
                city_id: this.item.city_id,
                province_id: this.item.province_id,
                region_id: this.item.region_id,
                first_name: this.item.first_name,
                last_name: this.item.last_name,
                mobile_number: this.item.mobile_number,
                password: this.item.password,
                email: this.item.email,
                password_confirmation: this.item.password_confirmation,
                zip: this.item.zip,
                landmark: this.item.landmark,
                street: this.item.street,
                unit: this.item.unit,
                referrer_code: this.item.referrer_code
            };

            this.policyDialog = false;
            this.termsAndConditionsDialog = false;        
            this.loading = true;

            axios.post('api/care/register', data)
            .then(response => {
                this.$refs['loader'].hide();
                this.loading = false;
                this.verificationDialog = true;
                this.verificationMessage = response.data.message;
            })
            .catch(error => {
                this.$refs['loader'].hide();                
                this.loading = false;
                this.errors = { ...error.response.data.errors };
                this.errorMessage = 'Invalid data.';
                this.errorDialog = true;                
            });
        },

        setToken(token, user) {
            this.setupPushNotif();
            window.axios.defaults.headers.common['Authorization'] = token;
            window.localStorage.setItem('authToken', token);
            this.$store.commit('user/setToken', token);
            window.localStorage.setItem('user', JSON.stringify(user));
            this.$PRXRouter().goTo('home');
            this.$store.commit('pageName/set', 'Home');
        }
    }
}
</script>
