<template>
  <v-container pa-0>
    <v-container pa-0 v-show="showNotification">
      <v-flex xs12>
        <v-img
          class="white--text home__fr1Con"
          height="150px"
          :src="bannerImage"
        >
          <v-list two-line class="cstm-bg-transparent">
            <v-list-item @click="$PRXRouter().goTo('notification')">
              <v-list-item-avatar class="align-self-start mt-0">
                <v-img :src="$PRXConfig().staticUrl('icons/delivery-truck.svg')" class="mx-auto auth__ordersListImg" width="40px" height="40px" contain></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title><h3 class="type-white mb-4">{{ title }}</h3></v-list-item-title>
                <p class="mb-2 type-white" v-html="message"></p>
              </v-list-item-content>

              <v-list-item-action class="align-self-start">
                <v-list-item-subtitle><p class="mb-0 type-white"><i class="fas fa-angle-up"></i></p></v-list-item-subtitle>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-img>
      </v-flex>
    </v-container>

      <v-row class="px-4 py-5" no-gutters>
          <template v-if="doctors.length">
            <v-col cols="12" class="pa-0 mb-3">
                <div class="d-flex">
                    <div class="width--50">
                        <p class="font-weight-semibold mb-2">Linked Doctors</p>
                    </div>
                    <div 
                    @click="viewAllDoctors"
                    class="text-right width--50">
                        <p class="font-weight-semibold mb-2 text-darkgreen">View All</p>
                    </div>                    
                </div>
                <template v-for="doctor in doctors">
                  <v-card 
                  @click="selectDoctor(doctor)"
                  class="frm-card border-radius--10 box-shadow--30 mb-2" width="100%">
                      <v-list-item two-line>
                          <v-list-item-avatar>
                              <v-img
                              class="elevation-0"
                              :lazy-src="doctor.full_image"
                              :src="doctor.full_image"
                              ></v-img>
                          </v-list-item-avatar>
                          <v-list-item-content>
                              <v-list-item-title class="font-weight-semibold">{{ doctor.fullname }}</v-list-item-title>
                              <v-list-item-subtitle class="font-size-small">{{ doctor.specialization_name }}</v-list-item-subtitle>
                          </v-list-item-content>
                      </v-list-item>
                  </v-card>
                </template>
                <div class="frm-btn text-right mt-4">
                    <v-btn
                    @click="confirmDialog = true"
                    rounded
                    dark
                    elevation="elevation-0"
                    min-height="42"
                    class="btn--green px-12">Scan QR</v-btn>
                </div>
            </v-col>
          </template>
          <!-- P5 Menu -->
          <v-col cols="12" class="pa-0 mb-3">
              <p class="font-weight-semibold mb-2">Menu</p>
              <div class="d-flex hm-frm__menu">
                  <v-card @click="navigate('online-consultation')" class="frm-card border-radius--10 box-shadow--30 mb-2 text-center pa-4">
                      <v-img
                      width="40"
                      height="40"
                      contain
                      class="elevation-0 mx-auto mb-2 cstm-button-radius-0"
                      :src="$PRXConfig().staticUrl('icons/home/ic-hm-consult-with-doctor.png')"
                      ></v-img>
                      <p class="font-weight-semibold mb-0">Consult a Doctor</p>
                  </v-card>
                  <v-card @click="navigate('product')" class="frm-card border-radius--10 box-shadow--30 mb-2 text-center pa-4">
                      <v-img
                      width="40"
                      height="40"
                      contain
                      class="elevation-0 mx-auto mb-2 cstm-button-radius-0"
                      :src="$PRXConfig().staticUrl('icons/home/ic-hm-pharmacy-online.png')"
                      ></v-img>
                      <p class="font-weight-semibold mb-0">Products</p>
                  </v-card>
                  <v-card @click="navigate('health')" class="frm-card border-radius--10 box-shadow--30 mb-2 text-center pa-4">
                      <v-img
                      width="40"
                      height="40"
                      contain
                      class="elevation-0 mx-auto mb-2 cstm-button-radius-0"
                      :src="$PRXConfig().staticUrl('icons/home/ic-hm-my-health.png')"
                      ></v-img>
                      <p class="font-weight-semibold mb-0">My Health</p>
                  </v-card>
                  <v-card @click="navigate('reward')" class="frm-card border-radius--10 box-shadow--30 mb-2 text-center pa-4">
                      <v-img
                      width="40"
                      height="40"
                      contain
                      class="elevation-0 mx-auto mb-2 cstm-button-radius-0"
                      :src="$PRXConfig().staticUrl('icons/home/ic-hm-trinity-reward.png')"
                      ></v-img>
                      <p class="font-weight-semibold mb-0">Trinity Rewards</p>
                  </v-card>
                  <v-card @click="navigate('linkDoctorView')" class="frm-card border-radius--10 box-shadow--30 mb-2 text-center pa-4">
                      <v-img
                      width="40"
                      height="40"
                      contain
                      class="elevation-0 mx-auto mb-2 cstm-button-radius-0"
                      :src="$PRXConfig().staticUrl('icons/home/ic-hm-my-doctor.png')"
                      ></v-img>
                      <p class="font-weight-semibold mb-0">My Doctors</p>
                  </v-card>
                  <v-card @click="ewalletShow()" class="frm-card border-radius--10 box-shadow--30 mb-2 text-center pa-4">
                      <v-img
                      width="40"
                      height="40"
                      contain
                      class="elevation-0 mx-auto mb-2 cstm-button-radius-0"
                      :src="$PRXConfig().staticUrl('icons/home/ic-hm-wallet.png')"
                      ></v-img>
                      <p class="font-weight-semibold mb-0">E-Wallet</p>
                  </v-card>
                  <v-card @click="navigate('profile', 'settings')" class="frm-card border-radius--10 box-shadow--30 mb-2 text-center pa-4">
                      <v-img
                      width="40"
                      height="40"
                      contain
                      class="elevation-0 mx-auto mb-2 cstm-button-radius-0"
                      :src="$PRXConfig().staticUrl('icons/home/ic-hm-setting.png')"
                      ></v-img>
                      <p class="font-weight-semibold mb-0">App Settings</p>
                  </v-card>
                  <v-card @click="navigate('profile', 'orders')" class="frm-card border-radius--10 box-shadow--30 mb-2 text-center pa-4">
                      <v-img
                      width="40"
                      height="40"
                      contain
                      class="elevation-0 mx-auto mb-2 cstm-button-radius-0"
                      :src="$PRXConfig().staticUrl('icons/home/ic-hm-my-order.png')"
                      ></v-img>
                      <p class="font-weight-semibold mb-0">My Orders</p>
                  </v-card>
                  <v-card @click="navigate('myvouchers')" class="frm-card border-radius--10 box-shadow--30 mb-2 text-center pa-4">
                      <v-img
                      width="40"
                      height="40"
                      contain
                      class="elevation-0 mx-auto mb-2 cstm-button-radius-0"
                      :src="$PRXConfig().staticUrl('icons/home/ic-hm-voucher.png')"
                      ></v-img>
                      <p class="font-weight-semibold mb-0">Vouchers</p>
                  </v-card>
              </div>
          </v-col>

          <!-- P5 Dashboard -->
          <v-col cols="12" class="pa-0 mb-3">
              <p class="font-weight-semibold mb-2">Dashboard</p>
              <div class="d-flex hm-frm__menu">
                  <v-card @click="$PRXRouter().goTo('rewardPointEarned')" class="frm-card border-radius--10 box-shadow--30 mb-2 text-center pa-4">
                      <v-img
                      width="40"
                      height="40"
                      contain
                      class="elevation-0 mx-auto mb-2"
                      :src="$PRXConfig().staticUrl('icons/home/ic-hm-points-earned.svg')"
                      ></v-img>
                      <h3 class="font-weight-semibold">{{ totalPoints }}</h3>
                      <p class="font-size-small font-weight-regular mb-0">Points Earned</p>
                  </v-card>
                  <v-card @click="viewOngoingOrders" class="frm-card border-radius--10 box-shadow--30 mb-2 text-center pa-4">
                      <v-img
                      width="40"
                      height="40"
                      contain
                      class="elevation-0 mx-auto mb-2"
                      :src="$PRXConfig().staticUrl('icons/home/ic-hm-ongoing-orders.svg')"
                      ></v-img>
                      <h3 class="font-weight-semibold">{{ ongoingOrdersCount }}</h3>
                      <p class="font-size-small font-weight-regular mb-0">Ongoing Orders</p>
                  </v-card>
              </div>
          </v-col>

          <!-- P5 Featured Products -->
          <v-col cols="12" class="pa-0 mb-3">
              <div class="d-flex">
                  <div class="width--50">
                      <p class="font-weight-semibold mb-2">Featured Products</p>
                  </div>
                  <div class="text-right width--50">
                      <p class="font-weight-semibold mb-2 text-darkgreen" @click="navigate('product')">View All</p>
                  </div>                    
              </div>
              <template v-if="!products.length">
                <v-flex xs12 text-center my-10>
                  <p class="general__text color-gray mb-0"><b>No products yet.</b></p>
                </v-flex>
              </template>
              <template v-else>
                  <div class="d-flex hm-frm__menu">
                      <v-card v-for="(product, p) in products" :key="p" @click="viewProduct(product)" class="frm-card border-radius--10 box-shadow--30 mb-2 text-center pa-4">
                          <v-img :lazy-src="product.full_image" :src="product.full_image" height="120" contain></v-img>
                          <v-card-text class="text-center pb-0">
                              <p class="font-weight-bold type-black mb-0">{{ product.name }}</p>
                              <h4 class="font-weight-regular type-gray mb-0">₱ {{ product.price }}</h4>
                          </v-card-text>
                      </v-card>
                  </div>
              </template>
          </v-col>

          <!-- P5 - Articles -->
          <v-col cols="12" class="pa-0 mb-3">
              <p class="font-weight-semibold mb-2">Articles</p>
              <template v-if="!articles.length">
                <v-flex xs12 text-center my-10>
                  <p class="general__text color-gray mb-0"><b>No articles yet.</b></p>
                </v-flex>
              </template>
              <v-tabs v-else v-model="tab" :show-arrows="false" class="slider_con">
                  <v-tabs-slider color="transparent"></v-tabs-slider>
                  <v-tab href="#tab1" class="pb-5 pt-0 pr-2 pl-2" v-for="(article, a) in articles" :key="a">
                      <v-card class="frm-card border-radius--10 box-shadow--10" min-height="320" height="320">
                          <v-img 
                            :lazy-src="article.full_image" 
                            :src="article.full_image" 
                            min-height="150" max-height="150">
                            <template v-slot:placeholder>
                              <v-row class="fill-height ma-0" align="center" justify="center">
                                  <v-progress-circular indeterminate color="#3B823E"></v-progress-circular>
                              </v-row>
                           </template>
                          </v-img>
                          <v-card-text class="text-left" style="height:30%">
                            <p class="font-weight-bold text-darkgreen mb-0 slider__text--2">{{ article.title }}</p>
                            <p  class="font-weight-regular text-black mb-0 slider__text--3" v-html="article.short_overview"></p>
                          </v-card-text> 
                          <div class="frm-btn px-4 py-4">
                              <v-btn 
                              block 
                              rounded
                              dark
                              elevation="elevation-0"
                              min-height="30"
                              @click="viewArticle(article)"
                              class="btn--green mt-2">Read More
                              </v-btn>
                          </div>
                      </v-card>
                  </v-tab>
              </v-tabs>
          </v-col>
          
          <v-dialog
            v-model="loading"
            persistent
            width="300"
          >
            <v-card
              color="#3B823E"
              dark
            >
              <v-card-text>
                Please wait
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>

      <ConfirmationDialog
        :show="confirmDialog"
        message="Please select an option"
        image="icons/prompt.svg"
        :default-slot="false"
        @close="confirmDialog = false"
      >
        <v-card-actions class="pa-0 flex-wrap justify-space-between">
          <v-btn
            class="button v-btn--square mb-3 ml-0"
            color="#3B823E"
            flat
            depressed
            dark
            @click="$PRXRouter().goTo('addNewQr')"
            width="200px">
            <div class="d-flex flex-wrap">
              <v-img :src="$PRXConfig().staticUrl('icons/click-icon.png')" class="mx-auto text-center mb-4" width="60px" height="60px"></v-img>
              <span>Enter Dr's QR</span>
            </div>
          </v-btn>
          <v-btn
            class="button v-btn--square mb-3 ml-0"
            color="#3B823E"
            flat
            depressed
            dark
            @click="scan"
            width="200px">
            <div class="d-flex flex-wrap">
              <v-img :src="$PRXConfig().staticUrl('icons/qr-icon.png')" class="mx-auto text-center mb-4" width="60px" height="60px"></v-img>
              <span>Scan Dr's QR</span>
            </div>
          </v-btn>
          <v-btn
            class="button v-btn--square mb-3 mx-auto"
            style="width: 260px !important"
            color="#3B823E"
            flat
            depressed
            dark
            @click="confirmDialog = false"
            width="200px">
            <div class="d-flex flex-wrap">
              <v-img :src="$PRXConfig().staticUrl('icons/cancel-icon.png')" class="mx-auto text-center mb-4" width="60px" height="60px"></v-img>
              <span>Cancel</span>
            </div>
          </v-btn>
        </v-card-actions>
      </ConfirmationDialog>

      <!-- Dialog for no ongoing order -->
      <ConfirmationDialog
        :show="showDialog"
        message="You have no ongoing order"
        image="icons/prompt.svg"
        left-button-text="View Order History"
        right-button-text="Start shopping"
        @cancel="$PRXRouter().goTo('profile')"
        @proceed="$PRXRouter().goTo('product')"
        @close="showDialog = false"
      />

      <!-- COMPONENT_DIALOG_SUCCESS -->
      <SuccessDialog
        :show="successDialog"
        :message="`You have successfully linked your ${doctor}`"
        image="icons/Check2.svg"
        @close="successDialog = false"
      />
      <!-- END_COMPONENT_DIALOG_SUCCESS -->

      <ErrorDialog
        :show="errorDialog"
        :message="errorMessage"
        @close="errorDialog = false"
      />


      <!-- Ewallet Component -->
      <Ewallet
      ref="ewallet"
      ></Ewallet>

      <Loader
        ref="loader"
      ></Loader>

      </v-row>
  </v-container>
