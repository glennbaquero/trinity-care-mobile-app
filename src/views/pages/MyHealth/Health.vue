<template>
    <v-container pa-0 class="health__con">
        <v-container coloumn pa-5>
            <v-layout row wrap mx-auto>
                <v-carousel class="graph-slider pb-8 overflow-visible" height="auto" :navigationEnabled="false" light>

                    <template v-for="(chart, key) in charts">
                        <template v-if="myHealthData.charts">
                            <v-carousel-item class="frm-elevation">
                                <v-card class="graph-slider__card px-4 py-6" style="width: 600px">
                                    <v-layout row wrap mx-auto>
                                        <v-flex xs6>
                                            <h3 class="type-red">{{ chart.label }}</h3>
                                        </v-flex>
                                        <v-flex xs6 text-right align-self-center>
                                            <DatePicker
                                            :default-date="date"
                                            @date-selected="dateSelected"
                                            ></DatePicker>
                                        </v-flex>
                                    </v-layout>
                                    <line-chart 
                                    :data="myHealthData.charts[chart.key] ? myHealthData.charts[chart.key]: [] "
                                    :discrete="true" 
                                    >
                                </line-chart>
                            </v-card>
                        </v-carousel-item>
                    </template>
                </template>

            </v-carousel>
        </v-layout>
    </v-container>

    <!-- Personal Information -->
    <v-container column pa-5>
        <v-layout row wrap mx-auto>
            <v-flex xs12 mb-4>
                <h3 class="type-1">Personal Information</h3>
            </v-flex>

            <template v-if="personal_info">

                <v-flex xs6 mb-3 pr-3>
                    <v-card class="frm-elevation mb-4 health__personalCon frm-elevation">
                        <v-list class="pa-0">
                            <v-list-item class="px-5 py-6">
                                <v-list-item-content class="pa-0">
                                    <v-layout row wrap mx-auto class="width--100">
                                        <v-flex xs5 class="align-self-center">
                                            <h5 class="mb-3 type-gray font-weight-default">Height</h5>
                                            <h5>{{ personal_info.height_feet }}" {{ personal_info.height_inches }}' ft</h5>
                                        </v-flex>
                                        <v-flex xs7 text-right class="align-self-center">
                                            <v-btn
                                            color="#3b823e" height="25px" dark class="health__personalBtn" @click="uponBtnClick()">
                                            <v-icon>{{ 'fa-plus' }}</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-flex>

            <v-flex xs6 mb-3 pl-3>
                <v-card class="frm-elevation mb-4 health__personalCon frm-elevation">
                    <v-list class="pa-0">
                        <v-list-item class="px-5 py-6">
                            <v-list-item-content class="pa-0">
                                <v-layout row wrap mx-auto class="width--100">
                                    <v-flex xs5 class="align-self-center">
                                        <h5 class="mb-3 type-gray font-weight-default">Weight</h5>
                                        <h5>{{ personal_info.weight }} {{ personal_info.weight_units }} </h5>
                                    </v-flex>
                                    <v-flex xs7 text-right class="align-self-center">
                                        <v-btn
                                        color="#3b823e" height="25px" dark class="health__personalBtn" @click="trigWeightDialog()">
                                        <v-icon>{{ 'fa-plus' }}</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-flex>

        <v-flex xs12 mb-3>
            <v-card class="frm-elevation mb-4 health__personalCon frm-elevation">
                <v-list class="pa-0">
                    <v-list-item class="px-5 py-6">
                        <v-list-item-content class="pa-0">
                            <v-layout row wrap mx-auto class="width--100">
                                <v-flex xs5 class="align-self-center">
                                    <h5 class="mb-3 type-gray font-weight-default">Other Conditions</h5>
                                    <h5>{{ personal_info.condition }}</h5>
                                </v-flex>
                                <v-flex xs7 text-right class="align-self-center">
                                    <v-btn
                                    color="#3b823e" height="25px" dark class="health__personalBtn" @click="trigConditionDialog()">
                                    <v-icon>{{ 'fa-plus' }}</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
        </v-flex>
    </template>

