<template>
  <v-layout row wrap mx-0 align-content-start class="product__con bg-lightGray">
    <v-container pa-5 pb-0 mt-2>

      <!-- SEARCH_COMPONENT -->
      <form @submit.prevent="searchProduct">
        <v-layout row wrap mx-auto align-center>
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
                  v-model="productName"
                  placeholder="Type your keyword here"
                  append-icon="fa fa-search"
                  @click:append="searchProduct"
                  ></v-text-field>
              </div>
          </v-flex>
          <v-flex xs1 text-right class="button__icon--right pl-0">
            <v-img @click.stop="drawer = !drawer" @click="fetchFilter" class="ml-auto" :src="$PRXConfig().staticUrl('icons/filter.svg')" max-width="25" width="25" height="25" contain></v-img>
            </v-btn>
          </v-flex>
        </v-layout>
      </form>
      <!-- END_SEARCH_COMPONENT -->

      <v-layout row wrap mx-auto mt-6>
        <v-flex xs6 align-self-center>
          <h3>Products</h3>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid pa-5 pt-0>
      <v-layout wrap class="slider_con">
          <v-flex v-for="(product, pk) in products" :key="pk" xs6 class="product__listCon" @click="previewProduct(product)">
            <v-card flat tile class="cstm-border-radius frm-elevation pt-5">
              <v-img :lazy-src="product.full_image" :src="product.full_image" height="150" contain>
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="#3B823E"></v-progress-circular>
                    </v-row>
                </template>
                  <v-img
                    v-if="product.prescriptionable"
                    :src="$PRXConfig().staticUrl('icons/rx.svg')"
                    class="mx-auto product__prxLogo"
                    width="30px"
                    height="30px"
                    contain>
                  </v-img>
                </v-img>
                <v-card-text class="text-center justify-center pb-2">
                    <p class="font-weight-bold slider__text--1 type-black mb-0">{{ product.name }}</p>
                    <h4 class="font-weight-regular type-gray mb-1">Php {{ renderPrice(product.price) }}</h4>
                </v-card-text>
            </v-card>
          </v-flex>
      </v-layout>

      <infinite-loading class="mt-3" :identifier="infiniteId" @infinite="fetchProducts" ref="infiniteLoading">
            <span slot="spinner">
              <template v-if="page > 1">
                <v-img class="mx-auto" :src="$PRXConfig().staticUrl('images/loading.gif')" width="40px" ></v-img>
              </template>
            </span>
          <div slot="no-more"> 
              <template v-if="products.length <= 0">
                 <p class="general__text color-gray mb-0">No Available product.</p>
              </template>
              <template v-else>
                <p class="general__text color-gray mb-0">No more products found.</p>
              </template> 
          </div>
          <div slot="no-results"><p class="general__text color-gray mb-0">No products found.</p></div>
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
    
            <!-- NEW_FILTER_LIST -->
            <v-flex xs12 mb-2>
              <h3>Price Range</h3>
            </v-flex>
            <v-flex xs12 pl-4>
              <div class="form__slider">
                <v-range-slider
                  v-model="price"
                  :max="prices.highest"
                  :low="prices.lowest"
                  hide-details
                  thumb-label="always"
                ></v-range-slider>
              </div>
            </v-flex>
            <v-flex xs12 mt-12 mb-6 pt-2>
              <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 mb-2>
              <h3>Category</h3>
            </v-flex>
            <v-flex xs12>
              <v-select
                dense
                solo
                class="cstm-button-radius form__input--select"
                flat
                outlined
                hide-details
                :items="specializations"
                v-model="specialization"
                item-text="name"
                item-value="id"
                min-height="42"
                max-height="42"
                color="red"
              ></v-select>
            </v-flex>
            <v-flex xs12 mt-7 mb-6>
              <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 mb-2>
              <h3>Regulatory Classification</h3>
            </v-flex>
            <v-flex xs12>
              <v-select
                label="All"
                dense
                solo
                class="cstm-button-radius form__input--select"
                flat
                outlined
                hide-details
                :items="regulatory_classifications"
                v-model="regulatory_classification"
                item-text="name"
                item-value="id"
                min-height="42"
                max-height="42"
                color="red"
              ></v-select>
            </v-flex>
            <v-flex xs12 mt-7 mb-6>
              <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 mb-2>
              <h3>Sort by</h3>
            </v-flex>
            <v-flex xs12>
              <v-select
                label="None"
                dense
                solo
                class="cstm-button-radius form__input--select"
                flat
                outlined
                hide-details
                item-text="name"
                item-value="id"
                :items="sort_by_entries"
                v-model="sort_by"
                min-height="42"
                max-height="42"
                color="red"
              ></v-select>
            </v-flex>
            <v-flex xs12 mt-7 mb-6>
              <v-divider></v-divider>
            </v-flex>
            <!-- END_NEW_FILTER_LIST -->
            <v-flex xs12 my-10 text-center>
                <v-btn 
                  class="button cstm-button-radius text-small bg-doc-primary2" 
                  min-height="42" 
                  min-width="165" 
                  depressed 
                  large 
                  dark 
                  @click="filterProduct">
                  Apply Filter
                </v-btn>
            </v-flex>
            </v-layout>

        </v-container>
      </v-list-item>

    </v-navigation-drawer>
    
    <Loader
    ref="loader"
    ></Loader>

  </v-layout>