</template>

<script>
import SuccessDialog from '@/components/SuccessDialog';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import ErrorDialog from '@/components/ErrorDialog';
import { bus } from '../assets/js/EventBus.js';
import QrMixin from '@/assets/js/mixins/qr.js';
import Ewallet from './ewallet/Ewallet.vue';
import Loader from '@/components/Loader.vue';
import VuePullRefresh from 'vue-pull-refresh';

export default {
    data() {
      return {
        bannerImageChanged: false,
        tab: null,
        confirmDialog: false,
        successDialog: false,
        errorDialog: false,
        errorMessage: null,
        doctor: null,
        notification: {},
        showDialog: false,
        ewalletView: false,
        loading: false,
        panel: false,
      }
    },

    components: { 
      SuccessDialog, 
      ConfirmationDialog, 
      ErrorDialog, 
      Ewallet, 
      Loader,
      VuePullRefresh, 
    },

    created() {
      bus.$on('new_notification', data => {
        this.initializeData();

        if(this.isIos === 'iOS') {
          this.bannerImage = data.sound != ".caf" ? this.renderImage(data.sound) : this.$PRXConfig().staticUrl('images/notif.png');
          this.bannerImageChanged = data.sound != ".caf" ? true : false;
        } else {
          this.bannerImage = data.sound != "mySound" ? this.renderImage(data.sound) : this.$PRXConfig().staticUrl('images/notif.png');
          this.bannerImageChanged = data.sound != "mySound" ? true : false;
        }

      })
    },

    computed: {
        showNotification() {
          return this.$store.state.notificationReceive.show;
        },
        message() {
          return this.$store.state.notificationReceive.message;
        },
        title() {
          return this.$store.state.notificationReceive.title;
        },
        bannerImage() {
          var img = this.$PRXConfig().staticUrl('images/notif.png');

          if(this.isIos === 'iOS') { 
            if(!_.isEmpty(this.$store.state.notificationReceive.bannerImage) && this.$store.state.notificationReceive.bannerImage != ".caf") {
              this.bannerImageChanged = true;
              img = this.renderImage(this.$store.state.notificationReceive.bannerImage);
            }
          } else {
            if(!_.isEmpty(this.$store.state.notificationReceive.bannerImage) && this.$store.state.notificationReceive.bannerImage != "mySound") {
              this.bannerImageChanged = true;
              img = this.renderImage(this.$store.state.notificationReceive.bannerImage);
            } 
          }

          return img;
        },

        totalPoints() {
          return this.$store.getters['api/total_points'];
        },
        
        ongoingOrdersCount() {
          return this.$store.getters['api/ongoing_orders'];
        },
        products() {
          return this.$store.getters['api/products'].slice(0, 5);
        },

        articles() {
          return this.$store.getters['api/articles'].slice(0, 5);
        },

        doctors() {
          return this.$store.getters['api/doctors'].slice(0, 3);
        },

        alldoctors() {
          return this.$store.getters['api/doctors'];
        }
    },

    ready() {
        var $this = this;
            setInterval(function() {
                $this.$store.commit('notificationReceive/set', false);
            }, 1000);
      },

    mounted() {
        this.$refs.loader.show();
        this.initializeData();
    },

    mixins: [ QrMixin ],

    methods: {

      /*
      |--------------------------------------------------------------------------
      | @Initialize
      |--------------------------------------------------------------------------
      */

      /**
       * Initialize data
       * 
       */
      initializeData() {

        let postData = {
          date: moment().format("YYYY-MM-DD"),
        };

        axios.post(this.routes['api.care.home'], postData)
          .then(({ data }) => {
            const keys = Object.keys(data);
            this.setItem('points', data.total_points);
            this.setItem('bankDetails', data.bank_details);

            keys.forEach(key => {
              const payload = data[key].constructor === Array ? [ ...data[key] ] : data[key];
              this.$store.commit('api/fetchData', { key, payload });
            });

            this.$refs.loader.hide();
          })
          .catch(error => {
            this.$refs.loader.hide();
            if(error.response.status === 401) {
                window.localStorage.removeItem('authToken');
                window.localStorage.removeItem('pushnotifs/setToken');
                window.axios.defaults.headers.common['Authorization'] = null;
                this.$router.replace({ name: 'login' })
            }
          });
      },

      /**
       * Initialize tawk.to
       * 
       */
      initializeChat() {
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/5d9157ab6c1dde20ed0415d2/default';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
      },

      /*
      |--------------------------------------------------------------------------
      | @Methods
      |--------------------------------------------------------------------------
      */

      /**
       * Scan doctor QR Code
       * @return {[type]} [description]
       */
      scan() {
        this.openQRReader(qr => {
          this.$refs['loader'].show();
          axios.post(this.routes['api.care.doctor.scan'], { qr_id: qr })
            .then(response => {
              this.$refs['loader'].hide();
              this.successMessage = response.data.message;
              this.successDialog = true;
              this.doctor = response.data.specialization;
              this.$store.commit('api/updateDoctors', response.data.doctor);
            })
            .catch(error => {
              this.$refs['loader'].hide();              
              this.errorMessage = error.response.data.errors.qr_id[0];
              this.errorDialog = true;
            });
        });
      },

      /**
       * Select doctor
       * 
       * @param object doctor
       */
      selectDoctor(doctor) {
        this.$store.commit('viewDoctors/setSelected', doctor);
        this.$PRXRouter().goTo('doctor-profile');          
      },

      /**
       * Set panel status
       * 
       */
      setPanel() {
        if(this.panel) {
          this.panel = false;
        } else {
          this.panel = true;
        }
      },
      
      /**
       * Navigate to specific vue components
       * 
       * @param  string route
       * @param  string params
       */
      navigate(route, params = null) {
        if (!params) {
          this.$PRXRouter().goTo(route);
        } else {
          this.$router.replace({ name: 'profile', params : { params } });            
        }
      },

      /**
       * View ongoing orders
       * 
       */
      viewOngoingOrders() {
        const redirectTo = this.ongoingOrdersCount ? this.$PRXRouter().goTo('ongoingOrders') : this.showDialog = true;
      },

      /**
       * View product
       * 
       * @param  object  product
       */
      viewProduct(product) {
        this.$store.commit('selectedProduct/set', product);
        this.$PRXRouter().goTo('productView');
      },

      /**
       * View article
       * 
       * @param  object item
       */
      viewArticle(item) {
        this.$store.commit('selectedArticle/set', item);
        this.$PRXRouter().goTo('newsView');
      },

      /**
       * View all doctors
       * 
       */
      viewAllDoctors() {
        this.$store.commit('viewDoctors/set', this.alldoctors);
        this.$PRXRouter().goTo('linkDoctorView');
      },
      
      /**
       * Refresh data
       * 
       */
      onRefresh() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.initializeData();
              resolve();
            }, 1000);
        });
      },

      /*
      |--------------------------------------------------------------------------
      | @Renders
      |--------------------------------------------------------------------------
      */
      /**
       * Render image
       * 
       * @param  string image
       */
      renderImage(image) {
        var exact_path = this.$PRXConfig().staticUrl('images/notif.png')          
        return exact_path;
      },

    }
}
</script>
