<template>
<v-layout row wrap mx-0 align-content-start class="auth__account">
    <v-container px-5 py-7 class="auth__account-TopCon frm-elevation">
        <v-flex xs12 text-center my-4>
            <div class="auth__account-ImgCon">
                <v-img :lazy-src="profileImage" :src="profileImage" class="mx-auto" width="100px" height="100px"></v-img>
            </div>
        </v-flex>
        <v-flex xs12 text-center mb-4>
            <h2 class="type-black">{{ name }}</h2>
        </v-flex>
    </v-container>

    <v-layout py-3 wrap class="auth__tabCon bg-lightGray">
        <v-flex xs12 text-center>
            <v-tabs v-model="tab" centered hide-arrows>
                <v-tabs-slider color="#3B823E"></v-tabs-slider>
                <v-tab href="#tab1">
                    <h4>Basic Info</h4>
                </v-tab>
                <v-tab href="#tab2">
                    <h4>Security</h4>
                </v-tab>
                <v-tab href="#tab3" @click="order_key++">
                    <h4>Orders</h4>
                </v-tab>
                <v-tab href="#tab4">
                    <h4>Settings</h4>
                </v-tab>
            </v-tabs>
        </v-flex>
    </v-layout>

    <v-layout wrap class="auth__tabItemsCon">
        <v-flex xs12>
            <v-tabs-items v-model="tab">
                <!-- BASIC_INFO -->
                <BasicInfo @showSuccessDialog="showSuccessDialog" />
                <!-- END_BASIC_INFO -->

                <!-- SECURITY -->
                <Password @showSuccessDialog="showSuccessDialog" @showErrorDialog="showErrorDialog"/>
                <!-- END_SECURITY -->

                <!-- ORDERS -->
                <v-tab-item value="tab3" class="auth__tabOrdersCon">
                    <order :key="order_key"></order>
                </v-tab-item>
                <!-- END_ORDERS -->

                <!-- SETTINGS -->
                <v-tab-item value="tab4" class="auth__tabSettingsCon">

                    <!-- ONGOING ORDERS -->
                    <v-layout pa-5 mb-2 wrap class="backgroundColor--white frm-elevation">
                        <v-flex xs6 mb-6>
                            <h3>Promos</h3>
                        </v-flex>
                        <v-flex xs4 mb-6></v-flex>
                        <v-flex xs2 mb-6 text-right class="cstm-switch">
                            <v-switch v-model="promo_switch" inset hide-details mt-0></v-switch>
                        </v-flex>
                        <v-flex xs12>
                            <p class="type-gray mb-0">Receive latest offers and promos from TrinityCare</p>
                        </v-flex>
                    </v-layout>
                    <v-layout pa-5 mb-10 wrap class="backgroundColor--white frm-elevation">
                        <v-flex xs6 mb-6>
                            <h3>Uploaded Articles</h3>
                        </v-flex>
                        <v-flex xs4 mb-6></v-flex>                        
                        <v-flex xs2 mb-6 text-right class="cstm-switch">
                            <v-switch v-model="article_switch" inset hide-details mt-0></v-switch>
                        </v-flex>
                        <v-flex xs12>
                            <p class="type-gray mb-0">Receive updates on latest news and articles</p>
                        </v-flex>
                    </v-layout>
                </v-tab-item>
                <!-- END_SETTINGS -->

            </v-tabs-items>
        </v-flex>
    </v-layout>

    <Loader
    ref="loader"
    ></Loader>

    <!-- COMPONENT_DIALOG_SUCCESS -->
    <SuccessDialog
    :show="successDialog"
    :message="message"
    :image="image"
    @close="redirectToProfile"
    />
</v-layout>
</template>

<script>

import Loader from '@/components/Loader.vue';
import BasicInfo from '../profile/BasicInfo';
import Password from '../profile/Password';
import Order from '../profile/Order';
import SuccessDialog from '@/components/SuccessDialog';
import ErrorDialog from '@/components/ErrorDialog';
import EmptyFrame from '@/components/substitute/EmptyFrame';

export default {

    components: { 
        Loader,
        BasicInfo, 
        Password, 
        SuccessDialog, 
        EmptyFrame, 
        ErrorDialog,
        Order,
    },


    computed: {
        name() {
            const { first_name, last_name } = JSON.parse(window.localStorage.getItem('user'));
            return `${first_name} ${last_name}`;
        },

        user_id() {
            const { id } = JSON.parse(window.localStorage.getItem('user'));
            return `${id}`;
        },

        profileImage() {
            const localImage = JSON.parse(window.localStorage.getItem('user')).image_path;
            const storeImage = this.$store.getters['user/info'].image_path;

            if (!this.checkURL(localImage)) {
                return this.$PRXConfig().staticUrl('images/default.png');
            }

            else {
                return localImage;
            }
        },
        settings() {
            return JSON.parse(window.localStorage.getItem('settings'));
        },

    },

    watch: {

        promo_switch(value) {

            if(this.init_status == true && this.tab == 'tab4') {
                this.updateSetting();
            }

        },

        article_switch(value) {

            if(this.init_status == true && this.tab == 'tab4') {
                this.updateSetting();
            }

        },

        tab() {
            if(this.tab == 'tab3') {
                let params = 'orders';
                this.$router.replace({ name: 'profile', params : { params } });                
            }
        },
    },

    data () {
        return {
            tab: null,
            init_status:false,
            successDialog: false,
            errorDialog: false,
            message: null,
            image: null,
            redirectTo: null,
            promo_switch: false,
            article_switch: true,
            order_key : 0,
        }
    },


    mounted() {

        this.init();

        if(this.$route.params.params && this.$route.params.params == 'orders') {
            this.tab = 'tab3';
        }

        if(this.$route.params.params && this.$route.params.params == 'settings') {
            this.tab = 'tab4';
        }

    },

    methods: {

        init(){
            this.promo_switch = this.settings.promo;
            this.article_switch = this.settings.uploaded_article;
            this.init_status = true;
            this.$store.commit('setTopNav/set', 'Profile');
        },

        showSuccessDialog(message) {
            this.successDialog = true;
            this.message = message;
            this.image = 'icons/Check.svg';
        },

        showErrorDialog(message) {
            this.errorDialog = true;
            this.message = message;
            this.image = 'icons/prompt.svg';
        },

        redirectToProfile() {
            this.successDialog = false;
        },

        closeDialog() {
            this.successDialog = false;
        },

        updateSetting() {

            this.$refs['loader'].show();

            var data = {
                promo: this.promo_switch,
                uploaded_article: this.article_switch
            };

            axios.post(this.routes['api.care.setting.update'], data)
                .then(response => {
                    this.$refs['loader'].hide();                    
                    window.localStorage.setItem('settings',JSON.stringify(response.data.settings))
                }).catch((err) => {
                    this.$refs['loader'].hide();                    
                    console.log(err);
                });

        },

        checkURL(url) {
            return(url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null);
        }

    }
}
</script>