</template>

<script>

import Loader from '../../components/Loader.vue';
  
export default {

  components: {
    Loader
  },

  computed: {
    products() {
      return this.$store.state.tempStorage.products.items;
    },

    page() {
      return this.$store.state.tempStorage.products.page;
    },
  },

  data () {
    return {
      price: [],
      size: 'lg',
      drawer: false,

      isfetched: false,

      infiniteId: +new Date(),

      productName: "",

      // filter data
      regulatory_classifications: [
        {id: 1 , name : 'All'},
        {id: 2 , name : 'Rx'},
        {id: 3 , name : 'Otc'}
      ],

      sort_by_entries: [
        {id: 1, name:'None'},
        {id: 2, name:'Price: Highest to Lowest'}, 
        {id: 3, name:'Price: Lowest to Highest'},
        {id: 4, name:'Name: A to Z'},
        {id: 5, name:'Name: Z to A'} 
      ],

      specializations: [],
      prices: {
        highest: 0,
        lowest: 0,
      },

      // filter model
      specialization : 0,
      sort_by : 1,
      regulatory_classification : 1,

    }
  },


  mounted() {
    if(!this.products.length) {
      this.$refs['loader'].show();
    }
  },

  methods: {

    /*
    |--------------------------------------------------------------------------
    | @Methods
    |--------------------------------------------------------------------------
    */
   
    /**
     * Product Fetching
     * 
     */
    fetchProducts($state) {
      
      const data = {
        product_name: this.productName,
        specialization: this.specialization,
        range: this.price,
        regulatory_classification : this.regulatory_classification,
        sort_by : this.sort_by,
        page: this.page,
      };

      axios.post(this.routes['api.care.products.fetch'], data)
        .then(response => {
          this.$refs['loader'].hide();          
          if(response.data.items.length) {
             
            this.$store.commit('tempStorage/setProducts', {
              'page': this.page + 1,
              'items': response.data.items
            });
            
            $state.loaded();
          } else {
            $state.complete();
          }
        }).catch(err => {
          this.$refs['loader'].hide();
          console.log(err);
        });

    },

    /**
     * Get all the data for filtering
     * 
     */
    fetchFilter() {

      if(!this.isfetched) {
      axios.post(this.routes['api.care.product-filters.fetch'])
        .then(response => {
          this.isfetched = true;
          if(response.data) {
            this.specializations = response.data.specializations.sort((a, b) => (a.id > b.id) ? 1 : -1);
            this.prices = response.data.prices;
            this.price = [this.prices.lowest,this.prices.highest];      
          }
        
        }).catch(err => {
          console.log(err);
      });
      }
    },

    /**
     *  Apply all the set filter
     * 
     */
    filterProduct() {
      this.$refs['loader'].show();
      this.$store.commit('tempStorage/resetProducts');
      this.$refs.infiniteLoading.stateChanger.reset();
      this.drawer = false;
    },

    /**
     *  Filter the product using search box
     * 
     */
    searchProduct() {
      this.$refs['loader'].show();      
      this.$store.commit('tempStorage/resetProducts');
      this.$refs.infiniteLoading.stateChanger.reset();
    },

    /**
     *  Show the selected product
     * 
     */
    previewProduct(product) {
      this.$store.commit('selectedProduct/set', product);
      this.$PRXRouter().goTo('productView');
    },    

    renderPrice(price) {
      if(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");        
      }
    },
  }
}
</script>
