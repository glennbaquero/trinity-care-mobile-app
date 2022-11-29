<template>
  <v-layout row wrap mx-0 align-content-start class="auth__account">
    <v-container pa-5 mb-2 class="backgroundColor--white elevation-2">
      <v-flex xs12 mb-2>
        <v-text-field
            v-model="address.unit"
            label="Unit & Floor #"
            color="#FABF24"
            class="form__input--text"
            :error-messages="errors.unit"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-text-field
            v-model="address.street"
            label="Street Name *"
            color="#FABF24"
            class="form__input--text"
            :error-messages="errors.street"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-text-field
            v-model="address.building"
            label="Bldg/Subdivision"
            color="#FABF24"
            class="form__input--text"
            :error-messages="errors.building"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-select
            v-model="address.region"
            label="Region *"
            color="#FABF24"
            :items="regions"
            class="form__input--text"
            :error-messages="errors.region_id"
            @change="selectRegion"
        ></v-select>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-select
            v-model="address.province"
            label="Province *"
            color="#FABF24"
            :items="provinces.map(({ text, value }) => ({ text, value }))"
            class="form__input--text"
            :disabled="!address.region"
            :error-messages="errors.province_id"
            @change="selectProvince"
        ></v-select>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-select
            v-model="address.city"
            label="City *"
            color="#FABF24"
            :items="cities.map(({ text, value }) => ({ text, value }))"
            class="form__input--text"
            :disabled="!address.province"
            :error-messages="errors.city_id"
        ></v-select>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-text-field
            v-model="address.zip"
            label="Zip Code *"
            color="#FABF24"
            class="form__input--text"
            :error-messages="errors.zip"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 mb-2>
        <v-text-field
            v-model="address.landmark"
            label="Landmark"
            color="#FABF24"
            class="form__input--text"
            :error-messages="errors.landmark"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 mb-2 class="auth__address--checkbox">
        <v-checkbox
          v-model="address.defaultAddress"
          label="Make this my default address"
          color="#FABF24"
        ></v-checkbox>
      </v-flex>
    </v-container>
    <v-container px-5 py-7 mb-2 class="backgroundColor--white elevation-2">
      <v-flex xs12 text-center>
        <h3 @click="removeDialog = true" class="type-red">Remove Address</h3>
      </v-flex>
    </v-container>
    <v-container px-5 py-7 mb-2>
      <v-flex xs12 text-center mt-12 mb-6>
        <v-btn class="button cstm-button-radius text-small cstm-width type-gradient-l-r v-btn--large"
         @click="updateDialog = true" depressed large dark>Update Changes</v-btn>
      </v-flex>
    </v-container>

    <!-- COMPONENT_DIALOG_REMOVE -->
    <ConfirmationDialog
      :show="removeDialog"
      :message="loading ? 'Removing address...' : 'Remove this address?'"
      image="icons/help-web-button-2.svg"
      :default-slot="false"
    >
      <v-card-actions v-if="!loading" class="pa-0 justify-center">
          <v-btn
            class="button cstm-button-radius v-btn--small"
            color="#FABF24"
            dark
            @click="deleteAddress"
            min-width="100px">
            Proceed
          </v-btn>

          <v-btn
            class="button cstm-button-radius v-btn--small type-shdw-gray"
            color="#A8A8A8"
            dark
            min-width="100px"
            @click="removeDialog = false">
            Cancel
          </v-btn>
      </v-card-actions>
      <v-flex v-else d-flex align-center justify-center>
        <Spinner stroke-color="#afafaf" />
      </v-flex>
    </ConfirmationDialog>
    <!-- END_COMPONENT_DIALOG_REMOVE -->

    <!-- COMPONENT_DIALOG_UPDATE -->
    <ConfirmationDialog
      :show="updateDialog"
      :message="loading ? 'Updating address...' : 'Update this address?'"
      image="icons/help-web-button-2.svg"
      :default-slot="false"
    >
      <v-card-actions v-if="!loading" class="pa-0 justify-center">
          <v-btn
            class="button cstm-button-radius v-btn--small"
            color="#FABF24"
            dark
            @click="update"
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
      :message="successMessage"
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
  mounted() {
    const addresses = this.$store.getters['api/addresses'];
    const { id, ...data } = addresses.find(address => address.id === this.id);

    this.address = { ...data };
    this.provinces = [ ...this.allProvinces.filter(province => province.region_id === data.region.value) ];
    this.cities = [ ...this.allCities.filter(city => city.province_id === this.address.province.value) ];

    this.$store.commit('setTopNav/set', 'Address')
  },

  components: { ConfirmationDialog, SuccessDialog, Spinner },

  data () {
    return {
      loading: false,
      removeDialog: false,
      updateDialog: false,
      successDialog: false,
      successMessage: null,
      errorDialog: false,
      errorMessage: null,
      message: null,
      provinces: [],
      cities: [],
      address: {
        unit: null,
        street: null,
        building: null,
        region: null,
        province: null,
        city: null,
        zip: null,
        landmark: null,
        defaultAddress: false
      },
      errors: {}
    }
  },
  computed: {
    id() {
      return this.$store.getters['user/editAddressId'];
    },
    regions() {
      return this.$store.getters['api/regions'];
    },
    allProvinces() {
      return this.$store.getters['api/provinces'];
    },
    allCities() {
      return this.$store.getters['api/cities'];
    }
  },
  methods: {
    selectRegion(event) {
      const provinces = this.allProvinces.reduce((items, province) => {
        if (province.region_id === event) {
          items.push(province);
        }

        return items;
      }, []);

      this.provinces = [ ...provinces ];

      this.address.province = null;
      this.address.city = null;
    },
    selectProvince(event) {
      const cities = this.allCities.reduce((items, city) => {
        if (city.province_id === event) {
          items.push(city);
        }

        return items;
      }, []);

      this.address.city = null;

      this.cities = [ ...cities ];
    },
    removeDefault() {
      const addresses = this.$store.getters['api/addresses'];
      const cleared = addresses.map(address => {
        address.defaultAddress = false;
        return address;
      });

      this.$store.commit('api/fetchData', { key: 'addresses', payload: [ ...cleared ] });
    },
    update() {
      const { region, province, city, defaultAddress, ...rest } = this.address;
      const body = {
        region_id: typeof region === 'object' ? region.value : region,
        province_id: typeof province === 'object' ? province.value : province,
        city_id: typeof city === 'object' ? city.value : city,
        default: defaultAddress,
        ...rest
      };

      this.loading = true;

      axios.post(`/api/care/address/${this.id}/update`, body)
        .then(response => {
          const { id, ...payload } = response.data.address;


          if (payload.defaultAddress) {
            this.removeDefault();
          }

          this.$store.commit('api/update', { key: 'addresses', id, payload });
          
          this.loading = false;
          this.updateDialog = false;
          this.successMessage = response.data.message;
          this.successDialog = true;
        })
        .catch(error => {
          this.loading = false;
          this.updateDialog = false;
          this.errors = { ...error.response.data.errors };
        })
    },
    deleteAddress() {
      this.loading = true;

      axios.post(`/api/care/address/${this.id}/delete`)
        .then(response => {
          this.loading = false;
          this.successMessage = response.data.message;
          this.removeDialog = false;
          this.successDialog = true;
          this.$store.commit('api/delete', { key: 'addresses', id: this.id });
        })
        .catch(error => {
          this.loading = false;
          this.removeDialog = false;
          this.errorDialog = true;
          this.errorMessage = 'An error occured while deleting the address';
        });
    }
  }
}
</script>