<!-- Popup Modals -->
<HeightDialog 
:value="myHealthData.data"
:show="showDialog" @re-init="init" @close="uponBtnClick()"></HeightDialog>
<WeightDialog 
:value="myHealthData.data"    
:show="weightDialog" @re-init="init" @close="trigWeightDialog()"></WeightDialog>
<ConditionDialog 
:value="myHealthData.data"    
:show="conditionDialog" @re-init="init" @close="trigConditionDialog()"></ConditionDialog>  

</v-layout>
</v-container>

<v-container column pa-5>
    <v-layout row wrap mx-auto>
        <v-flex xs6 mb-4 align-self-center>
            <h3 class="type-1">Health Records</h3>
        </v-flex>
        <v-flex xs12 class="health__listCon">
            <!-- BLOOD_PRESSURE -->
            <v-card class="frm-elevation mb-4">
                <v-list class="pa-0">
                    <v-list-item class="px-4 py-5 health__listInner">
                        <v-list-item-content class="health__iconCon align-self-start py-0">
                            <v-img :src="$PRXConfig().staticUrl('icons/blood-pressure.svg')" class="mx-auto elevation-0" width="20px" height="20px" contain></v-img>
                        </v-list-item-content>
                        <v-list-item-content class="pl-1 pr-8 py-1 health__contentCon align-self-start">
                            <v-layout row wrap mx-auto>
                                <v-flex xs8>
                                    <h3 class="mb-5 type-gray">Blood Pressure</h3>
                                </v-flex>
                                <v-flex xs4 text-right>
                                    <v-btn
                                    @click="setForm('bp')"
                                    color="#3b823e" height="25px" dark class="health__formbtn">
                                    <v-icon>{{ forms.bp ? 'fa-times' : 'fa-plus' }}</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>

                        <!-- Data -->
                        <template v-if="bloodPressure">
                            <v-layout row wrap mx-auto class="width--100">
                                <v-flex xs3>
                                    <h5 class="mb-2 type-gray font-italic font-weight-default">Systole</h5>
                                    <h3 class="mb-0">{{ bloodPressure.systole }}</h3>
                                </v-flex>
                                <v-flex xs3>
                                    <h5 class="mb-2 type-gray font-italic font-weight-default">Diastole</h5>
                                    <h3 class="mb-0">{{ bloodPressure.diastole }}</h3>
                                </v-flex>
                                <v-flex xs6 text-right align-self-center>
                                    <h3 class="mb-0 type-green">{{ bloodPressure.status }}</h3>
                                </v-flex>
                            </v-layout>
                        </template>

                        <!-- Form -->
                        <template v-if="forms.bp">
                            <v-form v-model="bpValid">

                                <v-layout row wrap mx-auto class="width--100">
                                    <v-flex xs12 mb-2>
                                        <v-text-field
                                        v-model="post.bp.systole"
                                        :rules="[rules.required, rules.number]"
                                        type="number"
                                        label="Systole"
                                        color="#FABF24"
                                        class="form__input--text"
                                        hide-details
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 mb-5>
                                        <v-text-field
                                        v-model="post.bp.diastole"
                                        :rules="[rules.required, rules.number]"
                                        type="number"
                                        label="Diastole"
                                        color="#FABF24"
                                        class="form__input--text"
                                        hide-details
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-flex xs12 mt-4>
                                    <v-btn
                                    @click="submit('bp')"
                                    :disabled="!bpValid"
                                    class="button cstm-button-radius text-small cstm-width v-btn--large type-gradient-l-r"
                                    depressed
                                    large
                                    >
                                    <span class="type-white">Save</span>
                                </v-btn>
                            </v-flex>                    
                        </v-form>

                    </template>

                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-expansion-panels v-if="!forms.bp" class="health__recommendCon">
            <v-expansion-panel>
                <v-expansion-panel-header><h5 class="type-2 bold">Recommendation</h5></v-expansion-panel-header>
                <v-expansion-panel-content class="text-left">
                    <h5 class="type-darkerGray font-weight-default" v-html="page_item.care_app_myhealth_bp"></h5>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>

    <!-- HEART_RATE -->
    <v-card class="frm-elevation mb-4">
        <v-list class="pa-0">
            <v-list-item class="px-4 py-5 health__listInner">
                <v-list-item-content class="health__iconCon align-self-start py-0">
                    <v-img :src="$PRXConfig().staticUrl('icons/heart-rate.svg')" class="mx-auto elevation-0" width="20px" height="20px" contain></v-img>
                </v-list-item-content>
                <v-list-item-content class="pl-1 pr-8 py-1 health__contentCon align-self-start">
                    <v-layout row wrap mx-auto>
                        <v-flex xs8>
                            <h3 class="mb-5 type-gray">Heart Rate</h3>
                        </v-flex>
                        <v-flex xs4 text-right>
                            <v-btn
                            @click="setForm('hr')"
                            color="#3b823e" height="25px" dark class="health__formbtn">
                            <v-icon>{{ forms.hr ? 'fa-times' : 'fa-plus' }}</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>

                <!-- Data -->
                <template v-if="heartRate">
                    <v-layout row wrap mx-auto class="width--100">
                        <v-flex xs6>
                            <h3 class="mb-0">{{ heartRate.value }} BPM</h3>
                        </v-flex>
                        <v-flex xs6 text-right align-self-center>
                            <h3 class="mb-0 type-green">{{ heartRate.status }}</h3>
                        </v-flex>
                    </v-layout>
                </template>

                <!-- Form -->
                <template v-if="forms.hr">            
                    <v-layout row wrap mx-auto class="width--100">
                        <v-flex xs12 mb-2>
                            <v-text-field
                            v-model="post.hr.value"
                            :rules="[rules.required, rules.number]"
                            type="number"                            
                            label="Heart Rate"
                            color="#FABF24"
                            class="form__input--text"
                            hide-details
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-flex xs12 mt-4>
                        <v-btn
                        @click="submit('hr')"
                        class="button cstm-button-radius text-small cstm-width v-btn--large type-gradient-l-r"
                        depressed
                        large
                        >
                        <span class="type-white">Save</span>
                    </v-btn>
                </v-flex>

            </template>

        </v-list-item-content>
    </v-list-item>
