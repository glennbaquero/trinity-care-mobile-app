<template>
    <div>
        <v-row class="pa-0" no-gutters>
            <v-col cols="12" class="mb-3">
                <v-card tile class="box-shadow--10 pa-2">
                    <div class="d-flex align-center">
                        <v-col cols="6">
                            <p class="font-weight-semibold mb-0">Deliver to</p>
                        </v-col>
                        <v-col cols="6" class="text-right">

                            <v-btn icon v-if="edit" @click="cancelEdit">
                                <i class="fas fa-check mr-1"></i>Save
                            </v-btn>
                            <v-btn icon v-if="!edit" @click="enableEdit">
                                <v-icon>fa fa-pen</v-icon>
                            </v-btn>
                        </v-col>
                    </div>
                    <div class="px-6 d-flex flex-wrap" v-if="!edit">
                        <v-col cols="12" class="pa-0 mb-1">                            
                            <p class="font-weight-semibold font-size-small mb-0">{{ info.shipping_name }}</p>
                        </v-col>
                        <v-col cols="12" class="pa-0 mb-1">
                            <p class="font-size-small mb-0">{{ info.shipping_email }}</p>
                        </v-col>
                        <v-col cols="4" class="pa-0">
                            <p class="font-size-small">Mobile #</p>                        
                        </v-col>
                        <v-col cols="8" class="pa-0 text-right">
                            <p class="font-size-small">{{ info.shipping_mobile ? '(+63) ' + info.shipping_mobile.slice(1) : 'N/A'}}</p>
                        </v-col>
                    </div>
                    <div class="px-6 d-flex flex-wrap" v-if="edit">
                        <v-col cols="12" class="pa-0 mb-1">                            
                            <v-text-field v-model="info.shipping_name" label="Shipping Name" color="#FABF24" class="form__input--text" :error-messages="errors.shipping_name"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-0 mb-1">
                            <v-text-field v-model="info.shipping_email" label="Shipping Email" color="#FABF24" class="form__input--text" :error-messages="errors.shipping_email"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-0">
                            <v-text-field v-model="info.shipping_mobile" label="Shipping Mobile" color="#FABF24" class="form__input--text" :error-messages="errors.shipping_mobile"></v-text-field>                    
                        </v-col>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" class="mb-3">
                <v-card tile class="box-shadow--10 pa-2">
                    <div class="d-flex align-center">
                        <v-col cols="4">
                            <p class="font-weight-semibold mb-0">Document</p>
                        </v-col>
                        <v-col cols="8" class="text-right">
                            <div class="frm-inpt-file frm-inpt-file__icon d-flex align-center">
                                <template>
                                    <label for="fileupload" class="frm-inpt-file__lbl">{{ fileName }}</label>
                                </template>
                                <div class="frm-inpt-file__btn">
                                    <input 
                                    @change="uploadFile"
                                    type="file" id="fileupload" name="file" required>
                                    <template v-if="filePreview">
                                        <img :src="filePreview" width="30px" height="30px">
                                    </template>
                                </div>
                            </div>
                        </v-col>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" v-if="address">
                <v-card tile class="box-shadow--10 pa-4 px-5">
                    <p class="font-weight-semibold">Shipping Address</p>
                    <div class="d-flex flex-wrap align-center px-3">
                        <v-col cols="4" class="pa-0 mb-1">
                            <p class="font-size-small mb-0">Unit &amp; Floor #</p>
                        </v-col>
                        <v-col cols="8" class="text-right pa-0 mb-1">
                            <p class="font-size-small mb-0">{{ address ? address.unit : 'N/A' }}</p>
                        </v-col>

                        <v-col cols="4" class="pa-0 mb-1">
                            <p class="font-size-small mb-0">Street</p>
                        </v-col>
                        <v-col cols="8" class="text-right pa-0 mb-1">
                            <p class="font-size-small mb-0">{{ address ? address.street : 'N/A' }}</p>
                        </v-col>

                        <v-col cols="4" class="pa-0 mb-1">
                            <p class="font-size-small mb-0">BLDG/Subdv.</p>
                        </v-col>
                        <v-col cols="8" class="text-right pa-0 mb-1">
                            <p class="font-size-small mb-0">{{ address ? address.building || 'N/A' : 'N/A' }}</p>
                        </v-col>

                        <v-col cols="4" class="pa-0 mb-1">
                            <p class="font-size-small mb-0">Region</p>
                        </v-col>
                        <v-col cols="8" class="text-right pa-0 mb-1">
                            <p class="font-size-small mb-0">{{ address ? address.region.text : 'N/A' }}</p>
                        </v-col>

                        <v-col cols="4" class="pa-0 mb-1">
                            <p class="font-size-small mb-0">Province</p>
                        </v-col>
                        <v-col cols="8" class="text-right pa-0 mb-1">
                            <p class="font-size-small mb-0">{{ address ? address.province.text : 'N/A' }}</p>
                        </v-col>

                        <v-col cols="4" class="pa-0 mb-1">
                            <p class="font-size-small mb-0">City</p>
                        </v-col>
                        <v-col cols="8" class="text-right pa-0 mb-1">
                            <p class="font-size-small mb-0">{{ address ? address.city.text : 'N/A' }} City</p>
                        </v-col>

                        <v-col cols="4" class="pa-0 mb-1">
                            <p class="font-size-small mb-0">Zip Code</p>
                        </v-col>
                        <v-col cols="8" class="text-right pa-0 mb-1">
                            <p class="font-size-small mb-0">{{ address ? address.zip : 'N/A' }}</p>
                        </v-col>

                        <v-col cols="4" class="pa-0 mb-1">
                            <p class="font-size-small mb-0">Landmark</p>
                        </v-col>
                        <v-col cols="8" class="text-right pa-0 mb-1">
                            <p class="font-size-small mb-0">{{ address ? address.landmark : 'N/A' }}</p>
                        </v-col>
                    </div>
                    <div>
                        <v-checkbox
                        v-model="address.defaultAddress"
                        label="Make this my default address"
                        color="#DA8924"
                        disabled
                        class="font-size-small"
                        ></v-checkbox>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" class="pa-4">
                <div class="frm-btn">
                    <v-btn
                    class="btn--green"
                    block
                    large
                    rounded
                    dark
                    @click="next"
                    min-height="60"
                    v-if="address != undefined"
                    >
                        Select Shipping Method
                    </v-btn>
                </div>
            </v-col>

        </v-row>

        <ErrorDialog
        :show="errorDialog"
        :message="errorMessage"
        @close="errorDialog = false"
        />
    </div>
