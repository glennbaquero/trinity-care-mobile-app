<template>
  <v-layout row wrap mx-0 align-content-start class="auth__account">
    <v-container pa-5 mb-2 class="backgroundColor--white elevation-2">
      <v-flex xs12 mb-2>
        <v-text-field
            v-model="payload.unit"
            label="Unit & Floor #"
            color="#FABF24"
            class="form__input--text"
            :error-messages="errors.unit"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-text-field
            v-model="payload.street"
            label="Street Name"
            color="#FABF24"
            class="form__input--text"
            :error-messages="errors.street"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-text-field
            v-model="payload.building"
            label="Bldg/Subdivision"
            color="#FABF24"
            class="form__input--text"
            :error-messages="errors.building"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-select
            v-model="payload.region"
            label="Region"
            color="#FABF24"
            :items="regions"
            item-text="name"
            item-value="id"
            @change="selectRegion"
            class="form__input--text"
            :error-messages="errors.region_id"
        ></v-select>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-select
            v-model="payload.province"
            label="Province"
            color="#FABF24"
            :items="provinces"
            item-text="name"
            item-value="id"
            class="form__input--text"
            :disabled="payload.region === null"
            :error-messages="errors.province"
            @change="selectProvince"
        ></v-select>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-select
            v-model="payload.city"
            label="City"
            color="#FABF24"
            :items="cities"
            item-text="name"
            item-value="id"
            class="form__input--text"
            :disabled="payload.region === null || payload.province === null"
            @keypress="regexLetter($event)"
            :error-messages="errors.city"
        ></v-select>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-text-field
            v-model="payload.zip"
            label="Zip Code"
            color="#FABF24"
            class="form__input--text"
            @keypress="regexNumber($event)"
            :error-messages="errors.zip"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-text-field
            v-model="payload.landmark"
            label="Landmark"
            color="#FABF24"
            class="form__input--text"
            :error-messages="errors.landmark"
        ></v-text-field>
      </v-flex>
    </v-container>
    <v-container px-5 py-7 mb-2>
      <v-flex xs12 text-center mt-12 mb-6>
        <v-btn class="button cstm-button-radius text-small cstm-width type-gradient-l-r v-btn--large"
         @click="updateDialog = true" depressed large dark>Add Address</v-btn>
      </v-flex>
    </v-container>

    <!-- COMPONENT_DIALOG_UPDATE -->
    <ConfirmationDialog
      :show="updateDialog"
      :message="loading ? 'Please wait...' : 'Add this address?'"
      image="icons/help-web-button-2.svg"
      :default-slot="false"
    >
      <v-card-actions v-if="!loading" class="pa-0 justify-center">
          <v-btn
            class="button cstm-button-radius v-btn--small"
            color="#FABF24"
            dark
            @click="addAddress"
            min-width="100px">
            Proceed
          </v-btn>

          <v-btn
            class="button cstm-button-radius v-btn--small type-shdw-gray"
            color="#A8A8A8"
            dark
            min-width="100px"
            @click="updateDialog = false">
            Cancel
          </v-btn>
      </v-card-actions>
      <v-flex v-else d-flex align-center justify-center>
        <Spinner stroke-color="#afafaf" />
      </v-flex>
    </ConfirmationDialog>
    <!-- END_COMPONENT_DIALOG_UPDATE -->

    <!-- COMPONENT_DIALOG_SUCCESS -->
    <SuccessDialog
      :show="successDialog"
      :message="message"
      image="icons/Check.svg"
      @close="$PRXRouter().goTo('profile')"
    />
    <!-- END_COMPONENT_DIALOG_SUCCESS -->

  </v-layout>
</template>

<script>
import ConfirmationDialog from '@/components/ConfirmationDialog';
import SuccessDialog from '@/components/SuccessDialog';
import Spinner from '@/components/Spinner';

export default {
  data() {
    return {
      loading: false,
      updateDialog: false,
      successDialog: false,
      message: null,
      provinces: [],
      cities: [],
      payload: {
        unit: null,
        street: null,
        building: null,
        region: null,
        province: null,
        city: null,
        zip: null,
        landmark: null
      },
      errors: {}
    }
  },

  components: { ConfirmationDialog, SuccessDialog, Spinner },

  computed: {
    regions() {
      return this.getItem('regions');
    }
  },

  mounted() {
    this.$store.commit('setTopNav/set', 'Address');
  },

  methods: {
    selectRegion(event) {
      // const provinces = this.$store.getters['api/provinces'];
      const regions = this.regions;
      // const filteredProvinces = regions.filter(province => province.region_id === event);
      // const filteredProvinces = regions.filter(region => region.id === this.payload.region);
      regions.forEach((region) => {
        if(region.id === this.payload.region) {
          this.provinces = region.provinces;
        }
      })

      this.payload.province = null;
      this.payload.city = null;
    },
    selectProvince(event) {
      // const cities = this.$store.getters['api/cities'];
      const provinces = this.provinces;
      // const filteredCities = cities.filter(city => city.province_id === event);
      provinces.forEach((province) => {
        if(province.id === this.payload.province) {
          this.cities = province.cities;
        }
      })
      
      this.payload.city = null;
    },
    addAddress() {
      const { region, province, city, ...rest } = this.payload;
      const body = {
        region_id: region,
        province_id: province,
        city_id: city,
        ...rest
      };

      this.loading = true;

      axios.post('/api/care/address/add', body)
        .then(response => {
          this.loading = false;
          this.$store.commit('api/add', { key: 'addresses', payload: { ...response.data.address } });
          this.updateDialog = false;
          this.message = response.data.message;
          this.successDialog = true;
        })
        .catch(error => {
          this.loading = false;
          this.updateDialog = false;
          this.errors = { ...error.response.data.errors };
        });
    }
  }
}
</script>
