<template>
  <v-container fill-height pa-0>
    <v-layout row wrap mx-auto px-0 pt-0 align-content-start class="reward__con bg-lightGray">
      <v-layout row wrap mx-auto px-5 pt-5>
        <v-flex xs12 mb-1>
          <h3>Rewards</h3>
        </v-flex>
        <v-flex xs12 mb-4>
          <v-list class="cstm-bg-transparent">
            <v-list-item class="mb-2 frm-elevation backgroundColor--white cstm-border-radius-5 py-3"
              @click="$PRXRouter().goTo('rewardPointEarned')">
              <v-list-item-avatar>
                <v-img :src="$PRXConfig().staticUrl('icons/heart-2.svg')" class="mx-auto" width="40px" height="40px"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title><h4 class="type-2">Points Earned</h4></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-subtitle><h2>{{ points }} points</h2></v-list-item-subtitle>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-flex>
        <v-flex xs10 mb-5 class="reward__tabCon pr-4">
          <v-tabs v-model="tab" centered hide-arrows fixed-tabs class="backgroundColor--none">
            <v-tabs-slider color="#3B823E"></v-tabs-slider>
            <v-tab href="#tab1" class="ml-0">
              <h3 class="type-black">Rewards</h3>
            </v-tab>
            <v-divider vertical class="mx-3 align-self-center"></v-divider>
            <v-tab href="#tab2" class="mr-0" @click="redeemHistoryFetch">
              <h3 class="type-black">History</h3>
            </v-tab>
          </v-tabs>
        </v-flex>
        <v-flex xs2 mb-5 text-right class="button__icon--right" align-self-center>
          <v-btn class="button cstm-button-radius text-small" text depressed width="100%" color="transparent" dark @click.stop="drawer = !drawer">
            <v-img class="ml-3" :src="$PRXConfig().staticUrl('icons/filter.svg')" max-width="25" width="25" height="20" contain></v-img>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap mx-auto>
        <v-flex xs12>
          <v-tabs-items v-model="tab" class="reward__tabListCon">

            <!-- Rewards -->
            <v-tab-item value="tab1">
              <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid pa-5>
                <v-layout wrap class="slider_con">
                  <!-- PRODUCT_ARTICLE_COMPONENT -->
                  <v-flex
                    v-for="(item, key) in items"
                    :key="key"
                    xs6
                    mb-2
                    @click="viewMerchantProducts(item)"
                  >
                    <v-card text tile class="cstm-border-radius-10 frm-elevation pt-3">
                      <v-img contain :lazy-src="item.logo_url" :src="item.logo_url" height="150"></v-img>
                      <v-card-title class="text-center justify-center py-4"><h3 class="slider__text--1">{{ item.name }}</h3></v-card-title>
                    </v-card>
                  </v-flex>
                  <!-- END_PRODUCT_ARTICLE_COMPONENT -->
                </v-layout>
              </v-container>
            </v-tab-item>

            <!-- History -->
            <v-tab-item value="tab2">
              <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid pa-5>
                <v-layout wrap class="slider_con">
                  <!-- REWARD_ARTICLE_COMPONENT -->
                  <v-flex xs12 v-for="(redeem, rk) in redeems" :key="rk">
                    <v-card class="cstm-bg-transparent elevation-0" @click="viewEGift(redeem)">
                      <v-list class="pa-0 cstm-bg-transparent">
                        <v-list-item class="px-0">
                          <v-list-item-avatar class="ma-0" min-width="150px" width="150px" height="120px">
                            <v-img :lazy-src="redeem.image_path" :src="redeem.image_path" class="mx-auto cstm-border-radius frm-elevation" width="150px" height="120px"></v-img>
                          </v-list-item-avatar>
                          <v-list-item-content class="pa-5 align-self-start slider_con">
                            <h3 class="mb-2 type-darkerGray slider__text--2">{{ redeem.merchant_name }} {{ redeem.denomination_name }}</h3>
                            <p class="mb-2 slider__text--1">claimed on {{ parseDate(redeem.created_at) }}</p>
                            <p class="mb-2 slider__text--1"><span class="color-doc-primary2 mr-2 bold"><i class="fas fa-heart"></i> {{ redeem.value }}</span>reward points</p>
                            <h4 class="type-1">Pending</h4>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-flex>
                  <!-- END_REWARD_ARTICLE_COMPONENT -->
                </v-layout>
              </v-container>
            </v-tab-item>

          </v-tabs-items>
        </v-flex>
      </v-layout>

      <!-- Filter View -->
      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
        right
        class="filter__view"
        width="100%"
      >
        <v-list-item class="px-1 py-2 elevation-0 backgroundColor--white">
          <v-layout row wrap mx-auto class="filter__viewList">
            <v-flex xs2>
            </v-flex>
            <v-flex xs8 align-self-center text-center>
              <h2>Filter Options</h2>
            </v-flex>
            <v-flex xs2>
              <v-btn @click.stop="drawer = !drawer" icon readonly>
                <v-icon color="#D52E29">fa-times</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-list-item>
        <v-list-item class="pa-0 backgroundColor--white">
          <v-container pa-0 class="cstm-height-100">
            <v-layout row wrap mx-auto pa-5 class="filter__viewList">
              <v-flex xs12 mb-1>
                <h3>Features</h3>
              </v-flex>
              <!-- COMPONENT_FILTER_LIST -->
              <template v-for="(filter, fk) in filters">
                <v-flex xs11 mb-3 align-self-center>
                  <p class="mb-0">{{ filter.name }}</p>
                </v-flex>
                <v-flex xs1 mb-3>
                  <v-checkbox
                    v-model="category_id"
                    height="0"
                    color="#DA8924"
                    mt-0
                    :value="filter.category_id"
                    @change="filterRewards"
                  ></v-checkbox>
                </v-flex>
              </template>
              <!-- END_COMPONENT_FILTER_LIST -->
            </v-layout>
            <v-layout row wrap mx-auto pa-5 mb-12 class="filter__viewBtn">
              <v-flex xs12>
                <v-btn class="button cstm-button-radius text-small cstm-width type-gradient-l-r v-btn--large" depressed large dark @click="drawer = false">Display Result</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-list-item>
      </v-navigation-drawer>
    </v-layout>

    <Loader
    ref="loader"
    ></Loader>
    
  </v-container>
