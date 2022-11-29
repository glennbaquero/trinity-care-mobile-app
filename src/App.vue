<template>
<v-app>
    <div class="bg--white"
    :class="[
    { 'bg--f4f4f4':this.$PRXRouter().isOnRoute('login') },
    { 'bg--f4f4f4':this.$PRXRouter().isOnRoute('cartEdit') },
    { 'bg--f4f4f4':this.$PRXRouter().isOnRoute('cartCheckoutShipping') },
    { 'bg--f4f4f4':this.$PRXRouter().isOnRoute('cartPayment') },
    { 'bg--f4f4f4':this.$PRXRouter().isOnRoute('cartCheckoutSummary') }]"></div>
    <top-navigation ></top-navigation>
    <PRXProgressLoader></PRXProgressLoader>
    <v-main :class="renderPaddingClass()">

        <v-container fill-height pa-0 align-baseline>
            <router-view :key="$route.fullPath"></router-view>
        </v-container>

        <PRXAlert></PRXAlert>
        <PRXDialogLoader></PRXDialogLoader>
        <PRXToast></PRXToast>

        <Alert></Alert>

    </v-main> 
    <bottom-navigation></bottom-navigation>
    <template v-if="enableOpenTawk">
        <v-btn
        color="rgb(250, 191, 36)"
        dark
        medium
        fixed
        bottom
        right
        fab
        style="top: 85%; z-index: 4 !important"
        class="frm-elevation"
        @click="openTawk">
            <v-icon>forum</v-icon>
        </v-btn>
    </template>

    <Loader
        ref="initLoader"
    ></Loader>    

    <AcceptedConsultationPopUp
    ></AcceptedConsultationPopUp>

    <InvalidVersionModal
    :alert="outdated"
    :message="versionMessage.message"
    :download-link="versionMessage.downloadLink"
    ></InvalidVersionModal>

</v-app>
</template>

<script type="text/javascript">

import TopNavigation from './partials/TopNavigation.vue'
import BottomNavigation from './partials/BottomNavigation.vue'
import NetworkMixin from './assets/js/mixins/network.js';
import Loader from '@/components/Loader.vue';
import AcceptedConsultationPopUp from '@/components/consultations/AcceptedConsultationPopUp.vue';
import InvalidVersionModal from '@/components/versions/InvalidVersionModal.vue';

export default {

    components: {
        AcceptedConsultationPopUp,
        Loader,
        'top-navigation': TopNavigation,
        'bottom-navigation': BottomNavigation,
        InvalidVersionModal
    },

    computed: {
        fetchUrl() {
            return this.$PRXConfig().api.url + '/api/care/config/fetch';
        },

        enableOpenTawk() {
            if(!this.$PRXRouter().isOnRoute('login') && !this.$PRXRouter().isOnRoute('chats')) {
                return true;
            }
            return false;
        },

    },

    watch: {
        $route() {
            if(this.$route.name != 'news') {
                window.scroll(0, 0);
            }
        },
    },

    data() {
        return {
            minVersion: null,
            mobileVersion: null,
            v2parts: null,
            v1parts: null,
            outdated: false,
            versionMessage: {},
        }
    },

    mounted () {
        this.fetch();
        $('#tawkchat-container iframe').css('bottom', '74px')
        window.axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('authToken');
    },
    
    mixins: [ NetworkMixin ],

    methods: {
        fetch() {
            this.$refs['initLoader'].show();
            axios.post(this.fetchUrl)
            .then(({ data }) => {
                this.$refs['initLoader'].hide();
                this.$store.commit('api/set', data.routes);
                this.setItem('routes', data.routes);
                this.setItem('regions', data.regions);
                this.setItem('terms_and_condition', data.terms_and_condition, false);
                this.setItem('privacy', data.privacy, false);
                this.checkVersion(data.versions);
            }).catch(err => {
                this.$refs['initLoader'].hide();
                this.$PRX.alert.error(err, 'Network Error', 'options');
            })
        },

        openTawk() {
            var url = 'https://tawk.to/chat/5d9157ab6c1dde20ed0415d2/default/?$_tawk_popout=true';
            var options = 'hidden=no,location=no';
            const browser = cordova.InAppBrowser.open(url, '_blank', options);
        },

        renderPaddingClass() {
            let routeName = this.$route.name;

            if(routeName == 'login' || routeName == 'forgetPassword' || routeName == 'signup' || routeName == 'generic' ) {
                return "no__padding";
            }
            return "main__container";
        },

        /*
        |--------------------------------------------------------------------------
        | @Checkers
        |--------------------------------------------------------------------------
        */
        
        /**
         * Check app version
         * 
         * @param object versions
         */
        checkVersion(versions) {

            if(this.isIos) {
                this.minVersion = versions.ios.minimum_version;
                this.versionMessage.message = versions.ios.message;
                this.versionMessage.downloadLink = versions.ios.download_link;
            } else {
                this.minVersion = versions.android.minimum_version;
                this.versionMessage.message = versions.android.message;
                this.versionMessage.downloadLink = versions.android.download_link;                
            }

            /** Get installed app version */
            this.mobileVersion = this.app_version;

            this.v1parts = this.mobileVersion.split('.'), this.v2parts = this.minVersion.split('.');
        
            const maxLen = Math.max(this.v1parts.length,this.v2parts.length);
            let part1, part2, cmp = 0;
            
            for(var i = 0; i < maxLen && !cmp; i++) {

                part1 = parseInt(this.v1parts[i], 10) || 0;
                part2 = parseInt(this.v2parts[i], 10) || 0;

                if(part1 < part2)
                    cmp = 1;
                if(part1 > part2)
                    cmp = -1;
            }

            var result = eval('0' + '>=' + cmp);

            result == false ? this.outdated = true : this.outdated = false;

        },

    },
}
</script>
<style type="text/css"></style>