</template>

<script>
import ErrorDialog from '@/components/ErrorDialog';
export default {

    components: { ErrorDialog },

    computed: {
        user() {
            return JSON.parse(window.localStorage.getItem('user'));
        },

        regions() {
            return this.$store.getters['api/regions'];
        },

        uploadedDocument() {
            return this.$store.getters['user/uploadedDocument'];
        },

    },
    
    data () {
        return {
            edit: false,
            newAddress: false,
            provinces: [],
            cities: [],
            info: {
                shipping_name: null,
                shipping_email: null,
                shipping_mobile: null
            },
            payload: {
                unit: null,
                street: null,
                building: null,
                region: null,
                province: null,
                city: null,
                zip: null,
                landmark: null,
                default: true
            },
            errors: {},
            address: {},
            load: false,
            errorDialog: false,
            errorMessage: null,

            fileName: 'Upload here..',
            file: null,
            filePreview: null

        }
    },

    mounted() {
        this.setDefaultBasicInfo();
        this.setAddress();
        if(this.uploadedDocument.file) {
            this.file = this.uploadedDocument.file;
            this.filePreview = this.uploadedDocument.preview;
            this.fileName = this.uploadedDocument.name;
        }
        this.$store.commit('setTopNav/set', 'Checkout Details');        
    },

    methods: {

        uploadFile(e) {
            let file = e.target.files;
            if(file.length) {
                this.fileName = file[0].name.length > 15 ? (file[0].name.substring(0, 15) + '...') : file[0].name;
                this.filePreview = URL.createObjectURL(file[0]);
                this.file = file[0]; 
            }
        },

        setAddress() {
            const addresses = this.$store.getters['api/addresses'];
            const address = addresses.find(a => a.defaultAddress == true);

            this.address = address;
        },
        setDefaultBasicInfo() {
            const { first_name, last_name, email, mobile_number } = this.user;

            this.info.shipping_name = `${first_name} ${last_name}`;
            this.info.shipping_email = email;
            this.info.shipping_mobile = mobile_number;
        },
        enableEdit() {
            this.edit = true;
        },
        cancelEdit() {
            this.edit = false;
        },
        selectRegion(event) {
            const provinces = this.$store.getters['api/provinces'];
            const filteredProvinces = provinces.filter(province => province.region_id === event);

            this.provinces = [ ...filteredProvinces ];

            this.payload.province = null;
            this.payload.city = null;
        },
        selectProvince(event) {
            const cities = this.$store.getters['api/cities'];
            const filteredCities = cities.filter(city => city.province_id === event);

            this.cities = [ ...filteredCities ];

            this.payload.city = null;
        },
        updateDefault() {
            const addresses = this.$store.getters['api/addresses'];
            const { id, defaultAddress, ...data } = addresses.find(address => address.defaultAddress == true);

            this.$store.commit('api/update', {
                key: 'addresses',
                id,
                payload: { defaultAddress: false, ...data }
            });
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
            const { region, province, city, ...payload } = this.payload;
            const body = {
                new_address: this.newAddress,
                region_id: region,
                province_id: province,
                city_id: city,
                ...payload,
                ...this.info
            };

            axios.post('api/care/checkout/update', body)
            .then(response => {

                if (this.newAddress) {
                    this.removeDefault();
                    this.$store.commit('api/add', { key: 'addresses', payload: { ...response.data.address }});
                    this.setAddress();
                    this.payload = {
                        unit: null,
                        street: null,
                        building: null,
                        region: null,
                        province: null,
                        city: null,
                        zip: null,
                        landmark: null,
                        default: true
                    };
                    this.newAddress = false;
                }
                this.load = false;
            })
            .catch(error => {
                this.errors = { ...error.response.data.errors };
                this.errorMessage = this.parseResponse(error, 1);
                this.errorDialog = true;
            });

        },
        next() {
            this.load = true;
            this.$store.commit('user/setData', { name: 'uploadedDocument', payload: { 
                file: this.file, name: this.fileName, preview: this.filePreview
            }});
            this.$store.commit('user/setData', { name: 'shipping', payload: { ...this.info } });
            this.update();
            this.setAddress();
            this.$PRXRouter().goTo('cartCheckoutShipping');
        }
    }
}
</script>