</v-list>
<v-expansion-panels v-if="!forms.hr" class="health__recommendCon">
    <v-expansion-panel>
        <v-expansion-panel-header><h5 class="type-2 bold">Recommendation</h5></v-expansion-panel-header>
        <v-expansion-panel-content class="text-left">
            <h5 class="type-darkerGray font-weight-default" v-html="page_item.care_app_myhealth_hr"></h5>
        </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
</v-card>

<!-- BODY_MASS_INDEX -->
<v-card class="frm-elevation mb-4">
    <v-list class="pa-0">
        <v-list-item class="px-4 py-5 health__listInner">
            <v-list-item-content class="health__iconCon align-self-start py-0">
                <v-img :src="$PRXConfig().staticUrl('icons/bmi.svg')" class="mx-auto elevation-0" width="20px" height="20px" contain></v-img>
            </v-list-item-content>
            <v-list-item-content class="pl-1 pr-8 py-1 health__contentCon align-self-start">
                <v-layout row wrap mx-auto>
                    <v-flex xs8>
                        <h3 class="mb-5 type-gray">Body Mass Index (BMI - Asian)</h3>
                    </v-flex>
                    <v-flex xs4 text-right>
                        <v-btn
                        @click="setForm('bmi')"
                        color="#3b823e" height="25px" dark class="health__formbtn">
                        <v-icon>{{ forms.bmi ? 'fa-times' : 'fa-plus' }}</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>

            <!-- Data -->
            <template v-if="bmi">
                <v-layout row wrap mx-auto class="width--100">
                    <v-flex xs6>
                        <h3 class="mb-0">{{ bmi.value }}</h3>
                    </v-flex>
                    <v-flex xs6 text-right align-self-center>
                        <h3 class="mb-0 type-green">{{ bmi.status }}</h3>
                    </v-flex>
                </v-layout>
            </template>

            <!-- Form -->
            <template v-if="forms.bmi">
                <v-layout row wrap mx-auto class="width--100">
                    <v-flex xs12 mb-2>
                        <v-text-field
                        v-model="post.bmi.weight"
                        :rules="[rules.required, rules.number]"
                        type="number"                            
                        label="Weight (kg)"
                        color="#FABF24"
                        class="form__input--text"
                        hide-details
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 mb-2>
                        <v-text-field
                        v-model="post.bmi.height"
                        :rules="[rules.required, rules.number]"
                        type="number"                            
                        label="Height (cm)"
                        color="#FABF24"
                        class="form__input--text"
                        hide-details
                        ></v-text-field>
                    </v-flex>
                </v-layout>

                <v-flex xs12 mt-4>
                    <v-btn
                    @click="submit('bmi')"
                    class="button cstm-button-radius text-small cstm-width v-btn--large type-gradient-l-r"
                    depressed
                    large
                    >
                    <span class="type-white">Save</span>
                </v-btn>
            </v-flex>

        </template>

    </v-list-item-content>
