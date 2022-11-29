<template>
  <div class="header"
    :class="{ 'profileHeader': $PRXRouter().isOnRoute('profile')
    || $PRXRouter().isOnRoute('editAddress')
    || $PRXRouter().isOnRoute('addAddress') }"
    v-show="!$PRXRouter().isOnRoute('login') && !$PRXRouter().isOnRoute('forgetPassword') && !$PRXRouter().isOnRoute('signup')"
  >
    <!-- Top Navigation -->

    <!-- Home Navigation -->
    <v-app-bar app color="white" dark class="px-5 frm-elevation" height="70px">
      <template v-if="$PRXRouter().isOnRoute('product')">
        <v-btn @click="back()" icon readonly class="header__backCon">
          <v-icon>fa-chevron-left</v-icon>
        </v-btn>        
      </template>
      <template v-else>
        <v-btn @click="$PRXRouter().goTo('profile')" small text color="white" class="header__avatarCon pl-0">
          <v-img :lazy-src="profileImage" :src="profileImage"  class="mx-auto" width="40px" height="40px"></v-img>
        </v-btn>
      </template>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <h1 class="header-text type-black">{{ pageName }}</h1>

      <v-spacer></v-spacer>

      <v-btn @click="$PRXRouter().goTo('cartSummary')" class="header__cartCon elevation-0 px-2 pb-2" small :ripple="false">
        <v-img :src="$PRXConfig().staticUrl('icons/header/ic-header-cart.svg')" class="mx-auto elevation-0" width="25px" height="25px" contain></v-img>
        <small class="type-darkerGray">{{ cartItemsCount }}</small>
      </v-btn>
      <v-btn @click.stop="drawer = !drawer" class="header__cartCon header__menuCon type-2 elevation-0 pl-2 pr-0" small :ripple="false">
        <v-icon>fa-bars</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Inner Nav -->
    <v-app-bar app class="px-5 frm-elevation profile--header" height="70px" v-show="$PRXRouter().isOnRoute('profile') || $PRXRouter().isOnRoute('addAddress') || $PRXRouter().isOnRoute('editAddress') || $PRXRouter().isOnRoute('cartCheckout') || $PRXRouter().isOnRoute('cartCheckoutShipping') || $PRXRouter().isOnRoute('cartPayment') || $PRXRouter().isOnRoute('cartSummary') || $PRXRouter().isOnRoute('cartCheckoutSummary') || $PRXRouter().isOnRoute('paymentBankDeposit') || $PRXRouter().isOnRoute('newsView') || $PRXRouter().isOnRoute('linkDoctorViewrewardPointEarned') || $PRXRouter().isOnRoute('linkDoctorVieworderHistory') || $PRXRouter().isOnRoute('orderHistory') || $PRXRouter().isOnRoute('productView') || $PRXRouter().isOnRoute('notificationView') || $PRXRouter().isOnRoute('rewardPointEarned') || $PRXRouter().isOnRoute('rewardView') || $PRXRouter().isOnRoute('myvouchers') || $PRXRouter().isOnRoute('cartEdit')">

      <v-btn @click="back()" icon readonly class="header__backCon">
          <v-icon>fa-chevron-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <h1 class="header-text">{{ setTopNav }}</h1>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-app-bar app class="px-5 cstm-elevation-0 header profile--header" height="70px" v-show="$PRXRouter().isOnRoute('doctor-profile')">

      <v-btn @click="back()" icon readonly class="header__backCon">
          <v-icon>fa-chevron-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <h1 class="header-text">Doctor Profile</h1>

      <v-spacer></v-spacer>

      <div class="ewallet-iconHolder">
        <v-img 
        @click="openEwallet()"
        class="ewallet--icon mx-auto" width="25" height="25" :src="$PRXConfig().staticUrl('icons/header/ic-header-wallet.svg')"></v-img>
        <small>E-Wallet</small>
      </div>
    </v-app-bar>

    <!-- QR Scan -->
    <v-app-bar app color="white" dark class="px-5 frm-elevation" height="70px" v-show="$PRXRouter().isOnRoute('idScan')">

      <v-btn @click="$PRXRouter().goTo('home')" icon readonly class="header__backCon" v-if="!$PRXRouter().isOnRoute('home')">
          <v-icon>fa-chevron-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <h1 class="header-text">Link to a doctor</h1>

      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Ongoing Orders -->
    <v-app-bar app color="white" dark class="px-5 frm-elevation wew" height="70px" v-show="$PRXRouter().isOnRoute('ongoingOrders')">

      <v-btn @click="$PRXRouter().goBack()" icon readonly class="header__backCon" v-if="!$PRXRouter().isOnRoute('home')">
          <v-icon>fa-chevron-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <h1 class="header-text type-black">Ongoing Orders</h1>

      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Cancelled Orders -->
    <v-app-bar app color="white" dark class="px-5 frm-elevation wew" height="70px" v-show="$PRXRouter().isOnRoute('cancelledOrders')">

      <v-btn @click="$PRXRouter().goBack()" icon readonly class="header__backCon" v-if="!$PRXRouter().isOnRoute('home')">
          <v-icon>fa-chevron-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <h1 class="header-text type-black">Cancelled Orders</h1>

      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Completed Orders -->
    <v-app-bar app class="px-5 frm-elevation" height="70px" v-show="$PRXRouter().isOnRoute('completedOrders')">

      <v-btn @click="$PRXRouter().goBack()" icon readonly class="header__backCon" v-if="!$PRXRouter().isOnRoute('home')">
          <v-icon>fa-chevron-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <h1 class="header-text type-black">Completed Orders</h1>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      right
      fixed
    >
      <v-list dense class="px-6 py-4">
        <v-list-item class="mb-5">
          <h2>All Menu</h2>
        </v-list-item>

        <v-list-item link @click="goTo('online-consultation', 'Online Consultation')" :ripple="{ class: 'color-doc-primary2' }" class="py-2 my-1">
          <v-list-item-content class="py-0">
            <v-list-item-title class="font-weight-bold font-size-small">Online Consultation</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="goTo('health', 'My Health')" :ripple="{ class: 'color-doc-primary2' }" class="py-2 my-1">
          <v-list-item-content class="py-0">
            <v-list-item-title class="font-weight-bold font-size-small">MyHealth</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="openEwallet()" :ripple="{ class: 'color-doc-primary2' }" class="py-2 my-1">
          <v-list-item-content class="py-0">
            <v-list-item-title class="font-weight-bold font-size-small">E-Wallet</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$PRXRouter().goTo('referafriend')" :ripple="{ class: 'color-doc-primary2' }" class="py-2 my-1">
          <v-list-item-content class="py-0">
            <v-list-item-title class="font-weight-bold font-size-small">Refer to a friend</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="goTo('myvouchers', 'My Vouchers')" :ripple="{ class: 'color-doc-primary2' }" class="py-2 my-1">
          <v-list-item-content class="py-0">
            <v-list-item-title class="font-weight-bold font-size-small">My Vouchers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="goTo('help', 'Help')" :ripple="{ class: 'color-doc-primary2' }" class="py-2 my-1">
          <v-list-item-content class="py-0">
            <v-list-item-title class="font-weight-bold font-size-small">Help</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- E-wallet Component -->
    <Ewallet
    ref="ewallet"
    ></Ewallet>
    <!-- End of E-wallet Component -->

  </div>
