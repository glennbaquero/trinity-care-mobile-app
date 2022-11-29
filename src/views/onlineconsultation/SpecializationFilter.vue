<template>
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
                        <h3>Availability</h3>
                    </v-flex>
                    <v-flex xs12>
                        <v-select
                            :items="availability"
                            label="All"
                            dense
                            solo
                            class="cstm-button-radius form__input--select"
                            flat
                            outlined
                            hide-details
                            min-height="42"
                            max-height="42"
                            v-model="filter.availability"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 mt-7 mb-6>
                        <v-divider></v-divider>
                    </v-flex>

                    <v-flex xs12 mb-2>
                        <h3>Status</h3>
                    </v-flex>
                    <v-flex xs12>
                        <v-select
                            :items="status"
                            label="All"
                            dense
                            solo
                            class="cstm-button-radius form__input--select"
                            flat
                            outlined
                            hide-details
                            min-height="42"
                            max-height="42"
                            v-model="filter.status"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 mt-7 mb-6>
                        <v-divider></v-divider>
                    </v-flex>
                    <!-- END_NEW_FILTER_LIST -->
                    <v-flex xs12 mt-10 mb-3 text-center>
                        <v-btn class="button cstm-button-radius text-small type-gray" min-height="42" min-width="165" depressed outlined large dark @click="clear">Clear</v-btn>
                    </v-flex>
                    <v-flex xs12 mb-10 text-center>
                        <v-btn class="button cstm-button-radius text-small bg-doc-primary2" min-height="42" min-width="165" depressed large dark @click="drawer = false">Apply Filter</v-btn>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-list-item>

    </v-navigation-drawer>
</template>

<script>
export default {
    props: {
        show: Boolean,
        specializations: Array
    },

    data () {
        return {
            drawer: this.show,
            availability: ['All', 'Morning', 'Afternoon'],
            status: ['All', 'Online', 'Offline', 'Busy'],
            filter: {
                specializationId: this.$parent.$parent.$parent.$parent.selectedSpecialization.id,
            }
        }
    },


    watch: {
        show(val) { 
            this.drawer = val
        },

        drawer(val) { 
            this.$emit('drawer', val);
        },

        'filter.specializationId'(val) {
            var specialization = this.specializations.find(item => item.id == val);
            this.$emit('specializationId', specialization);
        },

        'filter.availability'(val) {
            this.$emit('availability', val);
        },

        'filter.status'(val) {
            this.$emit('status', val);
        },
    },

    methods: {
        clear() {
            this.filter.specializationId = this.$parent.$parent.$parent.$parent.selectedSpecialization.id;
            this.filter.status = null;
            this.filter.availability = null;
            this.drawer = false
            this.$emit('clear');
        }
    }
}
</script>