</v-list-item>
</v-list>
<v-expansion-panels v-if="!forms.bmi" class="health__recommendCon">
    <v-expansion-panel>
        <v-expansion-panel-header><h5 class="type-2 bold">Recommendation</h5></v-expansion-panel-header>
        <v-expansion-panel-content class="text-left">
            <h5 class="type-darkerGray font-weight-default" v-html="page_item.care_app_myhealth_bmi"></h5>
        </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
</v-card>

<!-- BLOOD_SUGAR_LEVEL -->
<v-card class="frm-elevation mb-4">
    <v-list class="pa-0">
        <v-list-item class="px-4 py-5 health__listInner">
            <v-list-item-content class="health__iconCon align-self-start py-0">
                <v-img :src="$PRXConfig().staticUrl('icons/blood-sugar.svg')" class="mx-auto elevation-0" width="20px" height="20px" contain></v-img>
            </v-list-item-content>
            <v-list-item-content class="pl-1 pr-8 py-1 health__contentCon align-self-start">
                <v-layout row wrap mx-auto>
                    <v-flex xs8>
                        <h3 class="mb-5 type-gray">Fasting Blood Sugar</h3>
                    </v-flex>
                    <v-flex xs4 text-right>
                        <v-btn
                        @click="setForm('bs')"
                        color="#3b823e" height="25px" dark class="health__formbtn">
                        <v-icon>{{ forms.bs ? 'fa-times' : 'fa-plus' }}</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                  
                  <!-- Data -->
              <template v-if="bloodSugar">
                <v-layout row wrap mx-auto class="width--100">
                  <v-flex xs6>
                    <h3 class="mb-4">{{ bloodSugar.value }}</h3>
                  </v-flex>
                  <v-flex xs6 text-right align-self-center>
                    <h3 class="mb-0 type-green">{{ bloodSugar.status }}</h3>
                  </v-flex>
                  <v-flex xs12>
                    <h5 class="mb-0 type-gray font-weight-default font-italic">You must fast at least 8 hours</h5>
                </v-flex>
                </v-layout>
            </template>

            <!-- Form -->
            <template v-if="forms.bs">
                <v-layout row wrap mx-auto class="width--100">
                    <v-flex xs12 mb-2>
                        <v-text-field
                        v-model="post.bs.value"
                        :rules="[rules.required, rules.number]"
                        type="number"                            
                        label="Blood Sugar Level"
                        color="#FABF24"bloodPressure
                        class="form__input--text"
                        hide-details
                        ></v-text-field>
                    </v-flex>
                </v-layout>

                <v-flex xs12 mt-4>
                    <v-btn
                    @click="submit('bs')"
                    class="button cstm-button-radius text-small cstm-width v-btn--large type-gradient-l-r"
                    depressed
                    large
                    >
                    <span class="type-white">Save</span>
                </v-btn>
            </v-flex>

        </template>

    </v-list-item-content>