</template>

<script>
  import { bus } from '@/assets/js/EventBus.js';
  export default {
    data() {
      return {
        image_key: 0,
        drawer: null,
        profileImage: this.$PRXConfig().staticUrl('images/default.png')
      }
    },

    computed: {
      cartItemsCount() {
        return this.$store.getters['api/cartItems'].length;
      },
      pageName() {
        switch(this.$route.name) {
          case 'home':
            return 'Home';
          break;
          case 'product':
            return 'Products';
          break;
          case 'notification':
            return 'Notifications';
          break;
          case 'reward':
            return 'Rewards';
          break;
          case 'health':
            return 'MyHealth';
          break;
          case 'referafriend':
            return 'Refer A Friend';
          break;
          case 'help':
            return 'Help';
          break;
          case 'online-consultation':
            return 'Online Consultation';
          break;
          case 'news':
            return 'News';
          break;
          case 'linkDoctorView':
            return 'Linked Doctors';
          break;
          case 'consult-doctor':
            return 'Consult A Doctor';
          break;
          case 'addNewQr': 
            return 'Link New Doctor';
          break;
        }
      },

      setTopNav() {
        return this.$store.state.setTopNav.name;
      },

    },

    mounted() {
      this.eventHandler();
      this.setProfileImage();
    },

    methods: {
      goTo(route, name) {
        this.$PRXRouter().goTo(route, name)
        this.$store.commit('pageName/set', name);
      },

      openEwallet() {
        this.drawer = false;
        this.$refs['ewallet'].show();
      },

      setProfileImage() {
        const localImage = JSON.parse(window.localStorage.getItem('user')).image_path;
        const storeImage = this.$store.getters['user/info'].image_path;

        if (localImage == "https://trinity-p5-uat.praxxys.ph") {
          this.profileImage = this.$PRXConfig().staticUrl('images/default.png');
        }
        else {
          this.profileImage = localImage;
        }
      },

      viewProfile() {
        let params = 'profile';
        this.$router.replace({ name: 'profile', params : { params } });
      },
      
      back() {
        
        if(this.$PRXRouter().isOnRoute('orderHistory')) {
          this.$PRXRouter().goBack();
          return;
        }
        if(this.$PRXRouter().isOnRoute('profile')) {
          this.$PRXRouter().goTo('home');         
        } else if (this.$PRXRouter().isOnRoute('addAddress') || this.$PRXRouter().isOnRoute('editAddress')) {
          this.$PRXRouter().goTo('profile');
        } else {
          this.$PRXRouter().goBack();
        }
      },

      eventHandler() {
        bus.$on('userLogin', () => {
          this.setProfileImage();
        });
      },

      checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null);
      }
      
    }

  }
</script>
