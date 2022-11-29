<template>
    <v-container fill-height pa-0>
      <v-layout row wrap mx-0 align-content-start class="news__con bg-lightGray">
        <v-container pa-5>
          <!-- SEARCH_COMPONENT -->
          <form @submit.prevent="searchArticle">
            <v-layout row wrap mx-auto mb-8 align-center>
              <v-flex xs11 class="pr-3">
                <div class="form__input--text search__form">
                    <v-text-field
                      type="text"
                      color="#3B823E"
                      single-line
                      solo
                      hide-details
                      height="60"
                      class="border-radius--50"
                      v-model="params.title"
                      placeholder="Type your keyword here"
                      append-icon="fa fa-search"
                      @click:append="searchArticle"
                      ></v-text-field>
                  </div>
              </v-flex>
              <v-flex xs1 text-right class="button__icon--right pl-0">
                <v-img @click.stop="drawer = !drawer" class="ml-auto" :src="$PRXConfig().staticUrl('icons/filter.svg')" max-width="25" width="25" height="25" contain></v-img>
              </v-flex>
            </v-layout>
          </form>
          <!-- END_SEARCH_COMPONENT --> 
          <!-- NEWS_ARTICLE_COMPONENT -->
          <v-flex xs12 mb-3 v-for="(item, key) in news" :key="key">
            <v-card class="cstm-border-radius-10 news__articleCon frm-elevation" @click="viewArticle(item)">
              <v-list class="pa-0">
                <v-list-item class="px-0">
                  <v-list-item-content class="news__listThumbnail py-0">
                    <v-img :lazy-src="item.image_path" :src="item.image_path">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="#3B823E"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                  </v-list-item-content>
                  <v-list-item-content class="px-5">
                    <h3 class="mb-4">{{ item.title }}</h3>
                    <p class="mb-0" v-html="item.short_overview"></p>
                    <small class="font-weight-default type-darkerGray">{{ item.date }}</small>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>

          <!-- END_NEWS_ARTICLE_COMPONENT -->
          
          <infinite-loading :identifier="infiniteId" @infinite="fetchData" ref="infiniteLoading">
              <span slot="spinner">
                <template v-if="this.page > 1">
                  <v-img class="mx-auto" :src="$PRXConfig().staticUrl('images/loading.gif')" width="40px" ></v-img>
                </template>
              </span>
              <div slot="no-more" class="general__text color-gray">
                  <template v-if="news.length < 1">
                    No article available
                  </template>
                  <template v-if="news.length > 1">
                    No more article is available
                  </template>
              </div>
              <div slot="no-results" class="general__text color-gray">         
                No article available
              </div>
          </infinite-loading>
        
        </v-container>

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
                <v-flex xs12 mb-4>
                  <h3>Filter by</h3>
                </v-flex>
                <!-- COMPONENT_FILTER_LIST -->
                <v-flex xs11 mb-3 align-self-center>
                  <p class="mb-0">This Week</p>
                </v-flex>
                <v-flex xs1 mb-3>
                  <v-checkbox
                    height="0"
                    color="#DA8924"
                    mt-0
                    :value="1"
                    v-model="params.scope_week"
                  ></v-checkbox>
                </v-flex>

                <v-flex xs11 mb-3 align-self-center>
                  <p class="mb-0">This Month</p>
                </v-flex>
                <v-flex xs1 mb-3>
                  <v-checkbox
                    height="0"
                    color="#DA8924"
                    mt-0
                    :value="1"
                    v-model="params.scope_month"
                  ></v-checkbox>
                </v-flex>
                <!-- END_COMPONENT_FILTER_LIST -->
              </v-layout>
              <v-layout row wrap mx-auto pa-5 mb-12 class="filter__viewBtn">
                <v-flex xs12>
                  <v-btn 
                    class="button cstm-button-radius text-small cstm-width type-gradient-l-r v-btn--large" 
                    depressed 
                    large 
                    dark 
                    @click="filterChange">Display Result
                  </v-btn>
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

  computed: {
    news() {
      return this.$store.state.tempStorage.news.items;
    },

    page() {
      return this.$store.state.tempStorage.news.page;
    },
  },

  data () {
    return {
      loading: false,
      drawer: null,
      filterId: [],
      title: null,
      filter : {},
      infiniteId: +new Date(),
      params: {
        title : null,
        scope_week : null,
        scope_month : null,
      }
    }
  },

  mounted() {
    if(!this.news.length) {
      this.$refs['loader'].show();
    }
  },

  watch : {
      'params.scope_week':function(newVal, oldVal){
        if(newVal){
          this.params.scope_month = false;
        }
      },
      'params.scope_month':function(newVal, oldVal){
        if(newVal){
          this.params.scope_week = false;
        }
      },
  },

  methods: {

  /*
  |--------------------------------------------------------------------------
  | @Methods
  |--------------------------------------------------------------------------
  */

    fetchData($state) {

      const data = {
        page : this.page,
        scope_month : this.params.scope_month,
        scope_week : this.params.scope_week,
        title : this.params.title,
      };

      axios.post(this.routes['api.care.articles.fetch'], data)
        .then(response => {
          if(response.data.items.length > 0) {
            this.$store.commit('tempStorage/setNews', {
              'page': this.page + 1,
              'items': response.data.items
            });
            $state.loaded();
          } else {
            $state.complete();
          }
          this.$refs['loader'].hide(); 
         }).catch(err => {
            console.log(err);
            this.$refs['loader'].hide();
        });
    },
    
    filterChange() {
      this.resetData();
      this.drawer = false;
    },

    searchArticle() {
      this.resetData();   
    },

    viewArticle(item) {
      this.$store.commit('selectedArticle/set', item);
      this.$PRXRouter().goTo('newsView');
    },

    resetData(hasLoading = true) {
      
      if(hasLoading) {
        this.$refs.loader.show();
      }

      this.$store.commit('tempStorage/resetNews');
      this.$refs.infiniteLoading.stateChanger.reset();
    },
  }
}
</script>