</template>

<script>
import Loader from '@/components/Loader.vue';
export default {

    components: {
      Loader,
  },
  data () {
    return {
      tab: null,
      size: 'lg',
      drawer: null,
      loading: false,
      items: [],
      // filters: [],
      redeems: [],
      category_id : null,
    }
  },

  computed: {
    points() {
      return this.getItem('points');
    },

    merchants() {
      return this.$store.state.merchants.items;
    },

    filters() {
      return this.$store.state.merchants.filterRewards;
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.getRewardsCategories();
    },

    getRewardsCategories() {
      // this.$store.commit('merchants/setFilter', [])
      this.$refs['loader'].show();
      if(this.merchants) {
        this.items = this.merchants;
        this.$refs['loader'].hide();
      } else {
        axios.post(this.routes['api.care.merchants'])
          .then(response => {
            // this.filters = response.data.categories;
            this.items = response.data.merchants;
            this.$refs['loader'].hide();
            // this.setItem('merchants', response.data.merchants);
            this.$store.commit('merchants/set', this.items)
            this.$store.commit('merchants/setFilter', response.data.categories)
          })
      }
      
    },

    filterRewards() {
      this.loading = true;

      var data = {
        categoryid: this.category_id
      };

      axios.post(this.routes['api.care.merchants'], data)
        .then(response => {
          this.items = response.data.merchants;
          this.loading = false;
          this.drawer = false
        })
    },

    viewMerchantProducts(item) {
      this.$store.commit('reward/set', item);
      this.$PRXRouter().goTo('rewardView');
    },

    redeemHistoryFetch() {
      this.loading = true;
      axios.post(this.routes['api.care.history.redeem'])
        .then(response => {
          this.redeems = response.data.redeems;
          this.loading = false;
        })
    },

    viewEGift(redeem) {
      var url = JSON.parse(redeem.urls);
      var options = 'hidden=no,location=no';
      cordova.InAppBrowser.open(url[0], '_blank', options);
    },

    parseDate(date) {
      return moment(date).format('DD, MMM YYYY');
    }
  }
}
</script>