</v-list-item>
</v-list>
<v-expansion-panels v-if="!forms.bs" class="health__recommendCon">
    <v-expansion-panel>
        <v-expansion-panel-header><h5 class="type-2 bold">Recommendation</h5></v-expansion-panel-header>
        <v-expansion-panel-content class="text-left">
            <h5 class="type-darkerGray font-weight-default" v-html="page_item.care_app_myhealth_bs"></h5>
        </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
</v-card>

<!-- CHOLESTEROL -->
<v-card class="frm-elevation mb-4">
    <v-list class="pa-0">
        <v-list-item class="px-4 py-5 health__listInner">
            <v-list-item-content class="health__iconCon align-self-start py-0">
                <v-img :src="$PRXConfig().staticUrl('icons/cholesterol.svg')" class="mx-auto elevation-0" width="20px" height="20px" contain></v-img>
            </v-list-item-content>
            <v-list-item-content class="pl-1 pr-8 py-1 health__contentCon align-self-start">
                <v-layout row wrap mx-auto>
                    <v-flex xs8>
                        <h3 class="mb-5 type-gray">Cholesterol</h3>
                    </v-flex>
                    <v-flex xs4 text-right>
                        <v-btn
                        @click="setForm('chl')"
                        color="#3b823e" height="25px" dark class="health__formbtn">
                        <v-icon>{{ forms.chl ? 'fa-times' : 'fa-plus' }}</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>

            <!-- Data -->
            <template v-if="cholesterol">
                <v-layout row wrap mx-auto class="width--100 align-end">
                    <v-flex xs2>
                        <h5 class="mb-2 type-gray font-italic font-weight-default">LDL</h5>
                        <h3 class="mb-0">{{ cholesterol.ldl }}</h3>
                    </v-flex>
                    <v-flex xs2>
                        <h5 class="mb-2 type-gray font-italic font-weight-default">HDL</h5>
                        <h3 class="mb-0">{{ cholesterol.hdl }}</h3>
                    </v-flex>
                    <v-flex xs3>
                        <h5 class="mb-2 type-gray font-italic font-weight-default">Total</h5>
                        <h3 class="mb-0">{{ cholesterol.total }}</h3>
                    </v-flex>
                    <v-flex xs4 text-right align-self-center>
                        <h3 class="mb-0 type-green">{{ cholesterol.status }}</h3>
                    </v-flex>
                </v-layout>
            </template>

            <!-- Form -->
            <template v-if="forms.chl">
                <v-layout row wrap mx-auto class="width--100">
                    <v-flex xs12 mb-2>
                        <v-text-field
                        v-model="post.chl.ldl"
                        :rules="[rules.required, rules.number]"
                        type="number"                            
                        label="LDL"
                        color="#FABF24"
                        class="form__input--text"
                        hide-details
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 mb-2>
                        <v-text-field
                        v-model="post.chl.hdl"
                        :rules="[rules.required, rules.number]"
                        type="number"                            
                        label="HDL"
                        color="#FABF24"
                        class="form__input--text"
                        hide-details
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 mb-2>
                        <v-text-field
                        v-model="post.chl.total"
                        :rules="[rules.required, rules.number]"
                        type="number"                            
                        label="Total Cholesterol"
                        color="#FABF24"
                        class="form__input--text"
                        hide-details
                        ></v-text-field>
                    </v-flex>                      
                </v-layout>

                <v-flex xs12 mt-4>
                    <v-btn
                    @click="submit('chl')"
                    class="button cstm-button-radius text-small cstm-width v-btn--large type-gradient-l-r"
                    depressed
                    large
                    >
                    <span class="type-white">Save</span>
                </v-btn>
            </v-flex>

        </template>

    </v-list-item-content>
