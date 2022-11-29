<template>
    <v-container fill-height pa-0>
        <v-layout row wrap mx-0 align-content-start class="notification__con bg-lightGray">
            <v-container pa-5>
                <v-flex xs12 mb-1>
                    <h3>Notifications</h3>
                </v-flex>
                <v-flex xs12 mb-2>
                    <v-list two-line class="cstm-bg-transparent">
                        <v-list-item class="mb-3 cstm-elevation-2 backgroundColor--white cstm-border-radius-10" v-for="(notification, key) in notifications"
                            @click="viewNotification(notification,key)" :key="key">
                            <v-list-item-avatar>
                                <v-img :src="$PRXConfig().staticUrl('icons/pricetag.svg')" class="mx-auto auth__ordersListImg" width="40px" height="40px"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content class="pr-5">
                                <v-list-item-title><h4 class="type-green">{{ notification.data['title'] }}</h4></v-list-item-title>
                                <v-list-item-subtitle><h4 class="mb-0" v-html="notification.data['message']"></h4></v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action v-if="notification.read_at == null">
                                <v-list-item-subtitle class="notification__notif"><span class="mb-0 type-green"></span></v-list-item-subtitle>
                            </v-list-item-action>

                        </v-list-item>

                        <infinite-loading class="mt-3" :identifier="infiniteId" @infinite="init" ref="infiniteLoading">
                            <span slot="spinner">
                              <template v-if="this.page > 1">
                                <v-img class="mx-auto" :src="$PRXConfig().staticUrl('images/loading.gif')" width="40px" ></v-img>
                              </template>
                            </span>
                            <div slot="no-more" class="general__text color-gray">
                                <template v-if="this.page == 1 && this.notifications.length <= 10">
                                     No more notifications found.
                                </template>
                            </div>
                        </infinite-loading>

                    </v-list>
                </v-flex>
            </v-container>
        </v-layout>

    <Loader
    ref="loader"
    ></Loader>
    </v-container>

</template>

<script>

import Loader from '@/components/Loader.vue';
import { bus } from '@/assets/js/EventBus.js';

export default {

    components: {
        Loader,
    },

    computed: {
        notifications() {
            return this.$store.state.tempStorage.notifications.items;
        },

        page() {
            return this.$store.state.tempStorage.notifications.page;
        },
    },

    data: () => ({
        infiniteId: +new Date(),
        loading: false,
        loaded: false,
        complete : false,
        hasLoading : true,
    }),

    filters: {
        title(value) {
            return JSON.parse(value).title;
        },

        message(value) {
            return JSON.parse(value).message;
        }
    },

    mounted() {
        if(!this.notifications.length) {
            this.$refs['loader'].show();
        }

        this.eventHandler();
    },

    methods: {

        /*
        |--------------------------------------------------------------------------
        | @Initialize
        |--------------------------------------------------------------------------
        */

        /**
         * Initialize data
         * 
         * @param  object $state
         */
        init($state) {
            if(this.page > 1){
                 this.loading = true;
            }

            axios.post(this.routes['api.care.notifications'], { page: this.page })
            .then(response => {
                this.$refs['loader'].hide();
                var items = response.data.items.data;
                if(items.length) {
                    
                    this.$store.commit('tempStorage/setNotifications', {
                        'page': this.page + 1,
                        'items': items
                    });

                    $state.loaded();
                    this.loading = false;
                }else {
                    $state.complete();
                    this.complete = true;
                }
                this.hasLoading = true;
            }).catch((err) => {
                this.loaded = true;
                this.$refs['loader'].hide();
            }).finally(() => {
                this.loading = false;
                this.$refs['loader'].hide();
            });
        },

        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        /**
         * View specific notification
         * 
         * @param  object notification
         * @param  int key
         */
        viewNotification(notification, key) {
            var data = {
                id: notification.id
            }

            this.$store.commit('selectedNotification/set', notification);
            this.$PRXRouter().goTo('notificationView');

            if(!this.notifications[key].read_at) {
                let notifCount = this.$store.state.api.notification_count - 1;
                if(notifCount >= 0) {
                    this.$store.commit("api/updateNotifCount", notifCount);                    
                }
            }

            this.notifications[key].read_at = 'read';
            axios.post(this.routes['api.care.notification.read'], data)
                .then(response => {
                    this.init();
            }).catch((err) => {
                console.log(err);
            })
        },

        eventHandler() {
            bus.$on('new_notification');
            this.$store.commit('tempStorage/resetNotifications');
            this.$refs.infiniteLoading.stateChanger.reset();                        
        },
    }
}
</script>