</v-list-item>
</v-list>
<v-expansion-panels v-if="!forms.chl" class="health__recommendCon">
    <v-expansion-panel>
        <v-expansion-panel-header><h5 class="type-2 bold">Recommendation</h5></v-expansion-panel-header>
        <v-expansion-panel-content class="text-left">
            <h5 class="type-darkerGray font-weight-default" v-html="page_item.care_app_myhealth_chl"></h5>
        </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
</v-card>

</v-flex>
</v-layout>
</v-container>
<v-container column pa-5>
    <v-layout row wrap mx-auto>
        <v-flex xs12 mb-4>
            <h3 class="type-1">Settings</h3>
        </v-flex>
        <v-flex xs12 mb-3 class="health__settingsCon">
            <v-card class="frm-elevation mb-4">
                <v-list class="pa-0">
                    <v-list-item class="px-4 py-5">
                        <v-list-item-content class="pl-8 pr-8 py-1 health__contentCon">
                            <v-layout row wrap mx-auto class="width--100">
                                <v-flex xs8 class="align-self-center">
                                    <h5 class="mb-0 type-gray font-weight-default">Allow your doctors to see the Record</h5>
                                </v-flex>
                                <v-flex xs2></v-flex>
                                <v-flex xs2 text-right class="health__switch cstm-switch">
                                    <v-switch v-model="share_records" inset hide-details mt-0></v-switch>
                                </v-flex>
                            </v-layout>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-flex>


        <!-- TO_NEXT-PAGE -->
        <template v-if="share_records">
            <v-flex xs12>
                <v-btn
                class="button cstm-button-radius text-small cstm-width v-btn--large type-gradient-l-r"
                depressed
                large
                @click.stop="manageReviewers()"
                >
                <span class="type-white">Continue Sending</span>
            </v-btn>
        </v-flex>
    </template>

</v-layout>
</v-container>

<!-- Filter View -->
<Reviewers
ref="reviewers"
></Reviewers>

<ConfirmationDialog
:show="dialog"
:message="message"
image="icons/Check.svg"
:left-button="false"
rightButtonText="Close"
>
</ConfirmationDialog>

<Loader
ref="loader"
></Loader>

</v-container>
</template>

<script>
    import ConfirmationDialog from '@/components/ConfirmationDialog';
    import Spinner from '@/components/Spinner';
    import DatePicker from '@/components/DatePicker';
    import Reviewers from './Reviewers.vue';
    import HeightDialog from './HeightDialog.vue';
    import WeightDialog from './WeightDialog.vue';
    import ConditionDialog from './OtherConditionDialog.vue';
    import Loader from '../../../components/Loader.vue'

    export default {
        // mixins: [ Personal ],

        components: {
            ConfirmationDialog,
            Spinner,
            DatePicker,
            Reviewers,
            HeightDialog,
            WeightDialog,
            ConditionDialog,
            Loader
        },

        watch: {
            date() {
                this.fetchMyHealthModule();
            },

            share_records() {
                if(this.initState) {
                    this.updateSettings();
                } else {
                    this.initState = true;
                }
            },

        },

        data () {
            return {
                loading: false,
                dialog: false,
                showDialog: false,
                weightDialog: false,
                conditionDialog: false,
                message: null,

                share_records: false,
                initState: false,

                myHealthData: {},

                forms: {
                    bp: false,
                    hr: false,
                    bs: false,
                    chl: false,
                    bmi: false
                },

                bpValid: false,

                post: {
                    bp: {
                        systole: null,
                        diastole: null
                    },
                    hr: {
                        value: null
                    },
                    bmi: {
                        height: null,
                        weight: null,
                    },
                    chl: {
                        ldl: null,
                        hdl: null,
                        total: null,
                    },
                    bs: {
                        value: null
                    },
                },  

                date: null,

                charts: [
                {key: 'bloodPressure', label: 'Blood Pressure Level', icon: '/static/icons/blood-pressure-control.svg'},
                {key: 'heartRate', label: 'Heart Rate', icon: '/static/icons/hearbeat.svg'},
                {key: 'bmi', label: 'BMI', icon: '/static/icons/weight.svg'},
                {key: 'bloodSugar', label: 'Fasting Blood Sugar', icon: '/static/icons/blood-pressure-control.svg'},
                {key: 'cholesterol', label: 'Cholesterol', icon: '/static/icons/cholesterol.svg'},
                ], 

                rules: {
                    required: value => !!value || 'Required field.',
                    number: value => /^[0-9.,]+$/.test(value) || 'Must be in number format'
                },

                valid: false,        
            }
        },


        computed: {

            bloodPressure() {
                let bloodPressure = this.myHealthData.data;
                if(bloodPressure) {
                    return {
                        systole: bloodPressure.bloodPressures && bloodPressure.bloodPressures.systole ?  bloodPressure.bloodPressures.systole : '--',
                        diastole: bloodPressure.bloodPressures && bloodPressure.bloodPressures.diastole ? bloodPressure.bloodPressures.diastole : '--',
                        status: bloodPressure.bloodPressures && bloodPressure.bloodPressures.status ? bloodPressure.bloodPressures.status : '--',
                    }
                }
            },

            heartRate() {
                let heartRate = this.myHealthData.data;
                if(heartRate) {
                    return {
                        value: heartRate.heartRates && heartRate.heartRates.value ? heartRate.heartRates.value : '--',
                        status: heartRate.heartRates && heartRate.heartRates.status ? heartRate.heartRates.status : '--',
                    }
                }
            },

            bloodSugar() {
                let bloodSugar = this.myHealthData.data;
                if(bloodSugar) {
                    return {
                        value: bloodSugar.bloodSugars && bloodSugar.bloodSugars.value ? bloodSugar.bloodSugars.value : '--',
                        status: bloodSugar.bloodSugars && bloodSugar.bloodSugars.status ? bloodSugar.bloodSugars.status : '--' ,                        
                    }
                }
            },

            cholesterol() {
                let cholesterol = this.myHealthData.data;
                if(cholesterol) {
                    return {
                        ldl: cholesterol.cholesterols && cholesterol.cholesterols.ldl ? cholesterol.cholesterols.ldl : '--',
                        hdl: cholesterol.cholesterols && cholesterol.cholesterols.hdl ? cholesterol.cholesterols.hdl : '--', 
                        total: cholesterol.cholesterols && cholesterol.cholesterols.total ? cholesterol.cholesterols.total : '--',
                        status: cholesterol.cholesterols && cholesterol.cholesterols.status ? cholesterol.cholesterols.status : '--',            
                    }
                }
            },

            bmi() {
                let bmi = this.myHealthData.data;
                if(bmi) {
                    return {
                        value: bmi.bmis && bmi.bmis.value ? bmi.bmis.value : '--',
                        status: bmi.bmis && bmi.bmis.status ? bmi.bmis.status : '--',            
                    }
                }        
            },

            personal_info() {
                let personal_info = this.myHealthData.data;
                if(personal_info) {
                    return {
                        height_feet: personal_info.personal_information && personal_info.personal_information.height_feet ? personal_info.personal_information.height_feet : '--',
                         height_inches: (personal_info.personal_information && personal_info.personal_information.height_inches) ? personal_info.personal_information.height_inches : '0',
                        weight: personal_info.personal_information && personal_info.personal_information.weight ? personal_info.personal_information.weight : '--',
                        weight_units: personal_info.personal_information && personal_info.personal_information.weight_units ? personal_info.personal_information.weight_units : '--',
                        condition: personal_info.personal_information && personal_info.personal_information.condition ? personal_info.personal_information.condition : '--',
                        value: personal_info.personal_information && personal_info.personal_information.value ? personal_info.personal_information.value : '--',
                        status: personal_info.personal_information && personal_info.personal_information.status ? personal_info.personal_information.status : '--',            
                    }
                }        
            },

            page_item(){
                return this.$store.getters['api/pageItems'];
            },

            settings() {
                return JSON.parse(window.localStorage.getItem('settings'));
            },

        },

        mounted() {
            this.init();
        },

        methods: {

        /*
        |--------------------------------------------------------------------------
        | @Initialize
        |--------------------------------------------------------------------------
        */

        init() {
            this.fetchMyHealthModule();
        },

        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        /**
        * Fetch my health module
        * 
        */
        fetchMyHealthModule() {
            this.setLoading();

            let data = {
                date: this.date
            };

            axios.post(this.routes['api.care.my-health.fetch'], data)
            .then((response) => {
                this.setLoading();
                this.myHealthData = response.data;
                this.share_records = this.settings.share_records;
            });

        },

        /**
        * Get post params
        * 
        * @param string type
        */
        getPost(type) {
            let post = this.post[type];
            post.type = type;

            return post;
        },

        /**
        * Submit post request
        * 
        * @param string type
        */
        submit(type) {
            this.$refs['loader'].show();
            axios.post(this.routes['api.care.my-health.update'], this.getPost(type))
            .then((response) => {
                this.$refs['loader'].hide();
                if(response.status === 200) {
                    this.setForm(type);
                    this.resetInput(type);
                    this.fetchMyHealthModule();
                    this.message = response.data.message;
                }
            }).catch((err) => {
                this.$refs['loader'].hide();
                console.log(err);
            });
        },

        /**
        * Update user settings
        * 
        */
        updateSettings() {
            this.setLoading();
            let data = {
                share_records: this.share_records,
            };

            axios.post(this.routes['api.care.setting.update'], data)
            .then((response) => {
                this.setLoading();
                window.localStorage.setItem('settings',JSON.stringify(response.data.settings));
                this.message = response.data.message;
            }).catch((err) => {
                this.setLoading();
            });
        },

        /**
        * Set form status
        * 
        */
        setForm(type) {
            this.forms[type]  = this.forms[type] ? false: true;
        },

        /**
        * Reset input 
        * 
        * @param string type
        */
        resetInput(type) {
            switch(type) {
                case 'bmi':
                this.post[type].height = null;
                this.post[type].weight = null;
                break;
                case 'bp':
                this.post[type].systole = null;
                this.post[type].diastole = null;
                break;
                case 'chl': 
                this.post[type].ldl = null;
                this.post[type].hdl = null;
                this.post[type].total = null;
                break;
                default:
                this.post[type].value = null;
                break;
            }
        },

        /**
        * Set loading status
        * 
        */
        setLoading() {
            if(this.$refs['loader'].loading) {
                this.$refs['loader'].hide();
            } else {
                this.$refs['loader'].show();
            }
        },

        dateSelected(date) {
            this.date = date;
        },

        manageReviewers() {
            this.$refs['reviewers'].setDrawer();
        },

        uponBtnClick() {
            this.showDialog = this.showDialog ? false: true;
        },

        trigWeightDialog() {
            this.weightDialog = this.weightDialog ? false: true;
        },

        trigConditionDialog() {
            this.conditionDialog = this.conditionDialog ? false: true;
        },

    },

}

</script>